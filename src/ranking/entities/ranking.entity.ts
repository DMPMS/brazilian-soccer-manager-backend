import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { TeamsaveEntity } from 'src/teamsave/entities/teamsave.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'ranking' })
export abstract class RankingEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'competitionsave_id', nullable: false })
  competitionsaveId: number;

  @Column({ name: 'teamsave_id', nullable: false })
  teamsaveId: number;

  @Column({ name: 'points', nullable: false })
  points: number;

  @Column({ name: 'played', nullable: false })
  played: number;

  @Column({ name: 'wins', nullable: false })
  wins: number;

  @Column({ name: 'draws', nullable: false })
  draws: number;

  @Column({ name: 'losses', nullable: false })
  losses: number;

  @Column({ name: 'goals_for', nullable: false })
  goalsFor: number;

  @Column({ name: 'goals_against', nullable: false })
  goalsAgainst: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.rankings,
  )
  @JoinColumn({ name: 'competitionsave_id', referencedColumnName: 'id' })
  competitionsave?: CompetitionsaveEntity;

  @ManyToOne(() => TeamsaveEntity, (teamsave) => teamsave.rankings)
  @JoinColumn({ name: 'teamsave_id', referencedColumnName: 'id' })
  teamsave?: TeamsaveEntity;
}
