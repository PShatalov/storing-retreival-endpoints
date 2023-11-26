import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import configuration from './config/configuration';
import validation from './config/validation';

import { AppController } from './controllers/app.controller';

import { DataServicesModule } from './services/data-services/data-services.module';
import { StoredDataUseCasesModule } from './use-cases/stored-data/stored-data-use-cases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validation,
    }),
    DataServicesModule,
    StoredDataUseCasesModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
