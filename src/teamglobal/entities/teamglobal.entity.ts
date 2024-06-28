import { CompetitionglobalTeamglobalEntity } from 'src/competitionglobal_teamglobal/entities/competitionglobal_teamglobal.entity';
import { CountryEntity } from 'src/country/entities/country.entity';
import { ManagerglobalEntity } from 'src/managerglobal/entities/managerglobal.entity';
import { PlayerglobalEntity } from 'src/playerglobal/entities/playerglobal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'teamglobal' })
export class TeamglobalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'managerglobal_id', nullable: false })
  managerglobalId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'src_image', nullable: false })
  srcImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.teamsglobal)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @OneToOne(
    () => ManagerglobalEntity,
    (managerglobal) => managerglobal.teamglobal,
  )
  @JoinColumn({ name: 'managerglobal_id', referencedColumnName: 'id' })
  managerglobal?: ManagerglobalEntity;

  @OneToMany(
    () => CompetitionglobalTeamglobalEntity,
    (competitionglobalTeamglobal) => competitionglobalTeamglobal.teamglobal,
  )
  competitionsglobalTeamglobal?: CompetitionglobalTeamglobalEntity[];

  @OneToMany(
    () => PlayerglobalEntity,
    (playerglobal) => playerglobal.teamglobal,
  )
  playersglobal?: PlayerglobalEntity[];

  playersglobalCount: number;
}
