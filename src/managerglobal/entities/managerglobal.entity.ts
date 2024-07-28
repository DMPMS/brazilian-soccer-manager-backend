import { CountryEntity } from 'src/country/entities/country.entity';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'managerglobal' })
export class ManagerglobalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'birthdate', nullable: false })
  birthdate: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.managersglobal)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @OneToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.managerglobal)
  teamglobal?: TeamglobalEntity;
}
