import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity()
export class StoredDataEntity {
  @PrimaryColumn({ unique: true })
  id: string;

  @Column('text')
  value: string;
}
