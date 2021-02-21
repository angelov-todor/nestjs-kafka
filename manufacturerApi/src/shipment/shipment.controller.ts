import { Controller } from '@nestjs/common';
import { ShipmentService } from './shipment.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class ShipmentController {
  constructor(private readonly shipmentService: ShipmentService) {}

  @MessagePattern('shipment_create')
  newShipment(@Payload() shipmentRequest: { value: any }) {
    return this.shipmentService.newShipment(shipmentRequest.value);
  }

  @MessagePattern('shipment_list')
  listShipments() {
    return this.shipmentService.listShipments();
  }

  @MessagePattern('shipment_messages')
  listShipmentsMessages() {
    return this.shipmentService.listMessages();
  }

  @MessagePattern('shipment_events')
  listShipmentsEvents() {
    return this.shipmentService.listEvents();
  }

  @EventPattern('MessageAcknowledgement')
  async handleShipmentCreated(@Payload() data: { value: any }) {
    console.log('MessageAcknowledgement: ', data.value);
  }
}
