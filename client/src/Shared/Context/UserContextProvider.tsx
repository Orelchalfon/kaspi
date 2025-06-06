import  { createContext, useReducer, ReactNode } from 'react';

// Define the shape of the user data and context state
interface User {
    id: string;
    name: string;
    email: string;
}

interface UserState {
    isLoggedIn: boolean;
    userDetails: User | null;
}

interface UserContextProps extends UserState {
    login: (user: User) => void;
    logout: () => void;
    fetchUserDetails: () => void;
}

// Define initial state
const initialState: UserState = {
    isLoggedIn: false,
    userDetails: null,
};

// Create context
const UserContext = createContext<UserContextProps>({
    ...initialState,
    login: () => {},
    logout: () => {},
    fetchUserDetails: () => {},
});

// Define action types
type Action = 
    | { type: 'LOGIN'; payload: User }
    | { type: 'LOGOUT' }
    | { type: 'FETCH_USER_DETAILS'; payload: User };

// Reducer function to manage state changes
const userReducer = (state: UserState, action: Action): UserState => {
    switch (action.type) {
        case 'LOGIN':
            return { ...state, isLoggedIn: true, userDetails: action.payload };
        case 'LOGOUT':
            return { ...state, isLoggedIn: false, userDetails: null };
        case 'FETCH_USER_DETAILS':
            return { ...state, userDetails: action.payload };
        default:
            return state;
    }
};

// Context provider component
export const UserContextProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(userReducer, initialState);

    const login = (user: User) => {
        dispatch({ type: 'LOGIN', payload: user });
    };

    const logout = () => {
        dispatch({ type: 'LOGOUT' });
    };

    const fetchUserDetails = async () => {
        // Placeholder API call
        const user: User = await fetch('localhost:5000/api/users').then(res => res.json());
        dispatch({ type: 'FETCH_USER_DETAILS', payload: user });
    };

    return (
        <UserContext.Provider value={{ ...state, login, logout, fetchUserDetails }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext





