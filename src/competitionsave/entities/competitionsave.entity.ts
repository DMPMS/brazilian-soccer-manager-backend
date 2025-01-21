import { CompetitionglobalEntity } from 'src/competitionglobal/entities/competitionglobal.entity';
import { CompetitionsaveTeamsaveEntity } from 'src/competitionsave_teamsave/entities/competitionsave_teamsave.entity';
import { CountryEntity } from 'src/country/entities/country.entity';
import { RoundEntity } from 'src/round/entities/round.entity';
import { RuleEntity } from 'src/rule/entities/rule.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import { RuleEnum } from 'src/shared/enums/Rule.enum';
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

@Entity({ name: 'competitionsave' })
export abstract class CompetitionsaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'save_id', nullable: false })
  saveId: number;

  @Column({ name: 'competitionglobal_id', nullable: true })
  competitionglobalId: number;

  @Column({ name: 'rule_id', nullable: false })
  ruleId: RuleEnum;

  @Column({ name: 'country_id', nullable: true })
  countryId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'season', nullable: false })
  season: string;

  @Column({ name: 'src_image', nullable: false })
  srcImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SaveEntity, (save) => save.competitionssave)
  @JoinColumn({ name: 'save_id', referencedColumnName: 'id' })
  save?: SaveEntity;

  @ManyToOne(
    () => CompetitionglobalEntity,
    (competitionglobal) => competitionglobal.competitionssave,
  )
  @JoinColumn({ name: 'competitionglobal_id', referencedColumnName: 'id' })
  competitionglobal?: CompetitionglobalEntity;

  @ManyToOne(() => RuleEntity, (rule) => rule.competitionssave)
  @JoinColumn({ name: 'rule_id', referencedColumnName: 'id' })
  rule?: RuleEntity;

  @ManyToOne(() => CountryEntity, (country) => country.competitionssave)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @OneToMany(
    () => CompetitionsaveTeamsaveEntity,
    (competitionsaveTeamsave) => competitionsaveTeamsave.competitionsave,
  )
  competitionssaveTeamsave?: CompetitionsaveTeamsaveEntity[];

  @OneToMany(() => RoundEntity, (round) => round.competitionsave)
  rounds?: RoundEntity[];
}
