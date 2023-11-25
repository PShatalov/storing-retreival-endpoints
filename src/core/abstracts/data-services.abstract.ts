import { StoredDataEntity } from '../entities';
import { IGenericRepository } from './generic-repository.abstract';

export abstract class IDataServices {
  abstract storedData: IGenericRepository<StoredDataEntity>;
}
