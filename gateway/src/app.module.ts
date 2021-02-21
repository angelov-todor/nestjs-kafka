import { Module } from '@nestjs/common';
import { databaseProviders } from './providers/database.providers';
import { ConfigModule } from '@nestjs/config';
import { ManufacturerModule } from './manufacturer/manufacturer.module';
import { ConfigService } from './service/config/config.service';

@Module({
  imports: [ConfigModule.forRoot(), ManufacturerModule],
  providers: [...databaseProviders, ConfigService],
})
export class AppModule {}
