import React, { createContext, useCallback, useEffect, useReducer } from 'react';
import { useNavigate } from 'react-router-dom';
import ApiService from '../Services/api';

interface AuthState {
    user: User | null;
    token: string | null;
    userType: "parent" | "child" | null;
    isLoading: boolean;
    error: string | null;
}

type AuthAction =
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_ERROR'; payload: string | null }
    | { type: 'SET_USER'; payload: User | null }
    | { type: 'SET_TOKEN'; payload: string | null }
    | { type: 'SET_USER_TYPE'; payload: "parent" | "child" | null }
    | { type: 'RESET_AUTH' };

interface AuthContextType {
    user: User | null;
    token: string | null;
    userType: "parent" | "child" | null;
    isLoading: boolean;
    error: string | null;
    login: (email: string, password: string) => Promise<void>;
    register: (userData: Partial<User>) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

const initialState: AuthState = {
    user: null,
    token: localStorage.getItem('token'),
    userType: null,
    isLoading: false,
    error: null,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function authReducer(state: AuthState, action: AuthAction): AuthState {
    switch (action.type) {
        case 'SET_LOADING':
            return { ...state, isLoading: action.payload };
        case 'SET_ERROR':
            return { ...state, error: action.payload };
        case 'SET_USER':
            return { ...state, user: action.payload };
        case 'SET_TOKEN':
            return { ...state, token: action.payload };
        case 'SET_USER_TYPE':
            return { ...state, userType: action.payload };
        case 'RESET_AUTH':
            return { ...initialState, token: null };
        default:
            return state;
    }
}

const AuthContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, initialState);
    const { user, token, userType, isLoading, error } = state;
    const navigate = useNavigate();

    const clearError = useCallback(() => {
        dispatch({ type: 'SET_ERROR', payload: null });
    }, []);

    useEffect(() => {
        const initializeAuth = async () => {
            if (!token) return;

            try {
                dispatch({ type: 'SET_LOADING', payload: true });
                const currentUser = await ApiService.getCurrentUser();
                dispatch({ type: 'SET_USER', payload: currentUser });
                dispatch({ type: 'SET_USER_TYPE', payload: currentUser.userType });
            } catch (err) {
                dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
                localStorage.removeItem('token');
                dispatch({ type: 'RESET_AUTH' });
                navigate('/Kaspi/');
            } finally {
                dispatch({ type: 'SET_LOADING', payload: false });
            }
        };
        initializeAuth();
    }, [token, navigate]); // re-run if token changes

    const login = async (email: string, password: string) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await ApiService.login(email, password);
            dispatch({ type: 'SET_USER', payload: response.user });
            dispatch({ type: 'SET_USER_TYPE', payload: response.userType });
            dispatch({ type: 'SET_TOKEN', payload: response.token });
            localStorage.setItem('token', response.token);
            navigate('/Kaspi/:accId/dashboard');
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
            throw err; // re-throw for caller to handle if needed
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const register = async (userData: Partial<User>) => {
        try {
            dispatch({ type: 'SET_LOADING', payload: true });
            const response = await ApiService.register(userData);
            dispatch({ type: 'SET_USER', payload: response.user });
            dispatch({ type: 'SET_USER_TYPE', payload: response.userType });
            dispatch({ type: 'SET_TOKEN', payload: response.token });
            localStorage.setItem('token', response.token);
            navigate('/Kaspi/:accId/dashboard');
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: (err as Error).message });
            throw err;
        } finally {
            dispatch({ type: 'SET_LOADING', payload: false });
        }
    };

    const logout = useCallback(async () => {
        try {
            if (token) {
                await ApiService.logout();
            }
        } finally {
            dispatch({ type: 'RESET_AUTH' });
            localStorage.removeItem('token');
            navigate('/Kaspi/');
        }
    }, [token, navigate]);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                userType,
                isLoading,
                error,
                login,
                register,
                logout,
                clearError
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };

