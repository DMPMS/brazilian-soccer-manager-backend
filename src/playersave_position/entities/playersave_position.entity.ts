import { PlayersaveEntity } from 'src/playersave/entities/playersave.entity';
import { PositionEntity } from 'src/position/entities/position.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'playersave_position' })
export class PlayersavePositionEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'playersave_id', nullable: false })
  playersaveId: number;

  @Column({ name: 'position_id', nullable: false })
  positionId: number;

  @Column({ name: 'rating', type: 'decimal', nullable: false })
  rating: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => PlayersaveEntity,
    (playersave) => playersave.playerssavePosition,
  )
  @JoinColumn({ name: 'playersave_id', referencedColumnName: 'id' })
  playersave?: PlayersaveEntity;

  @ManyToOne(() => PositionEntity, (position) => position.playerssavePosition)
  @JoinColumn({ name: 'position_id', referencedColumnName: 'id' })
  position?: PositionEntity;
}
