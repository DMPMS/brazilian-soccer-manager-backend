import { RuleCompetitionTypeEnum } from 'src/shared/enums/RuleCompetitionType.enum';
import { MatchType } from 'src/types/Match.type';
import {
  availableDateMatchIndicesByCompetition,
  availableTimesMatch,
} from './constants/others';
import { getWeekdayDates } from './getWeekdayDates';
import { SAVE_DATETIME } from './constants/dtoValidators';

export function generateRoundsAndMatches(
  competitionType: RuleCompetitionTypeEnum,
  teamsaveIds: number[],
): MatchType[][] {
  if (competitionType === RuleCompetitionTypeEnum.League) {
    return generateForCompetitionTypeLeague(teamsaveIds);
  }
}

function generateForCompetitionTypeLeague(
  teamsaveIds: number[],
): MatchType[][] {
  const numberOfTeams = teamsaveIds.length;

  //   if (numberOfTeams % 2 !== 0) {
  //     teamsaveIds.push(null);
  //   }

  const rounds: MatchType[][] = [];
  const numberOfRounds = (numberOfTeams - 1) * 2;
  const numberOfMatchesPerRound = numberOfTeams / 2;

  const saveYear = Number(SAVE_DATETIME.split('-')[0]);
  const dates = getWeekdayDates(saveYear);
  const availableDateMatchIndices =
    availableDateMatchIndicesByCompetition[RuleCompetitionTypeEnum.League];

  let dateIndex = 0;

  for (let i = 0; i < numberOfRounds / 2; i++) {
    const matches: MatchType[] = [];

    for (let j = 0; j < numberOfMatchesPerRound; j++) {
      const teamsaveAId = teamsaveIds[j];
      const teamsaveBId = teamsaveIds[numberOfTeams - 1 - j];

      const randomTime =
        availableTimesMatch[
          Math.floor(Math.random() * availableTimesMatch.length)
        ];

      if (i % 2 === 0) {
        matches.push({
          teamsaveHomeId: teamsaveAId,
          teamsaveAwayId: teamsaveBId,
          date: `${dates[availableDateMatchIndices[dateIndex]]} ${randomTime}`,
        });
      } else {
        matches.push({
          teamsaveHomeId: teamsaveBId,
          teamsaveAwayId: teamsaveAId,
          date: `${dates[availableDateMatchIndices[dateIndex]]} ${randomTime}`,
        });
      }
    }

    rounds.push(matches);
    dateIndex++;

    // Rotate teamsaveIds (Round-robin tournament)
    teamsaveIds.splice(1, 0, teamsaveIds.pop()!);
  }

  const returnRounds = rounds.map((round) => {
    round.map((match) => {
      const randomTime =
        availableTimesMatch[
          Math.floor(Math.random() * availableTimesMatch.length)
        ];

      return {
        teamsaveHomeId: match.teamsaveAwayId,
        teamsaveAwayId: match.teamsaveHomeId,
        date: `${dates[availableDateMatchIndices[dateIndex]]} ${randomTime}`,
      };
    });

    round.map((match) => ({
      teamsaveHomeId: match.teamsaveAwayId,
      teamsaveAwayId: match.teamsaveHomeId,
      date: dates[availableDateMatchIndices[dateIndex]],
    }));

    dateIndex++;
    return round;
  });

  return rounds.concat(returnRounds);
}
