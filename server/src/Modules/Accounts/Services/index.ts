import { ObjectId } from "mongodb";
import { mongodb } from "../../../Config/DB/MongoDB";
import { IAccount } from "../../../types";

const COLLECTION_NAME = "accounts";

export class AccountService {
  async createAccount(data: Partial<IAccount>) {
    const result = await mongodb.insert<IAccount>(COLLECTION_NAME, data);
    return result; // Assuming MongoDB 4.2+ returning ops
  }

  async getAccountById(accountId: string) {
    return await mongodb.findOne<IAccount>(COLLECTION_NAME, {
      _id: new ObjectId(accountId),
    });
  }

  async getAccounts() {
    return await mongodb.findMany<IAccount>(COLLECTION_NAME);
  }

  async updateAccount(accountId: string, data: Partial<IAccount>) {
    await mongodb.updateOne<IAccount>(COLLECTION_NAME, accountId, data);
  }

  async deleteAccount(accountId: string) {
    await mongodb.updateOne<IAccount>(COLLECTION_NAME, accountId, {
      isActive: false,
    });
  }

  async findAccountByAccountNumber(accountNumber: string) {
    const account = (await mongodb.findOne<IAccount>(COLLECTION_NAME, {
      accountNumber,
    })) as IAccount;
    if (!account) throw new Error("account not found");
    if (!account.isActive) throw new Error("account is not active");
    return account;
  }
}
