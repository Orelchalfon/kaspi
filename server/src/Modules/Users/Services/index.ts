import { ObjectId } from "mongodb";
import { mongodb } from "../../../Config/DB/MongoDB";
import { IUser } from "../../../types";
import { compareSync, hashSync } from "bcrypt";

const COLLECTION_NAME = "users";

export class UserService {
  async createUser(user: IUser) {
    user.password = hashSync(user.password, 10);
    const result = await mongodb.insert<IUser>(COLLECTION_NAME, user);
    return result; // Assuming MongoDB 4.2+ returning ops
  }
  // Assuming you want the newly created user returned

  async getUserById(userId: string) {
    return await mongodb.findOne<IUser>(COLLECTION_NAME, {
      _id: new ObjectId(userId),
    });
  }

  async getUsers() {
    return await mongodb.findMany<IUser>(COLLECTION_NAME);
  }

  async updateUser(userId: string, data: Partial<IUser>) {
    await mongodb.updateOne<IUser>(COLLECTION_NAME, userId, data);
  }

  async deleteUser(userId: string) {
    await mongodb.updateOne<IUser>(COLLECTION_NAME, userId, {
      isActive: false,
    });
  }

  async findUserByEmail(email: string, password: string) {
    const user = (await mongodb.findOne<IUser>(COLLECTION_NAME, {
      email,
    })) as IUser;
    if (!user) throw new Error("user not found");
    if (!user.isActive) throw new Error("user is not active");
    if (!compareSync(password, user.password))
      throw new Error("invalid credentials");
    return user;
  }
}
