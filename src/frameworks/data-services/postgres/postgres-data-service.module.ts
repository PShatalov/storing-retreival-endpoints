import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IDataServices } from '../../../core';
import { PostgresDataService } from './postgres-data-service.service';
import { StoredDataEntity } from './typeorm-entities';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('dbHost'),
        port: configService.get('dbPort'),
        username: configService.get('dbUser'),
        password: configService.get('dbPassword'),
        database: configService.get('dbName'),
        synchronize: true,
      }),
    }),
    TypeOrmModule.forFeature([StoredDataEntity]),
  ],
  providers: [
    {
      provide: IDataServices,
      useClass: PostgresDataService,
    },
  ],
  exports: [IDataServices],
})
export class PostgresDataServicesModule {}
