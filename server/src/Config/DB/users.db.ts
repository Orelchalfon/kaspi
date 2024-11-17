// import { MongoClient, ObjectId } from "mongodb";
// import { IUser } from "../../types";

// const dbConfig = {
//   host: process.env.MONGODB_URI!,
//   db: process.env.DB_NAME,
//   collection: "Users",
// };
// export const getAllUsersFromDB = async (query = {}, projection = {}) => {
//   let mongo = new MongoClient(dbConfig.host);

//   try {
//     await mongo.connect();
//     return await mongo
//       .db(dbConfig.db)
//       .collection(dbConfig.collection)
//       .find({ ...query, isActive: true }, { projection })
//       .toArray();
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await mongo.close();
//   }
// };
// export const registerUserToDB = async (user: IUser) => {
//   let mongo = new MongoClient(dbConfig.host);
//   try {
//     await mongo.connect();
//     return await mongo
//       .db(dbConfig.db)
//       .collection(dbConfig.collection)
//       .insertOne({ ...user, isActive: true });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await mongo.close();
//   }
// };
// export const findUserByEmailFromDB = async (email: string) => {
//   let mongo = new MongoClient(dbConfig.host);
//   try {
//     await mongo.connect();
//     return await mongo.db(dbConfig.db).collection(dbConfig.collection).findOne({
//       email,
//     });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await mongo.close();
//   }
// };
// export const updateUserToDB = async (id: string, user: IUser) => {
//   let mongo = new MongoClient(dbConfig.host);
//   try {
//     await mongo.connect();
//     return await mongo
//       .db(dbConfig.db)
//       .collection(dbConfig.collection)
//       .updateOne({ _id: new ObjectId(id) }, { $set: user });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await mongo.close();
//   }
// };
// export const logicalDeleteUserToDB = async (id: string) => {
//   let mongo = new MongoClient(dbConfig.host);
//   try {
//     await mongo.connect();
//     return await mongo
//       .db(dbConfig.db)
//       .collection(dbConfig.collection)
//       .updateOne({ _id: new ObjectId(id) }, { $set: { isActive: false } });
//   } catch (err) {
//     console.log(err);
//   } finally {
//     await mongo.close();
//   }
// };

import {
  FindOptions,
  InsertManyResult,
  InsertOneResult,
  MongoClient,
} from "mongodb";
import { IUser } from "../../types";
import AbstractDatabaseService from "./dbInit";

export default class DB extends AbstractDatabaseService {
  private static instance: DB;
  private client!: MongoClient;
  private dbName: string;

  private constructor(uri: string, dbName: string) {
    super();

    this.client = new MongoClient(uri);
    this.dbName = dbName;
  }
  public static getInstance(): DB {
    if (!DB.instance) {
      DB.instance = new DB(process.env.MONGODB_URI!, process.env.DB_NAME!);
    }

    return DB.instance;
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  async findMany<T>(
    collectionName: string,
    query?: any,
    projection?: object
  ): Promise<Partial<T>[]> {
    await this.connect();
    try {
      return (await this.client
        .db(this.dbName)
        .collection(collectionName)
        .find(query)
        .toArray()) as T[];
    } catch (err) {
      console.error("Error in findMany:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async findOne<T>(
    collectionName: string,
    query: Partial<T>
  ): Promise<Partial<T> | null> {
    await this.connect();
    try {
      return (await this.client
        .db(this.dbName)
        .collection(collectionName)
        .findOne(query)) as T;
    } catch (err) {
      console.error("Error in findOne:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async insert<T>(
    collectionName: string,
    docs: Partial<T> | Partial<T>[]
  ): Promise<InsertOneResult | InsertManyResult> {
    await this.connect();
    try {
      return await this.client
        .db(this.dbName)
        .collection(collectionName)
        .insertMany(Array.isArray(docs) ? docs : [docs]);
    } catch (err) {
      console.error("Error in insert:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async update<T>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<T>,
    options?: {
      operator?: "$set" | "$inc" | "$push" | "$pull" | "$addToSet";
      upsert?: boolean;
    }
  ) {
    await this.connect();
    try {
      return await this.client
        .db(this.dbName)
        .collection(collectionName)
        .updateOne(query, { [options?.operator || "$set"]: update });
    } catch (err) {
      console.error("Error in update:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async createIndex<T>(
    collectionName: string,
    field: string,
    options?: object
  ): Promise<any> {
    await this.connect();
    try {
      return await this.client
        .db(this.dbName)
        .collection(collectionName)
        .createIndex(field, options);
    } catch (err) {
      console.error("Error in createIndex:", err);
      throw err;
    } finally {
      await this.close();
    }
  }
}
export const mongodb = DB.getInstance();
