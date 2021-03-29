import { Shipment } from '../shipment';
import { ApiProperty } from '@nestjs/swagger';

export class EventPayload {
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
  @ApiProperty()
  id: string;

  @ApiProperty()
  nonce: number;

  @ApiProperty()
  timestamp: number;

  @ApiProperty({ type: EventPayload })
  payload: EventPayload;

  @ApiProperty()
  hash: string;

  @ApiProperty()
  signature: string;
}
