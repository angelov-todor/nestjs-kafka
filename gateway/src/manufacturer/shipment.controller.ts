import {
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Post,
} from '@nestjs/common';
import { KAFKA_SERVICE } from '../constants';
import { ClientKafka } from '@nestjs/microservices';
import { ShipmentRequest } from './shipment.request';

@Controller('shipment')
export class ShipmentController implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly clientKafka: ClientKafka,
  ) {}

  @Post()
  public async newShipment(@Body() shipmentRequest: ShipmentRequest) {
    return await this.clientKafka
      .send('shipment_create', shipmentRequest)
      .toPromise();
  }

  @Get()
  public async getShipments() {
    return await this.clientKafka.send('shipment_list', {}).toPromise();
  }

  @Get('events')
  public async getShipmentsEvents() {
    return await this.clientKafka.send('shipment_events', {}).toPromise();
  }

  @Get('messages')
  public async getShipmentsMessages() {
    return await this.clientKafka.send('shipment_messages', {}).toPromise();
  }

  async onModuleInit() {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    this.clientKafka.subscribeToResponseOf('shipment_list');
    this.clientKafka.subscribeToResponseOf('shipment_create');
    this.clientKafka.subscribeToResponseOf('shipment_messages');
    this.clientKafka.subscribeToResponseOf('shipment_events');
    // await this.clientKafka.connect();
  }
}
