import { Document, ObjectId } from "mongodb";

type IUser = {
  _id?: ObjectId;
  name?: string;
  email: string;
  password: string;
  role?: "parent" | "child";
  phoneNumber?: string;
  createdAt?: Date;
  isActive?: boolean;
  
} & Document;

// export interface User {
//   _id: string;
//   email: string;
//   password: string;
//   phoneNumber?: string;
//   role: Role;
//   accounts: string[];
//   createdAt?: Date;
//   updatedAt?: Date;
//   isActive?: boolean;
//   createdBy?: string;
//   authTokenVersion?: number;
//   passwordResetToken?: string;
//   passwordResetExpires?: Date;
//   authToken?: string;
//   userType: "parent" | "child";
// }

type IAccount = {
  _id?: ObjectId;
  userId: ObjectId;
  accountNumber: string;
  balance: number;
  createdAt?: Date;
  isActive?: boolean;
} & Document;
type ITask = {
  _id?: ObjectId;
  userId: ObjectId;
  title: string;
  description: string;
  dueDate: Date;
  completed: boolean;
  createdAt?: Date;
} & Document;
type ITransaction = {
  _id?: ObjectId;
  accountId: ObjectId;
  amount: number;
  type: "credit" | "debit";
  createdAt?: Date;
};
type IReward = {
  _id?: ObjectId;
  userId: ObjectId;
  taskId: ObjectId;
  amount: number;
  status: "pending" | "approved";
  createdAt?: Date;
  updatedAt?: Date;
};
