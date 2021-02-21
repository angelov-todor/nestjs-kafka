import { IsDate, IsNotEmpty, IsPositive } from 'class-validator';

export class ShipmentRequest {
  @IsNotEmpty()
  vaccineName: string;
  @IsPositive()
  quantity: number;
  @IsDate()
  manufacturingDate: number;
  @IsNotEmpty()
  manufacturerId: string;
  @IsNotEmpty()
  authorityId: string;
  @IsNotEmpty()
  customerId: string;
}
