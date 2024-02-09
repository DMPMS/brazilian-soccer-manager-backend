import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'save' })
export class SaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'id_user', nullable: false })
  idUser: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.saves)
  @JoinColumn({ name: 'id_user', referencedColumnName: 'id' })
  user?: UserEntity;
}
