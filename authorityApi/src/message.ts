import { MessagePayload } from './message-payload';

export class Message {
  id: string;
  nonce: number;
  timestamp: number;
  payload: MessagePayload;
  hash: string;
  signature: string;
}
