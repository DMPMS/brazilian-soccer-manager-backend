import { CompetitionglobalEntity } from 'src/competitionglobal/entities/competitionglobal.entity';
import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { RuleCompetitionTypeEnum } from 'src/shared/enums/RuleCompetitionType.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'rule' })
export class RuleEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'competition_type', nullable: false })
  competitionType: RuleCompetitionTypeEnum;

  @Column({ name: 'number_of_teams', nullable: false })
  numberOfTeams: number;

  @Column({ name: 'description', nullable: false })
  description: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

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
