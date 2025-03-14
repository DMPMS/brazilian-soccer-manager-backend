import { CompetitionsaveTeamsaveEntity } from 'src/competitionsave_teamsave/entities/competitionsave_teamsave.entity';
import { CountryEntity } from 'src/country/entities/country.entity';
import { ManagersaveEntity } from 'src/managersave/entities/managersave.entity';
import { MatchEntity } from 'src/match/entities/match.entity';
import { PlayersaveEntity } from 'src/playersave/entities/playersave.entity';
import { RankingEntity } from 'src/ranking/entities/ranking.entity';
import { SaveEntity } from 'src/save/entities/save.entity';
import { SquadplansaveEntity } from 'src/squadplansave/entities/squadplansave.entity';
import { TeamglobalEntity } from 'src/teamglobal/entities/teamglobal.entity';
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

@Entity({ name: 'teamsave' })
export class TeamsaveEntity {
  @PrimaryGeneratedColumn('rowid')
  id: number;

  @Column({ name: 'save_id', nullable: false })
  saveId: number;

  @Column({ name: 'teamglobal_id', nullable: true })
  teamglobalId: number;

  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  @Column({ name: 'managersave_id', nullable: false })
  managersaveId: number;

  @Column({ name: 'name', nullable: false })
  name: string;

  @Column({ name: 'src_image', nullable: false })
  srcImage: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ManyToOne(() => SaveEntity, (save) => save.teamssave)
  @JoinColumn({ name: 'save_id', referencedColumnName: 'id' })
  save?: SaveEntity;

  @ManyToOne(() => TeamglobalEntity, (teamglobal) => teamglobal.teamssave)
  @JoinColumn({ name: 'teamglobal_id', referencedColumnName: 'id' })
  teamglobal?: TeamglobalEntity;

  @ManyToOne(() => CountryEntity, (country) => country.teamssave)
  @JoinColumn({ name: 'country_id', referencedColumnName: 'id' })
  country?: CountryEntity;

  @OneToOne(() => ManagersaveEntity, (managersave) => managersave.teamsave)
  @JoinColumn({ name: 'managersave_id', referencedColumnName: 'id' })
  managersave?: ManagersaveEntity;

  playerssaveCount: number;

  @OneToMany(() => PlayersaveEntity, (playersave) => playersave.teamsave)
  playerssave?: PlayersaveEntity[];

  @OneToOne(
    () => SquadplansaveEntity,
    (squadplansave) => squadplansave.teamsave,
  )
  squadplansave?: SquadplansaveEntity;

  @OneToMany(
    () => CompetitionsaveTeamsaveEntity,
    (competitionsaveTeamsave) => competitionsaveTeamsave.teamsave,
  )
  competitionssaveTeamsave?: CompetitionsaveTeamsaveEntity[];

  @OneToMany(() => MatchEntity, (match) => match.teamsaveHome)
  homeMatches?: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.teamsaveAway)
  awayMatches?: MatchEntity[];

  @OneToMany(() => RankingEntity, (ranking) => ranking.teamsave)
  rankings?: RankingEntity[];
}
