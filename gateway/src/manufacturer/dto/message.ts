import { Shipment } from '../shipment';

export interface MessagePayload {
  messageType: 'EventNotification' | 'MessageAcknowledgement';
  actorId: number;
  messageContent: string;
  shipment: Shipment;
}

export class Message {
  id: string;
  nonce: number;
  timestamp: number;
  payload: MessagePayload;
  hash: string;
  signature: string;
}
