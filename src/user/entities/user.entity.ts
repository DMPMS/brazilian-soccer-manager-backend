import { CountryEntity } from 'src/country/entities/country.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import { UserUserTypeEnum } from 'src/shared/enums/UserUserType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class UserEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'user_type', nullable: false })
  userType: UserUserTypeEnum;

  @Column({ name: 'birthdate', nullable: false })
  birthdate: Date;

  @Column({ name: 'email', nullable: false })
  email: string;

  @Column({ name: 'password', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.users)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @OneToMany(() => SaveEntity, (save) => save.user)
  saves?: SaveEntity[];
}
