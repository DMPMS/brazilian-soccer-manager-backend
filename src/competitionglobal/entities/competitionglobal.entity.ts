import { CompetitionglobalTeamglobalEntity } from 'src/competitionglobal_teamglobal/entities/competitionglobal_teamglobal.entity';
import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { RuleEntity } from 'src/rule/entities/rule.entity';
import { RuleEnum } from 'src/shared/enums/Rule.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'competitionglobal' })
export abstract class CompetitionglobalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'rule_id', nullable: false })
  ruleId: RuleEnum;

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

  @OneToOne(() => RuleEntity, (rule) => rule.competitionglobal)
  @JoinColumn({ name: 'rule_id', referencedColumnName: 'id' })
  rule?: RuleEntity;

  @OneToMany(
    () => CompetitionglobalTeamglobalEntity,
    (competitionglobalTeamglobal) =>
      competitionglobalTeamglobal.competitionglobal,
  )
  competitionsglobalTeamglobal?: CompetitionglobalTeamglobalEntity[];

  @OneToMany(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.competitionglobal,
  )
  competitionssave?: CompetitionsaveEntity[];
}
