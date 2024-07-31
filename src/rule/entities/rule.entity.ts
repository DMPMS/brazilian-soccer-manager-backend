import { CompetitionglobalEntity } from 'src/competitionglobal/entities/competitionglobal.entity';
import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
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
  competitionType: number;

  @Column({ name: 'number_of_teams', nullable: false })
  numberOfTeams: number;

  @Column({ name: 'yellow_cards_max', nullable: false })
  yellowCardsMax: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => CompetitionglobalEntity,
    (competitionglobal) => competitionglobal.rule,
  )
  competitionsglobal?: CompetitionglobalEntity[];

  @OneToMany(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.rule,
  )
  competitionssave?: CompetitionsaveEntity[];
}
