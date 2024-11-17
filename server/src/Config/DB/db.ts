import { InsertManyResult, InsertOneResult } from "mongodb";

export default abstract class Database<T> {
  abstract connect(): Promise<void>;
  abstract close(): Promise<void>;
  abstract findMany<T>(
    collectionName: string,
    query?: Partial<T>,
    projection?: object
  ): Promise<Partial<T>[]>;
  abstract findOne<T>(
    collectionName: string,
    query: Partial<T>
  ): Promise<Partial<T> | null>;
  abstract insert<T>(
    collectionName: string,
    doc: Partial<T> | Partial<T>[]
  ): Promise<InsertOneResult | InsertManyResult>;
  abstract updateOne<T>(
    collectionName: string,
    id: string,
    doc: Partial<T> | Partial<T>[]
  ): Promise<any>;
  abstract createIndex<T>(collectionName: string, field: string): Promise<any>;
}
