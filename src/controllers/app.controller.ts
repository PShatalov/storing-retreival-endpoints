import { Controller, Post, Body } from '@nestjs/common';
import { StoredDataUseCases } from 'src/use-cases/stored-data/stored-data.use-case';

@Controller('api/v1')
export class AppController {
  constructor(private readonly soretdDataUseCases: StoredDataUseCases) {}

  // TODO: add DTO models
  @Post('encrypt')
  retreive(
    @Body('id') id: string,
    @Body('encryption_key') encryptionKey: string,
    @Body('value') value: any,
  ): any {
    return this.soretdDataUseCases.encryptAndSave(encryptionKey, id, value);
  }

  @Post('decrypt')
  store(
    @Body('id') id: string,
    @Body('decryption_key') decryptionKey: string,
  ): any {
    return this.soretdDataUseCases.getAndDecryptRecords(id, decryptionKey);
  }
}
