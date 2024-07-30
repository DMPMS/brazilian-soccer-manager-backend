import { CountryEntity } from 'src/country/entities/country.entity';
import { ManagerglobalEntity } from 'src/managerglobal/entities/managerglobal.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'managersave' })
export class ManagersaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'save_id', nullable: false })
  saveId: number;

  @Column({ name: 'managerglobal_id', nullable: true })
  managerglobalId: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'birthdate', nullable: false })
  birthdate: Date;

  @Column({ name: 'controlled', nullable: false })
  controlled: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SaveEntity, (save) => save.managerssave)
  @JoinColumn({ name: 'save_id', referencedColumnName: 'id' })
  save?: SaveEntity;

  @ManyToOne(
    () => ManagerglobalEntity,
    (managerglobal) => managerglobal.managerssave,
  )
  @JoinColumn({ name: 'managerglobal_id', referencedColumnName: 'id' })
  managerglobal?: ManagerglobalEntity;

  @ManyToOne(() => CountryEntity, (country) => country.managerssave)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;
}
