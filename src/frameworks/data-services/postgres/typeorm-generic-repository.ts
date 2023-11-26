import { Repository, Like } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IGenericRepository } from '../../../core';

export class TypeOrmGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getById(id: any): Promise<T> {
    return this._repository
      .createQueryBuilder()
      .where('id = :id', { id })
      .getOneOrFail();
  }

  getLike(searchTerm: any): Promise<T[]> {
    return this._repository
      .createQueryBuilder()
      .where('id LIKE :term', { term: `%${searchTerm}%` })
      .getMany();
  }

  async create(item: T) {
    await this._repository.upsert(item as QueryDeepPartialEntity<T>, ['id']);

    return { success: true };
  }

  update(id: string, item: T) {
    return this._repository.update(id, item as QueryDeepPartialEntity<T>);
  }
}
