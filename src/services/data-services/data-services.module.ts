import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostgresDataServicesModule } from '../../frameworks/data-services/postgres/postgres-data-service.module';

@Module({
  imports: [PostgresDataServicesModule, ConfigModule],
  exports: [PostgresDataServicesModule],
})
export class DataServicesModule {}
