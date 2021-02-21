import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {
      port: process.env.PORT,
    };
    this.envConfig.kafkaService = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'gateway',
          brokers: ['kafka:9092'],
        },
        consumer: {
          groupId: 'gateway',
        },
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
