import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Message } from '../message';
import { ClientKafka } from '@nestjs/microservices';
import { NotaryRecord } from '../notary-record';
import { Shipment } from '../shipment';
import { KAFKA_SERVICE } from './constants';

@Injectable()
export class AuthorityService implements OnModuleInit {
  private static createAckMessage(shipmentMessage: Message): Message {
    shipmentMessage.payload.messageType = 'MessageAcknowledgement';
    return shipmentMessage;
  }

  private shipments: Map<string, Shipment> = new Map();
  constructor(
    @Inject(KAFKA_SERVICE) private readonly clientKafka: ClientKafka,
  ) {}

  async validateNewShipment(shipmentMessage: Message) {
    const shipmentId = shipmentMessage.payload.shipment.id;
    if (this.shipments.has(shipmentId)) {
      // If the shipment already exists in the Authority's instance storage, it is
      // rejected (there can only be one Created event for each shipment Id)
      return;
    }
    const record: NotaryRecord = await this.clientKafka
      .send('notary-get-record', { hash: shipmentMessage.hash })
      .toPromise();
    if (
      record.nonce !== shipmentMessage.nonce ||
      record.timestamp !== shipmentMessage.timestamp
    ) {
      // Upon calling the Notary API with the payload's hash, if the nonce and
      // timestamp returned are different from the message's nonce and
      // timestamp, the message is rejected
      return;
    }

    // If the message has been checked, a shipment is created in the Authority's
    // instance storage, and the message received is stored under that record
    // Then, the Authority sends a message back to the Manufacturer to
    // acknowledge the message received (same process in reverse)

    const shipment: Shipment = shipmentMessage.payload.shipment;
    const message = AuthorityService.createAckMessage(shipmentMessage);
    const stringMessage = JSON.stringify(message);
    shipment.messages = [message];
    this.shipments.set(shipmentId, shipmentMessage.payload.shipment);

    this.clientKafka.emit(message.payload.messageType, stringMessage);
  }

  async onModuleInit() {
    // Need to subscribe to topic
    // so that we can get the response from kafka microservice
    this.clientKafka.subscribeToResponseOf('notary-get-record');
  }
}
