import { CountryEntity } from 'src/country/entities/country.entity';
import { PlayerglobalPositionEntity } from 'src/playerglobal_position/entities/playerglobal_position.entity';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';
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

@Entity({ name: 'playerglobal' })
export class PlayerglobalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'teamglobal_id', nullable: true })
  teamglobalId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'birthdate', nullable: false })
  birthdate: Date;

  @Column({ name: 'overall', nullable: false })
  overall: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.playersglobal)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @ManyToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.playersglobal)
  @JoinColumn({ name: 'teamglobal_id', referencedColumnName: 'id' })
  teamglobal?: TeamglobalEntity;

  @OneToMany(
    () => PlayerglobalPositionEntity,
    (playerglobalPosition) => playerglobalPosition.playerglobal,
  )
  playersglobalPosition?: PlayerglobalPositionEntity[];
}
