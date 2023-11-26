import { Module } from '@nestjs/common';

import { EncryptedDataService } from './encrypted-data.service';
import { StoredDataUseCases } from './stored-data.use-case';

import { DataServicesModule } from '../../services/data-services/data-services.module';

@Module({
  imports: [DataServicesModule],
  providers: [EncryptedDataService, StoredDataUseCases],
  exports: [EncryptedDataService, StoredDataUseCases],
})
export class StoredDataUseCasesModule {}
