import { Module } from '@nestjs/common';
import { AuthorityController } from './authority.controller';
import { AuthorityService } from './services/authority.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';
import { KAFKA_SERVICE } from './services/constants';

@Module({
  imports: [],
  controllers: [AuthorityController],
  providers: [
    AuthorityService,
    ConfigService,
    {
      provide: KAFKA_SERVICE,
      useFactory: (configService: ConfigService) => {
        const kafkaServiceOptions = configService.get('kafkaService');
        return ClientProxyFactory.create(kafkaServiceOptions);
      },
      inject: [ConfigService],
    },
  ],
})
export class AppModule {}
