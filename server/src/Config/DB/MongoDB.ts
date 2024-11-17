import {
  InsertManyResult,
  InsertOneResult,
  MongoClient,
  ObjectId,
  UpdateResult,
} from "mongodb";
import Database from "./db"; // Assuming the abstract class is in a file named Database.ts

class MongoDB<T> extends Database<T> {
  private static instance: MongoDB<any>;
  private client: MongoClient;
  private dbName: string;

  private constructor(uri: string, dbName: string) {
    super();
    this.client = new MongoClient(uri);
    this.dbName = dbName;
  }

  // Singleton getInstance method to ensure a single instance
  public static getInstance(): MongoDB<any> {
    if (!MongoDB.instance) {
      MongoDB.instance = new MongoDB<any>(
        process.env.MONGODB_URI!,
        process.env.DB_NAME!
      );
    }
    return MongoDB.instance;
  }

  async connect(): Promise<void> {
    await this.client.connect();
  }

  async close(): Promise<void> {
    await this.client.close();
  }

  private collection(collectionName: string) {
    return this.client.db(this.dbName).collection(collectionName);
  }

  async findMany<T>(
    collectionName: string,
    query: Partial<T> = {},
    projection: object = {}
  ): Promise<Partial<T>[]> {
    await this.connect();
    try {
      return (await this.collection(collectionName)
        .find(query, { projection })
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
      return (await this.collection(collectionName).findOne(query)) as T;
    } catch (err) {
      console.error("Error in findOne:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async insert<T>(
    collectionName: string,
    doc: Partial<T> | Partial<T>[]
  ): Promise<InsertOneResult | InsertManyResult> {
    await this.connect();
    try {
      if (!Array.isArray(doc))
        return await this.collection(collectionName).insertOne({
          ...doc,
          isActive: true,
        }) ;

      return await this.collection(collectionName).insertMany(
        doc.map((doc) => ({ ...doc, isActive: true }))
      );
    } catch (err) {
      console.error("Error in insertOne:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async updateOne<T>(
    collectionName: string,
    id: string,
    doc: Partial<T>
  ): Promise<UpdateResult> {
    await this.connect();
    try {
      return await this.collection(collectionName).updateOne(
        { _id: new ObjectId(id) },
        { $set: doc }
      );
    } catch (err) {
      console.error("Error in updateOne:", err);
      throw err;
    } finally {
      await this.close();
    }
  }

  async createIndex<T>(collectionName: string, field: string): Promise<any> {
    await this.connect();
    try {
      return await this.collection(collectionName).createIndex(
        { [field]: 1 },
        { unique: true }
      );
    } catch (err) {
      console.error("Error in createIndex:", err);
      throw err;
    } finally {
      await this.close();
    }
  }
}

export const mongodb = MongoDB.getInstance();




/* #region  */

// class MongoDB extends Database {
//   private static instance: MongoDB;
//   private client: MongoClient;
//   private dbName: string;
//   private collectionName: string;

//   private constructor(uri: string, dbName: string, collectionName: string) {
//     super();
//     this.client = new MongoClient(uri);
//     this.dbName = dbName;
//     this.collectionName = collectionName;
//   }

//   // Singleton getInstance method to ensure a single instance
//   public static getInstance(): MongoDB {
//     if (!MongoDB.instance) {
//       MongoDB.instance = new MongoDB(
//         process.env.MONGODB_URI!,
//         process.env.DB_NAME!,
//         "Users"
//       );
//     }
//     return MongoDB.instance;
//   }

//   async connect(): Promise<void> {
//     await this.client.connect();
//   }

//   async close(): Promise<void> {
//     await this.client.close();
//   }

//   private collection() {
//     return this.client.db(this.dbName).collection(this.collectionName);
//   }

//   async findMany(
//     query: object = {},
//     projection: object = {}
//   ): Promise<IUser[]> {
//     await this.connect();
//     try {
//       return (await this.collection()
//         .find({ ...query }, { projection })
//         .toArray()) as IUser[];
//     } catch (err) {
//       console.error("Error in findAll:", err);
//       throw err;
//     } finally {
//       await this.close();
//     }
//   }

//   async findOne(query: object): Promise<IUser | null> {
//     await this.connect();
//     try {
//       return (await this.collection().findOne(query)) as IUser;
//     } catch (err) {
//       console.error("Error in findOne:", err);
//       throw err;
//     } finally {
//       await this.close();
//     }
//   }

//   async insertOne(doc: IUser): Promise<any> {
//     await this.connect();
//     try {
//       return await this.collection().insertOne({ ...doc, isActive: true });
//     } catch (err) {
//       console.error("Error in insertOne:", err);
//       throw err;
//     } finally {
//       await this.close();
//     }
//   }

//   async updateOne(id: string, doc: IUser): Promise<any> {
//     await this.connect();
//     try {
//       return await this.collection().updateOne(
//         { _id: new ObjectId(id) },
//         { $set: doc }
//       );
//     } catch (err) {
//       console.error("Error in updateOne:", err);
//       throw err;
//     } finally {
//       await this.close();
//     }
//   }

//   async createIndex(field: string): Promise<any> {
//     await this.connect();
//     try {
//       return await this.collection().createIndex(
//         { [field]: 1 },
//         { unique: true }
//       );
//     } catch (err) {
//       console.error("Error in createIndex:", err);
//       throw err;
//     } finally {
//       await this.close();
//     }
//   }
// }
// // export const initializeDatabase = async () => {
// //   try {
// //     console.log("Initializing database...");

// //     // Create a unique index on the email field
// //     await mongodb.createIndex("email");
// //     console.log("Unique index on email created.");

// //     // Create a unique index on the phoneNumber field
// //     await mongodb.createIndex("phoneNumber" );
// //     console.log("Unique index on phoneNumber created.");

// //     console.log("Database initialization complete.");
// //   } catch (error) {
// //     console.error("Error during database initialization:", error);
// //     process.exit(1); // Exit the process with an error code if index creation fails
// //   }
// // };
/* #endregion */
