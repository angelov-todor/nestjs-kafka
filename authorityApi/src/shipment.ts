import { Message } from './message';

export class Shipment {
  id: string;
  vaccineName: string;
  quantity: number;
  manufacturingDate: number;
  manufacturerId: string;
  authorityId: string;
  customerId: string;
  messages: Message[] = [];
}
