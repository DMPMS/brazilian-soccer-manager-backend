import { CompetitionglobalEntity } from 'src/competitionglobal/entities/competitionglobal.entity';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'competitionglobal_teamglobal' })
export class CompetitionglobalTeamglobalEntity {
  @PrimaryColumn({ name: 'competitionglobal_id' })
  @Column({ name: 'competitionglobal_id', nullable: false })
  competitionglobalId: number;

  @PrimaryColumn({ name: 'competitionglobal_id' })
  @Column({ name: 'teamglobal_id', nullable: false })
  teamglobalId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => CompetitionglobalEntity,
    (competitionglobal) => competitionglobal.competitionsglobalTeamglobal,
  )
  @JoinColumn({ name: 'competitionglobal_id', referencedColumnName: 'id' })
  competitionglobal?: CompetitionglobalEntity;

  @ManyToOne(
    () => TeamglobalEntity,
    (teamglobal) => teamglobal.competitionsglobalTeamglobal,
  )
  @JoinColumn({ name: 'teamglobal_id', referencedColumnName: 'id' })
  teamglobal?: TeamglobalEntity;
}
