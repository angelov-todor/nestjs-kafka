import { ApiProperty } from '@nestjs/swagger';

export class Shipment {
  @ApiProperty()
  id: string;

  @ApiProperty()
  vaccineName: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  manufacturingDate: number;

  @ApiProperty()
  manufacturerId: string;

  @ApiProperty()
  authorityId: string;

  @ApiProperty()
  customerId: string;
}
