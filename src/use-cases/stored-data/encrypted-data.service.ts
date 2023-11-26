import { Injectable } from '@nestjs/common';
import { StoredDataEntity } from '../../core/entities';
import * as crypto from 'crypto';

const IV_LENGTH = 32;
const ENCRYPTION_ALGORITHM = 'aes-256-gcm';

@Injectable()
export class EncryptedDataService {
  getEncryptedData(encryptionKey: string, id: string, value: any) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(
      ENCRYPTION_ALGORITHM,
      encryptionKey,
      iv,
    );

    const encrypted = Buffer.concat([
      cipher.update(
        Buffer.from(
          typeof value === 'object' || Array.isArray(value)
            ? JSON.stringify(value)
            : value.toString(),
          'utf-8',
        ),
      ),
      cipher.final(),
    ]);

    const newData = new StoredDataEntity();
    newData.id = id;
    newData.value = `${iv.toString('hex')}:${cipher
      .getAuthTag()
      .toString('hex')}:${encrypted.toString('hex')}`;

    return newData;
  }

  decryptData(decryptionKey: string, encryptedStoredData: StoredDataEntity) {
    const textParts = encryptedStoredData.value.split(':');
    const iv = Buffer.from(textParts.shift(), 'hex');
    const authTag = Buffer.from(textParts.shift(), 'hex');

    const encryptedData = Buffer.from(textParts.join(':'), 'hex');

    const decipher = crypto.createDecipheriv(
      ENCRYPTION_ALGORITHM,
      Buffer.from(decryptionKey),
      iv,
    );
    decipher.setAuthTag(authTag);

    // Decrypt the data
    const decrypted = Buffer.concat([
      decipher.update(encryptedData),
      decipher.final(),
    ]);

    // TODO: add logic to parse objects
    return {
      id: encryptedStoredData.id,
      decryptedValue: decrypted.toString('utf-8'),
    };
  }
}
