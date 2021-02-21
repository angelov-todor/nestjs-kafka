import { Transport } from '@nestjs/microservices';

export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.kafkaServer = {
      server: process.env.KAFKA_SERVER || 'kafka:9092',
    };
    this.envConfig.kafkaService = {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: ['kafka:9092'],
          clientId: 'manufacturer',
        },
        consumer: {
          groupId: 'manufacturer',
        },
      },
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
