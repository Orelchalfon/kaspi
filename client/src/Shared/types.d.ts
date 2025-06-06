declare global {
  // src/types/index.ts

  export type Role = "parent" | "child";

  export interface User {
    _id: string;
    email: string;
    password: string;
    phoneNumber?: string;
    role: Role;
    accounts: string[];
    createdAt?: Date;
    updatedAt?: Date;
    isActive?: boolean;
    createdBy?: string;
    authTokenVersion?: number;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    authToken?: string;
    userType: "parent" | "child";
  }
  // export interface Account {
  //   _id: string;
  //   owner: string;
  //   ownerId: string;
  //   movements: number[];
  //   interestRate: number;
  //   pin: number;
  //   username?: string;
  //   balance?: number;
  //   virtualCreditCard?: VirtualCreditCard;
  //   createdAt?: Date;
  //   updatedAt?: Date;

  // }
  export interface Account {
    owner: string;
    movements: number[];
    interestRate: number;
    pin: number;
    username?: string;
    balance?: number;
    
  }
 
  export interface AccountsContextProps {
    accounts: Account[];
    currentAccount: Account | null;
    login:? (username: string, pin: number) => boolean;
    logout:? () => void;

    sorted: boolean;
    toggleSort: () => void;

    timer: number;
    resetTimer: () => void;

    addMovement: (movement: Movement) => void;
    transfer: (toUsername: string, amount: number) => boolean;
    requestLoan: (amount: number) => boolean;
    closeAccount: (username: string, pin: number) => boolean;
  }
  export interface VirtualCreditCard {
    cardNumber: string;
    expirationDate: string;
    cvv: string;
    balance: number;
  }

  export interface Transaction {
    _id: string;
    accountId: string;
    userId: string;
    type: "deposit" | "withdrawal" | "transfer";
    amount: number;
    description?: string;
    toAccountId?: string;
    createdAt: Date;
  }

  export interface Task {
    _id: string;
    accountId: string;
    description: string;
    status: "pending" | "in-progress" | "completed";
    assignedTo: string;
    dueDate: Date;
    progress: number;
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Reward {
    _id: string;
    userId: string;
    taskId?: string;
    description: string;
    amount: number;
    status: "pending" | "approved";
    createdAt: Date;
    updatedAt: Date;
  }

  export interface LoanRequest {
    _id: string;
    childId: string;
    parentId: string;
    amount: number;
    reason: string;
    status: "pending" | "approved" | "rejected";
    createdAt: Date;
    updatedAt: Date;
  }

  export interface Notification {
    _id: string;
    userId: string;
    message: string;
    type: string;
    data?: Record<string, T>;
    read: boolean;
    createdAt: Date;
  }

  export interface AuthResponse {
    token: string;
    user: User;
    userType: "parent" | "child";
  }

  export interface ApiError {
    message: string;
    code?: number;
    errors?: Record<string, string[]>;
  }
  
}
export {};
