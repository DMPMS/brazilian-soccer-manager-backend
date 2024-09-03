import { RoundEntity } from 'src/round/entities/round.entity';
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

@Entity({ name: 'match' })
export class MatchEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'round_id', nullable: false })
  roundId: number;

  @Column({ name: 'teamsave_home_id', nullable: false })
  teamsaveHomeId: number;

  @Column({ name: 'teamsave_away_id', nullable: false })
  teamsaveAwayId: number;

  @Column({ name: 'date', nullable: false })
  date: Date;

  @Column({ name: 'teamsave_home_goals', nullable: true })
  teamsaveHomeGoals: number;

  @Column({ name: 'teamsave_away_goals', nullable: true })
  teamsaveAwayGoals: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => RoundEntity, (round) => round.matches)
  @JoinColumn({ name: 'round_id', referencedColumnName: 'id' })
  round?: RoundEntity;

  @ManyToOne(() => TeamsaveEntity, (teamsave) => teamsave.homeMatches)
  @JoinColumn({ name: 'teamsave_home_id', referencedColumnName: 'id' })
  teamsaveHome?: TeamsaveEntity;

  @ManyToOne(() => TeamsaveEntity, (teamsave) => teamsave.awayMatches)
  @JoinColumn({ name: 'teamsave_away_id', referencedColumnName: 'id' })
  teamsaveAway?: TeamsaveEntity;
}
