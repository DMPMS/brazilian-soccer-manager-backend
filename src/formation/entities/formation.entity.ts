import { SquadplanglobalEntity } from 'src/squadplanglobal/entities/squadplanglobal.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'formation' })
export class FormationEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => SquadplanglobalEntity,
    (squadplanglobalEntity) => squadplanglobalEntity.formation,
  )
  squadplansglobal?: SquadplanglobalEntity[];
}
