import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from './services/config/config.service';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'manufacturer',
          brokers: [new ConfigService().get('kafkaServer').server],
        },
        consumer: {
          groupId: 'manufacturer',
        },
      },
    },
  );
  await app.listenAsync();
}

bootstrap();
