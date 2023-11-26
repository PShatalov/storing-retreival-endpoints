import { createHash } from 'crypto';
import { Controller, Post, Body } from '@nestjs/common';
import { StoredDataUseCases } from 'src/use-cases/stored-data/stored-data.use-case';

@Controller('api/v1')
export class AppController {
  constructor(private readonly soretdDataUseCases: StoredDataUseCases) {}

  @Post('encryption-key')
  getKey(): { encryptionKey: string } {
    return {
      encryptionKey: createHash('sha256')
        .update(String('test'))
        .digest('base64')
        .substr(0, 32),
    };
  }

  // TODO: add DTO models
  @Post('encrypt')
  retreive(
    @Body('id') id: string,
    @Body('encryption_key') encryptionKey: string,
    @Body('value') value: any,
  ): Promise<{ success: boolean }> {
    return this.soretdDataUseCases.encryptAndSave(encryptionKey, id, value);
  }

  @Post('decrypt')
  store(
    @Body('id') id: string,
    @Body('decryption_key') decryptionKey: string,
  ): Promise<
    {
      id: string;
      decryptedValue: any;
    }[]
  > {
    return this.soretdDataUseCases.getAndDecryptRecords(id, decryptionKey);
  }
}
