export abstract class IGenericRepository<T> {
  abstract get(id: string): Promise<T>;

  abstract create(item: T): Promise<{ sucess: boolean }>;

  abstract update(id: string, item: T);
}
