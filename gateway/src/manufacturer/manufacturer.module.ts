import { Module } from '@nestjs/common';
import { ShipmentController } from './shipment.controller';
import { ConfigService } from '../service/config/config.service';
import { ClientProxyFactory } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../constants';

@Module({
  controllers: [ShipmentController],
  providers: [
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
export class ManufacturerModule {}
