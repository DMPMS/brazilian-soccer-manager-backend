import { FormationEntity } from 'src/formation/entities/formation.entity';
import { FormationEnum } from 'src/shared/enums/Formation.enum';
import { TeamsaveEntity } from 'src/teamsave/entities/teamsave.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'squadplansave' })
export abstract class SquadplansaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'formation_id', nullable: false })
  formationId: FormationEnum;

  @Column({ name: 'teamsave_id', nullable: false })
  teamsaveId: number;

  @Column('int', { array: true, name: 'playersave_ids', nullable: false })
  playersaveIds: number[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => FormationEntity, (formation) => formation.squadplanssave)
  @JoinColumn({ name: 'formation_id', referencedColumnName: 'id' })
  formation?: FormationEntity;

  @OneToOne(() => TeamsaveEntity, (teamsave) => teamsave.squadplansave)
  @JoinColumn({ name: 'teamsave_id', referencedColumnName: 'id' })
  teamsave?: TeamsaveEntity;
}
