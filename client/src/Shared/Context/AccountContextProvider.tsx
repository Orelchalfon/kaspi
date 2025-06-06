

import React, { ReactNode, createContext, useEffect, useReducer } from 'react';

type AccountContextProviderProps = {
    children: ReactNode;
}

export const AccountContext = createContext<AccountsContextProps | undefined>(
    undefined
);

const initialAccounts: Account[] = [
    {
        owner: 'Orel Chalfon',
        movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
        interestRate: 1.2, // %
        pin: 1111,
    },
    {
        owner: 'Jessica Davis',
        movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
        interestRate: 1.5,
        pin: 2222,
    },

    {
        owner: 'Steven Thomas Williams',
        movements: [200, -200, 340, -300, -20, 50, 400, -460],
        interestRate: 0.7,
        pin: 3333,
    },

    {
        owner: 'Sarah Smith',
        movements: [430, 1000, 700, 50, 90],
        interestRate: 1,
        pin: 4444,
    },


];

type AccountState = {
    accounts: Account[];
    currentAccount: Account | null;
    sorted: boolean;
    timer: number;
};
type Action =
    | { type: "SET_CURRENT_ACCOUNT"; account: Account }
    | { type: "LOG_OUT" }
    | { type: "ADD_MOVEMENT"; movement: number }
    | { type: "HANDLE_SORT" }
    | { type: "RESET_TIMER" }
    | { type: "DECREMENT_TIMER" };

const accountReducer = (state: AccountState, action: Action): AccountState => {
    switch (action.type) {
        case "SET_CURRENT_ACCOUNT":
            return {
                ...state,
                currentAccount: action.account,
            };
        case "LOG_OUT":
            return {
                ...state,
                currentAccount: null,
            };
        case "ADD_MOVEMENT":
            if (!state.currentAccount) return state;
            return {
                ...state,
                currentAccount: {
                    ...state.currentAccount,
                    movements: [...state.currentAccount.movements, action.movement],
                    balance: (state.currentAccount.balance || 0) + action.movement,
                },
            };
        case "HANDLE_SORT":
            if (!state.currentAccount) return state;
            return {
                ...state,
                sorted: !state.sorted,
                currentAccount: {
                    ...state.currentAccount,
                    movements: state.sorted
                        ? state.currentAccount.movements
                        : [...state.currentAccount.movements].sort((a, b) => a - b),
                },
            };
        case "RESET_TIMER":
            return {
                ...state,
                timer: 300, // 5 minutes
            };
        case "DECREMENT_TIMER":
            return {
                ...state,
                timer: state.timer > 0 ? state.timer - 1 : 0,
            };
        default:
            return state;
    }

};
const createUserName = (accs: Account[]) => {
    accs.forEach((acc) => {
        acc.username = acc.owner
            .toLowerCase()
            .split(" ")
            .map((name) => name[0])
            .join("");
    });
};

createUserName(initialAccounts);
const AccountContextProvider: React.FC<AccountContextProviderProps> = ({ children }) => {
    const [state, dispatch] = useReducer(accountReducer, {
        accounts: initialAccounts,
        currentAccount: null,
        sorted: false,
        timer: 300,
    })

    // Auto-logout when timer reaches zero
    useEffect(() => {
        if (state.timer === 0 && state.currentAccount) {
            dispatch({ type: "LOG_OUT" });
            // Additional logout handling if necessary
        }

        const timerInterval = setInterval(() => {
            dispatch({ type: "DECREMENT_TIMER" });
        }, 1000);

        return () => clearInterval(timerInterval);
    }, [state.timer, state.currentAccount]);

    const login = (username: string, pin: number): boolean => {
        const account = state.accounts.find(acc => acc.username === username && acc.pin === pin);
        if (account) {
            dispatch({ type: "SET_CURRENT_ACCOUNT", account });
            dispatch({ type: "RESET_TIMER" });
            return true;
        }
        return false;
    };

    const logout = () => {
        dispatch({ type: "LOG_OUT" });
    };

    const addMovement = (movement: number) => {
        dispatch({ type: "ADD_MOVEMENT", movement });
    };

    const toggleSort = () => {
        dispatch({ type: "HANDLE_SORT" });
    };

    const resetTimer = () => {
        dispatch({ type: "RESET_TIMER" });
    };

    const transfer = (toUsername: string, amount: number): boolean => {
        const receiver = state.accounts.find(acc => acc.username === toUsername);
        if (receiver && state.currentAccount && state.currentAccount.balance! >= amount && amount > 0) {
            addMovement(-amount);
            receiver.movements.push(amount);
            receiver.balance = (receiver.balance || 0) + amount;
            return true;
        }
        return false;
    };

    const requestLoan = (amount: number): boolean => {
        if (state.currentAccount && amount > 0 && state.currentAccount.movements.some(mov => mov >= amount * 0.1)) {
            addMovement(amount);
            return true;
        }
        return false;
    };

    const closeAccount = (username: string, pin: number): boolean => {
        if (state.currentAccount && state.currentAccount.username === username && state.currentAccount.pin === pin) {
            dispatch({ type: "LOG_OUT" });
            // Further account deletion logic if necessary
            return true;
        }
        return false;
    };

    return <AccountContext.Provider value={
        {
            accounts: state.accounts,
            currentAccount: state.currentAccount,
            login,
            logout,
            sorted: state.sorted,
            toggleSort,
            timer: state.timer,
            resetTimer,
            addMovement,
            transfer,
            requestLoan,
            closeAccount,
        }
    }>{children}</AccountContext.Provider>
}

export default AccountContextProvider