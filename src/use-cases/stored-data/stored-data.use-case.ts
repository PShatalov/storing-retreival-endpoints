import { Injectable } from '@nestjs/common';
import { IDataServices } from '../../core/abstracts';
import { EncryptedDataService } from './encrypted-data.service';

@Injectable()
export class StoredDataUseCases {
  constructor(
    private dataServices: IDataServices,
    private encryptedDataService: EncryptedDataService,
  ) {}

  async encryptAndSave(
    encryptionKey: string,
    id: string,
    value: string,
  ): Promise<{ success: boolean }> {
    try {
      const encryptedData = await this.encryptedDataService.getEncryptedData(
        encryptionKey,
        id,
        value,
      );

      return this.dataServices.storedData.create(encryptedData);
    } catch (err) {
      console.error(err);
      // TODO: Handle encryption and database save errors
      return { success: false };
    }
  }

  async getAndDecryptRecords(
    id: string,
    decryptionKey: string,
  ): Promise<{ id: string; decryptedValue: string }[]> {
    try {
      if (id.includes('*')) {
        // TODO: validate searchTerm
        const searchTerm = id.replaceAll('*', '');
        const data = await this.dataServices.storedData.getLike(searchTerm);

        return Promise.all(
          data.map((encryptedRecord) =>
            this.encryptedDataService.decryptData(
              decryptionKey,
              encryptedRecord,
            ),
          ),
        );
      }
      const data = await this.dataServices.storedData.getById(id);

      return [this.encryptedDataService.decryptData(decryptionKey, data)];
    } catch (err) {
      // TODO: Handle dencryption and database retr errors
      console.error(err);
    }
  }
}
