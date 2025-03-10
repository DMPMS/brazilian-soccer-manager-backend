import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { TeamsaveEntity } from '../entities/teamsave.entity';
import { ReturnManagersaveDTO } from 'src/managersave/dtos/returnManagersave.dto';
import { ReturnPlayersaveDTO } from 'src/playersave/dtos/returnPlayersave.dto';
import { ReturnCompetitionsaveTeamsaveDTO } from 'src/competitionsave_teamsave/dtos/returnCompetitionsaveTeamsave.dto';
import { ReturnMatchDTO } from 'src/match/dtos/returnMatch.dto';

import * as dayjs from 'dayjs';

export class ReturnTeamsaveDTO {
  id: number;
  name: string;
  srcImage: string;
  playerssaveCount: number;

  country?: ReturnCountryDTO;
  managersave?: ReturnManagersaveDTO;
  playerssave?: ReturnPlayersaveDTO[];
  competitionssaveTeamsave?: ReturnCompetitionsaveTeamsaveDTO[];

  matches?: ReturnMatchDTO[];

  constructor(teamsaveEntity: TeamsaveEntity) {
    this.id = teamsaveEntity.id;
    this.name = teamsaveEntity.name;
    this.srcImage = teamsaveEntity.srcImage;

    this.country = teamsaveEntity.country
      ? new ReturnCountryDTO(teamsaveEntity.country)
      : undefined;

    this.managersave = teamsaveEntity.managersave
      ? new ReturnManagersaveDTO(teamsaveEntity.managersave)
      : undefined;

    this.playerssave = teamsaveEntity.playerssave
      ? teamsaveEntity.playerssave.map(
          (playersave) => new ReturnPlayersaveDTO(playersave),
        )
      : undefined;

    this.playerssaveCount = teamsaveEntity.playerssaveCount;

    this.competitionssaveTeamsave = teamsaveEntity.competitionssaveTeamsave
      ? teamsaveEntity.competitionssaveTeamsave.map(
          (competitionsaveTeamsave) =>
            new ReturnCompetitionsaveTeamsaveDTO(competitionsaveTeamsave),
        )
      : undefined;

    const homeMatches = teamsaveEntity.homeMatches
      ? teamsaveEntity.homeMatches.map(
          (homeMatche) => new ReturnMatchDTO(homeMatche),
        )
      : [];

    const awayMatches = teamsaveEntity.awayMatches
      ? teamsaveEntity.awayMatches.map(
          (awayMatche) => new ReturnMatchDTO(awayMatche),
        )
      : [];

    this.matches =
      homeMatches.length || awayMatches.length
        ? [...homeMatches, ...awayMatches].sort(
            (a, b) => dayjs(a.date).valueOf() - dayjs(b.date).valueOf(),
          )
        : undefined;
  }
}
