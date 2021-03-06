import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ShipmentRequest {
  @IsNotEmpty()
  @ApiProperty()
  vaccineName: string;

  @IsPositive()
  @ApiProperty()
  quantity: number;

  @IsDate()
  @ApiProperty()
  manufacturingDate: number;

  @IsNotEmpty()
  @ApiProperty()
  manufacturerId: string;

  @IsNotEmpty()
  @ApiProperty()
  authorityId: string;

  @IsNotEmpty()
  @ApiProperty()
  customerId: string;
}
