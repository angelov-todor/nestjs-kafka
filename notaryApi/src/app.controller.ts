import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotaryService } from './services/notary.service';

@Controller()
export class AppController {
  constructor(private readonly notaryService: NotaryService) {}

  @MessagePattern('notary-record')
  newRecord(@Payload() data: { value: any }): string {
    return JSON.stringify(this.notaryService.newRecord(data.value));
  }

  @MessagePattern('notary-get-record')
  getRecord(@Payload() data: { value: any }): string {
    return JSON.stringify(this.notaryService.getRecord(data.value));
  }
}
