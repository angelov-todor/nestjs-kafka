import { Shipment } from './shipment';

export interface EventPayload {
  eventType:
    | 'ShipmentCreated'
    | 'ShipmentShipped'
    | 'ShipmentApproved'
    | 'ShipmentBlocked'
    | 'ShipmentAccepted'
    | 'ShipmentRejected';
  actorId: number;
  shipment: Shipment;
}

export class Event {
  id: string;
  nonce: number;
  timestamp: number;
  payload: EventPayload;
  hash: string;
  signature: string;
}
