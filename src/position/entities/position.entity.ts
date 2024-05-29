import { PlayerglobalPositionEntity } from 'src/playerglobal_position/entities/playerglobal_position.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'position' })
export class PositionEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'abbreviation', nullable: false })
  abbreviation: string;

  @Column({ name: 'area', nullable: false })
  area: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @OneToMany(
    () => PlayerglobalPositionEntity,
    (playerglobalPosition) => playerglobalPosition.position,
  )
  playersglobalPosition?: PlayerglobalPositionEntity[];
}
