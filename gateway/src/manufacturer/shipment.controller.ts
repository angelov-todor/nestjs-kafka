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
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Shipment } from './shipment';
import { Event } from './dto/event';
import { Message } from './dto/message';

@Controller('shipment')
export class ShipmentController implements OnModuleInit {
  constructor(
    @Inject(KAFKA_SERVICE) private readonly clientKafka: ClientKafka,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create new shipment' })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiResponse({
    status: 201,
    description: 'Created new shipment.',
    type: Shipment,
  })
  @ApiBody({ type: ShipmentRequest })
  public async newShipment(
    @Body() shipmentRequest: ShipmentRequest,
  ): Promise<Shipment> {
    return await this.clientKafka
      .send('shipment_create', shipmentRequest)
      .toPromise();
  }

  @Get()
  @ApiResponse({
    status: 200,
    description: 'Get all shipments.',
    type: [Shipment],
  })
  public async getShipments(): Promise<Shipment[]> {
    return await this.clientKafka.send('shipment_list', {}).toPromise();
  }

  @Get('events')
  @ApiResponse({
    status: 200,
    description: 'Get events for debug.',
    type: [Event],
  })
  public async getShipmentsEvents() {
    return await this.clientKafka.send('shipment_events', {}).toPromise();
  }

  @Get('messages')
  @ApiResponse({
    status: 200,
    description: 'Get messages for debug.',
    type: [Message],
  })
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
