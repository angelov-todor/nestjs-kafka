import { Event } from './event';
import { Message } from './message';
import { ShipmentRequest } from './shipment.request';
import { v4 } from 'uuid';

export class Shipment {
  id: string;
  vaccineName: string;
  quantity: number;
  manufacturingDate: number;
  manufacturerId: string;
  authorityId: string;
  customerId: string;
  events: Event[];
  messagesSent: Message[];
  messagesReceived: Message[];

  public static newInstance(shipmentRequest: ShipmentRequest): Shipment {
    return Object.assign(new Shipment(), {
      ...shipmentRequest,
      id: v4(),
    });
  }
}
