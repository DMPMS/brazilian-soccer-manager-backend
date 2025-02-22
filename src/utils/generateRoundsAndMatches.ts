import { RuleEnum } from 'src/shared/enums/Rule.enum';
import { MatchType } from 'src/types/Match.type';
import {
  availableDateMatchIndicesByCompetition,
  availableTimesMatch,
} from './constants/others';
import { getWeekdayDates } from './getWeekdayDates';
import { SAVE_DATETIME } from './constants/dtoValidators';

export function generateRoundsAndMatches(
  ruleId: RuleEnum,
  teamsaveIds: number[],
): MatchType[][] {
  const shuffledTeamsaveIds = teamsaveIds.sort(() => 0.5 - Math.random());

  if (ruleId === RuleEnum.BrazilianLeagueA) {
    return generateForBrazilianLeagueA(shuffledTeamsaveIds);
  }

  if (ruleId === RuleEnum.BrazilianLeagueB) {
    return generateForBrazilianLeagueB(shuffledTeamsaveIds);
  }

  if (ruleId === RuleEnum.BrazilianLeagueC) {
    return generateForBrazilianLeagueC(shuffledTeamsaveIds);
  }

  if (ruleId === RuleEnum.BrazilianLeagueD) {
    return generateForBrazilianLeagueD(shuffledTeamsaveIds);
  }

  // if (ruleId === RuleEnum.BrazilianCup) {
  //   return generateForBrazilianCup(teamsaveIds);
  // }

  // if (ruleId === RuleEnum.BrazilianSuperCup) {
  //   return generateForBrazilianSuperCup(teamsaveIds);
  // }
}

function generateForBrazilianLeagueA(teamsaveIds: number[]): MatchType[][] {
  const numberOfTeams = teamsaveIds.length;

  const rounds: MatchType[][] = [];
  const numberOfRounds = (numberOfTeams - 1) * 2;
  const numberOfMatchesPerRound = numberOfTeams / 2;

  const saveYear = Number(SAVE_DATETIME.split('-')[0]);
  const dates = getWeekdayDates(saveYear);
  const availableDateMatchIndices =
    availableDateMatchIndicesByCompetition[RuleEnum.BrazilianLeagueA];

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
    const returnRound = round.map((match) => {
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

    dateIndex++;
    return returnRound;
  });

  return rounds.concat(returnRounds);
}

function generateForBrazilianLeagueB(teamsaveIds: number[]): MatchType[][] {
  const numberOfTeams = teamsaveIds.length;

  const rounds: MatchType[][] = [];
  const numberOfRounds = (numberOfTeams - 1) * 2;
  const numberOfMatchesPerRound = numberOfTeams / 2;

  const saveYear = Number(SAVE_DATETIME.split('-')[0]);
  const dates = getWeekdayDates(saveYear);
  const availableDateMatchIndices =
    availableDateMatchIndicesByCompetition[RuleEnum.BrazilianLeagueB];

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
    const returnRound = round.map((match) => {
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

    dateIndex++;
    return returnRound;
  });

  return rounds.concat(returnRounds);
}

function generateForBrazilianLeagueC(teamsaveIds: number[]): MatchType[][] {
  const numberOfTeams = teamsaveIds.length;

  const rounds: MatchType[][] = [];
  const numberOfRounds = (numberOfTeams - 1) * 2;
  const numberOfMatchesPerRound = numberOfTeams / 2;

  const saveYear = Number(SAVE_DATETIME.split('-')[0]);
  const dates = getWeekdayDates(saveYear);
  const availableDateMatchIndices =
    availableDateMatchIndicesByCompetition[RuleEnum.BrazilianLeagueC];

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
    const returnRound = round.map((match) => {
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

    dateIndex++;
    return returnRound;
  });

  return rounds.concat(returnRounds);
}

function generateForBrazilianLeagueD(teamsaveIds: number[]): MatchType[][] {
  const numberOfTeams = teamsaveIds.length;

  const rounds: MatchType[][] = [];
  const numberOfRounds = (numberOfTeams - 1) * 2;
  const numberOfMatchesPerRound = numberOfTeams / 2;

  const saveYear = Number(SAVE_DATETIME.split('-')[0]);
  const dates = getWeekdayDates(saveYear);
  const availableDateMatchIndices =
    availableDateMatchIndicesByCompetition[RuleEnum.BrazilianLeagueD];

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
    const returnRound = round.map((match) => {
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

    dateIndex++;
    return returnRound;
  });

  return rounds.concat(returnRounds);
}
