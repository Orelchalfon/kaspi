import {
  UpdateResult,
  InsertOneResult,
  InsertManyResult,
} from "mongodb";

export default abstract class AbstractDatabaseService {
  // Connect to the database
  abstract connect(): Promise<void>;

  // Close the database connection
  abstract close(): Promise<void>;

  // Find all records in a collection that match the query
  abstract findMany<T>(
    collectionName: string,
    query?: Partial<T>,
    projection?: object
  ): Promise<Partial<T>[]>;

  // Find a single record in a collection that matches the query
  abstract findOne<T>(
    collectionName: string,
    query: Partial<T>
  ): Promise<Partial<T> | null>;

  // Insert records into a collection
  abstract insert<T>(
    collectionName: string,
    docs: Partial<T> | Partial<T>[]
  ): Promise<InsertOneResult | InsertManyResult>;

  // Update records in a collection
  abstract update<T>(
    collectionName: string,
    query: Partial<T>,
    update: Partial<T>,
    options?: {
      operator?: "$set" | "$inc" | "$push" | "$pull" | "$addToSet";
      upsert?: boolean;
    }
  ): Promise<UpdateResult>;

  // Create an index on a field in a collection
  abstract createIndex<T>(
    collectionName: string,
    field: string,
    options?: object
  ): Promise<any>;
}
