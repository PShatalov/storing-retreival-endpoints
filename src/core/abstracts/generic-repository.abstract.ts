export abstract class IGenericRepository<T> {
  abstract getById(id: string): Promise<T>;

  abstract getLike(searchTerm: string): Promise<T[]>;

  abstract create(item: T): Promise<{ success: boolean }>;

  abstract update(id: string, item: T);
}
