import { ShipmentRequest } from './shipment.request';
import { Shipment } from './shipment';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { KAFKA_SERVICE } from '../services/constants';
import { ClientKafka } from '@nestjs/microservices';
import { Event, EventPayload } from './event';
import { v4 } from 'uuid';
import * as crypto from 'crypto';
import { Message, MessagePayload } from './message';

@Injectable()
export class ShipmentService implements OnModuleInit {
  private static ACTOR_ID = 1;
  private static createHash(payload: EventPayload | MessagePayload): string {
    return crypto
      .createHash('sha256')
      .update(JSON.stringify(payload))
      .digest('base64');
  }

  private shipments: Shipment[] = [];
  private events: Event[] = [];
  private messages: Message[] = [];

  constructor(
    @Inject(KAFKA_SERVICE) private readonly clientKafka: ClientKafka,
  ) {}

  async newShipment(shipmentRequest: ShipmentRequest): Promise<any> {
    const shipment = Shipment.newInstance(shipmentRequest);

    this.shipments.push(shipment);

    // create event
    const event = await this.createEvent(shipment);
    this.events.push(event);

    // create message
    const message = await this.createMessage(shipment);
    this.messages.push(message);
    // emit message
    this.clientKafka.emit(event.payload.eventType, JSON.stringify(event));

    return JSON.stringify(shipment);
  }

  listShipments(): Shipment[] {
    return this.shipments;
  }

  listMessages(): Message[] {
    return this.messages;
  }

  listEvents(): Event[] {
    return this.events;
  }

  private async createMessage(shipment: Shipment): Promise<Message> {
    const payload: MessagePayload = {
      actorId: ShipmentService.ACTOR_ID,
      messageContent: undefined,
      messageType: 'EventNotification',
      shipment,
    };
    const hash = ShipmentService.createHash(payload);
    const notary: {
      nonce: number;
      timestamp: number;
    } = await this.clientKafka
      .send('notary-record', { hash: hash })
      .toPromise();

    return Object.assign(new Message(), {
      id: v4(),
      nonce: notary.nonce,
      timestamp: notary.timestamp,
      payload: payload,
      hash: hash,
      signature: undefined,
    });
  }

  private async createEvent(shipment: Shipment) {
    const payload: EventPayload = {
      eventType: 'ShipmentCreated',
      actorId: ShipmentService.ACTOR_ID,
      shipment: shipment,
    };
    const hash = ShipmentService.createHash(payload);

    const notary: {
      nonce: number;
      timestamp: number;
    } = await this.clientKafka
      .send('notary-record', { hash: hash })
      .toPromise();

    return Object.assign(new Event(), {
      id: v4(),
      nonce: notary.nonce,
      timestamp: notary.timestamp,
      payload,
      hash,
      signature: undefined,
    });
  }

  async onModuleInit() {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    this.clientKafka.subscribeToResponseOf('notary-record');
    await this.clientKafka.connect();
  }
}
