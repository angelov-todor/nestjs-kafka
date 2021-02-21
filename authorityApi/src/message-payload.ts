import { Shipment } from './shipment';

export interface MessagePayload {
  messageType: 'EventNotification' | 'MessageAcknowledgement';
  actorId: number;
  messageContent: string;
  shipment: Shipment;
}
