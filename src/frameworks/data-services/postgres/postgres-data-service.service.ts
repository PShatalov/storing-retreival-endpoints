import { Injectable, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IDataServices } from '../../../core';
import { StoredDataEntity } from './typeorm-entities';
import { TypeOrmGenericRepository } from './typeorm-generic-repository';

@Injectable()
export class PostgresDataService
  implements IDataServices, OnApplicationBootstrap
{
  storedData: TypeOrmGenericRepository<StoredDataEntity>;

  constructor(
    @InjectRepository(StoredDataEntity)
    private storedDataRepository: Repository<StoredDataEntity>,
  ) {}

  onApplicationBootstrap() {
    this.storedData = new TypeOrmGenericRepository<StoredDataEntity>(
      this.storedDataRepository,
    );
  }
}
