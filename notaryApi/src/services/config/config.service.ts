export class ConfigService {
  private readonly envConfig: { [key: string]: any } = null;

  constructor() {
    this.envConfig = {};
    this.envConfig.kafkaServer = {
      server: process.env.KAFKA_SERVER || 'kafka:9092',
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
