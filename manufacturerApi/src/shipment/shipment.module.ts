import { Module } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { ShipmentController } from './shipment.controller';
import { ClientProxyFactory } from '@nestjs/microservices';
import { KAFKA_SERVICE } from '../services/constants';
import { ConfigService } from '../services/config/config.service';

@Module({
  providers: [
    ShipmentService,
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
  controllers: [ShipmentController],
})
export class ShipmentModule {}
