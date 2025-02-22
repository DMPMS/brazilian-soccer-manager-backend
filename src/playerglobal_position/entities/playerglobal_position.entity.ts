import { PlayerglobalEntity } from 'src/playerglobal/entities/playerglobal.entity';
import { PositionEntity } from 'src/position/entities/position.entity';
import { PositionEnum } from 'src/shared/enums/Position.enum';
import { PositionRatingEnum } from 'src/shared/enums/PositionRating.enum';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'playerglobal_position' })
export class PlayerglobalPositionEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'playerglobal_id', nullable: false })
  playerglobalId: number;

  @Column({ name: 'position_id', nullable: false })
  positionId: PositionEnum;

  @Column({ name: 'rating', type: 'decimal', nullable: false })
  rating: PositionRatingEnum;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(
    () => PlayerglobalEntity,
    (playerglobal) => playerglobal.playersglobalPosition,
  )
  @JoinColumn({ name: 'playerglobal_id', referencedColumnName: 'id' })
  playerglobal?: PlayerglobalEntity;

  @ManyToOne(() => PositionEntity, (position) => position.playersglobalPosition)
  @JoinColumn({ name: 'position_id', referencedColumnName: 'id' })
  position?: PositionEntity;
}
