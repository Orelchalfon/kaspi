import { compareSync, hashSync } from "bcryptjs";
import { ObjectId } from "mongodb";
import { mongodb } from "../../../Config/DB/MongoDB";
import { IUser } from "../../../types";
// import {
//   findUserByEmailFromDB,
//   getAllUsersFromDB,
//   logicalDeleteUserToDB,
//   registerUserToDB,
//   updateUserToDB,
// } from "../../../Config/DB/users.db";
// export const getUsersFromModel = async () => await getAllUsersFromDB();

// export const getUserByIdFromModel = async (id: string) => {
//   const query = { _id: new ObjectId(id) };

//   const users = await getAllUsersFromDB(query);
//   if (!users) throw new Error("user not found");
//   const [user] = users;
//   return user;
// };
// export const registerUserToModal = async (newUser: IUser) => {
//   newUser = { ...newUser, password: hashSync(newUser.password, 10) };
//   return await registerUserToDB(newUser);
// };
// export const findUserByEmailFromModal = async (
//   email: string,
//   password: string
// ) => {
//   const user = await findUserByEmailFromDB(email);
//   if (!user) throw new Error("user not found");
//   if (!user.isActive) throw new Error("user is not active");
//   if (!user.comparePassword(password, user.password))
//     throw new Error("invalid credentials");
//   return { user, token: user.generateToken() };
// };
// export const updateUserToModel = async (id: string, user: IUser) => {
//   return await updateUserToDB(id, user);
// };
// export const logicalDeleteUserToModel = async (id: string) => {
//   return await logicalDeleteUserToDB(id);
// };

export const getUsersFromModel = async () =>
  await mongodb.findMany<IUser>("Users");

export const getUserByIdFromModel = async (id: string) => {
  const query = { _id: new ObjectId(id) };
  const user = await mongodb.findOne<IUser>("Users", query);
  if (!user) throw new Error("user not found");
  return user;
};
export const registerUserToModel = async (newUser: IUser) => {
  newUser = { ...newUser, password: hashSync(newUser.password, 10) };
  return await mongodb.insert<IUser>("Users", newUser);
};
export const findUserByEmailFromModel = async (
  email: string,
  password: string
) => {
  let query = { email };
  let user = await mongodb.findOne<IUser>("Users", query);

  if (!user) return { error: "user not found" };

  if (!compareSync(password, user.password!))
    return { error: "invalid credentials" };

  return {
    _id: user._id,
    name: user.name,
    email: user.email,
  };
};
export const updateUserToModel = async (id: string, user: IUser) => {
  return await mongodb.updateOne<IUser>("Users", id, user);
};

export const createIndexToModel = async (collection:string,field: string) => {
  return await mongodb.createIndex<IUser>("Users", field);
};