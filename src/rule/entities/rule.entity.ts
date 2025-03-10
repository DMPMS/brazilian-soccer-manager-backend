import { CompetitionglobalEntity } from 'src/competitionglobal/entities/competitionglobal.entity';
import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { CountryEntity } from 'src/country/entities/country.entity';
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

@Entity({ name: 'rule' })
export class RuleEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'country_id', nullable: true })
  countryId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'level', nullable: false })
  level: number;

  @Column({ name: 'number_of_teams', nullable: false })
  numberOfTeams: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @Column({ name: 'default_competition_name', nullable: false })
  defaultCompetitionName: string;

  @Column({ name: 'default_competition_src_image', nullable: false })
  defaultCompetitionSrcImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => CountryEntity, (country) => country.rules)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @OneToOne(
    () => CompetitionglobalEntity,
    (competitionglobal) => competitionglobal.rule,
  )
  competitionglobal?: CompetitionglobalEntity;

  @OneToMany(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.rule,
  )
  competitionssave?: CompetitionsaveEntity[];
}
