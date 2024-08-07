import { CompetitionsaveEntity } from 'src/competitionsave/entities/competitionsave.entity';
import { ManagersaveEntity } from 'src/managersave/entities/managersave.entity';
import { PlayersaveEntity } from 'src/playersave/entities/playersave.entity';
import { TeamsaveEntity } from 'src/teamsave/entities/teamsave.entity';
import { UserEntity } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'save' })
export class SaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @Column({ name: 'controller_managersave_id', nullable: true })
  controllerManagersaveId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'datetime', nullable: false })
  datetime: Date;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => UserEntity, (user) => user.saves)
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user?: UserEntity;

  @OneToOne(() => ManagersaveEntity, (managersave) => managersave.controledSave)
  @JoinColumn({ name: 'controller_managersave_id', referencedColumnName: 'id' })
  controllerManagersave?: ManagersaveEntity;

  @OneToMany(() => ManagersaveEntity, (managersave) => managersave.save)
  managerssave?: ManagersaveEntity[];

  @OneToMany(() => TeamsaveEntity, (teamsave) => teamsave.save)
  teamssave?: TeamsaveEntity[];

  @OneToMany(() => PlayersaveEntity, (playersave) => playersave.save)
  playerssave?: PlayersaveEntity[];

  @OneToMany(
    () => CompetitionsaveEntity,
    (competitionsave) => competitionsave.save,
  )
  competitionssave?: CompetitionsaveEntity[];
}
