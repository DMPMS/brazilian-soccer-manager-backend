import { ManagerglobalEntity } from 'src/managerglobal/entities/managerglobal.entity';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'country' })
export class CountryEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'src_image', nullable: false })
  srcImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => ManagerglobalEntity,
    (managerglobal) => managerglobal.country,
  )
  managersglobal?: ManagerglobalEntity[];

  @OneToMany(() => TeamglobalEntity, (teamglobal) => teamglobal.country)
  teamsglobal?: TeamglobalEntity[];
}
