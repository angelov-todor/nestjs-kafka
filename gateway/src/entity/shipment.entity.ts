import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ShipmentEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  vaccineName: string;

  @Column()
  quantity: number;

  @Column()
  manufacturingDate: number;

  @Column()
  manufacturerId: string;

  @Column()
  authorityId: string;

  @Column()
  customerId: string;
}
