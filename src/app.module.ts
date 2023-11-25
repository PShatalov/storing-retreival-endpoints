import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import validation from './config/validation';
import { DataServicesModule } from './services/data-services/data-services.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: validation,
    }),
    DataServicesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
