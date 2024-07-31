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

@Entity({ name: 'competitionsave_teamsave' })
export class CompetitionsaveTeamsaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'competitionsave_id', nullable: false })
  competitionsaveId: number;

  @Column({ name: 'teamsave_id', nullable: false })
  teamsaveId: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.competitionssaveTeamsave,
  )
  @JoinColumn({ name: 'competitionsave_id', referencedColumnName: 'id' })
  competitionsave?: CompetitionsaveEntity;

  @ManyToOne(
    () => TeamsaveEntity,
    (teamsave) => teamsave.competitionssaveTeamsave,
  )
  @JoinColumn({ name: 'teamsave_id', referencedColumnName: 'id' })
  teamsave?: TeamsaveEntity;
}
