import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { MatchEntity } from 'src/match/entities/match.entity';
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

@Entity({ name: 'round' })
export class RoundEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'competitionsave_id', nullable: false })
  competitionsaveId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.rounds,
  )
  @JoinColumn({ name: 'competitionsave_id', referencedColumnName: 'id' })
  competitionsave?: CompetitionsaveEntity;

  @OneToMany(() => MatchEntity, (match) => match.round)
  matches?: MatchEntity[];
}
