import { CountryEntity } from 'src/country/entities/country.entity';
import { PlayerglobalEntity } from 'src/playerglobal/entities/playerglobal.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
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

@Entity({ name: 'playersave' })
export class PlayersaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'save_id', nullable: false })
  saveId: number;

  @Column({ name: 'playerglobal_id', nullable: true })
  playerglobalId: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'teamsave_id', nullable: true })
  teamsaveId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'birthdate', nullable: false })
  birthdate: Date;

  @Column({ name: 'overall', nullable: false })
  overall: number;

  @Column({ name: 'stamina', nullable: false })
  stamina: number;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SaveEntity, (save) => save.playerssave)
  @JoinColumn({ name: 'save_id', referencedColumnName: 'id' })
  save?: SaveEntity;

  @ManyToOne(
    () => PlayerglobalEntity,
    (playerglobal) => playerglobal.playerssave,
  )
  @JoinColumn({ name: 'playerglobal_id', referencedColumnName: 'id' })
  playerglobal?: PlayerglobalEntity;

  @ManyToOne(() => CountryEntity, (country) => country.playerssave)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @ManyToOne(() => TeamsaveEntity, (teamsave) => teamsave.playerssave)
  @JoinColumn({ name: 'teamsave_id', referencedColumnName: 'id' })
  teamsave?: TeamsaveEntity;

  // @OneToMany(
  //   () => PlayersavePositionEntity,
  //   (playersavePosition) => playersavePosition.playersave,
  // )
  // playerssavePosition?: PlayersavePositionEntity[];
}
