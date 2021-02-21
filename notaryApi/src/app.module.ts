import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { NotaryService } from './services/notary.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [NotaryService],
})
export class AppModule {}
