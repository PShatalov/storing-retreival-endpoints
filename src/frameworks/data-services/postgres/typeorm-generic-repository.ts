import { Repository } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { IGenericRepository } from '../../../core';

export class TypeOrmGenericRepository<T> implements IGenericRepository<T> {
  private _repository: Repository<T>;

  constructor(repository: Repository<T>) {
    this._repository = repository;
  }

  getAll(): Promise<T[]> {
    return this._repository.find();
  }

  get(id: any): Promise<T> {
    return this._repository.findOne(id);
  }

  async create(item: T) {
    await this._repository.upsert(item as QueryDeepPartialEntity<T>, ['id']);

    return { sucess: true };
  }

  update(id: string, item: T) {
    return this._repository.update(id, item as QueryDeepPartialEntity<T>);
  }
}
