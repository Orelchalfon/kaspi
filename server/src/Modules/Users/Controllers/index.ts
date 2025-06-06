import { Request, Response } from "express";

import { mongodb } from "../../../Config/DB/MongoDB";
import { IUser } from "../../../types";
import {
  createIndexToModel,
  findUserByEmailFromModel,
  getUserByIdFromModel,
  getUsersFromModel,
  registerUserToModel,
  updateUserToModel,
} from "../../Users/Models/";
const checkID = (id: string, res: Response) => {
  {
    if (!id) return res.status(403).json({ message: "id is required" });

    if (id.length < 24) return res.status(403).json({ message: "invalid id" });
  }
};
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    console.log("Getting all users...");
    const users = await getUsersFromModel();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
export const getUserById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    checkID(id, res);

    const user = await getUserByIdFromModel(id);

    if (!user) return res.status(404).json({ message: "user not found" });

    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ message: "mail, password, role and phoneNumber are required" });
    }
    const result = await registerUserToModel({
      name,
      email,
      password,
    } as IUser);

    if (!result?.acknowledged)
      return res.status(404).json({ message: "Something went wrong" });

    res.status(201).json({ message: "user added successfully", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};

export async function loginUser(req: Request, res: Response) {
  try {
    let { email, password } = req.body;
    console.log(`email` + email, `password` + password);
    const result = await findUserByEmailFromModel(email, password);
    console.log(`result`, result);
    if (!result) return res.status(404).json({ message: "user not found" });
    if (result.error) return res.status(401).json({ result });

    res.status(200).json({ result });
  } catch (error) {
    res.status(500).json({ error });
  }
}
export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    checkID(id, res);
    const { email, password, role, phoneNumber, isActive } = req.body;

    if (!email && !password && !role && !phoneNumber)
      return res
        .status(400)

        .json({ message: "mail, password, role and phoneNumber are required" });

    const result = await updateUserToModel(id, {
      email,
      password,
      role,
      phoneNumber,
      isActive,
    } as IUser);

    if (!result?.acknowledged)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "user updated successfully", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const deactivateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    checkID(id, res);

    const result = await updateUserToModel(id, { isActive: false } as IUser);

    if (!result?.acknowledged)
      return res.status(404).json({ message: "user not found" });

    res.status(200).json({ message: "user deactivated successfully", result });
  } catch (error) {
    res.status(500).json({ error });
  }
};
export const createIndexFromModel = async (field: string) => {
  return await createIndexToModel("Users", field)
}