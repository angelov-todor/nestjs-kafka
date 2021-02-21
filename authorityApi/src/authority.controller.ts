import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { AuthorityService } from './services/authority.service';

@Controller()
export class AuthorityController {
  constructor(private readonly authorityService: AuthorityService) {}

  @EventPattern('ShipmentCreated')
  async handleShipmentCreated(@Payload() data: { value: any }) {
    await this.authorityService.validateNewShipment(data.value);
  }
}
