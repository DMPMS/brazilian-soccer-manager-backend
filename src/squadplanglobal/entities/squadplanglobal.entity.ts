import { FormationEntity } from 'src/formation/entities/formation.entity';
import { FormationEnum } from 'src/shared/enums/Formation.enum';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';
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

@Entity({ name: 'squadplanglobal' })
export abstract class SquadplanglobalEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'formation_id', nullable: false })
  formationId: FormationEnum;

  @Column({ name: 'teamglobal_id', nullable: false })
  teamglobalId: number;

  @Column('int', { array: true, name: 'playerglobal_ids', nullable: false })
  playerglobalIds: number[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => FormationEntity, (formation) => formation.squadplansglobal)
  @JoinColumn({ name: 'formation_id', referencedColumnName: 'id' })
  formation?: FormationEntity;

  @OneToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.squadplanglobal)
  @JoinColumn({ name: 'teamglobal_id', referencedColumnName: 'id' })
  teamglobal?: TeamglobalEntity;
}
