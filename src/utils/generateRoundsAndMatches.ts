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
  if (competitionType === RuleCompetitionTypeEnum.BrazilianLeagueA) {
    return generateForBrazilianLeagueA(teamsaveIds);
  }

  if (competitionType === RuleCompetitionTypeEnum.BrazilianLeagueB) {
    return generateForBrazilianLeagueB(teamsaveIds);
  }

  if (competitionType === RuleCompetitionTypeEnum.BrazilianLeagueC) {
    return generateForBrazilianLeagueC(teamsaveIds);
  }

  if (competitionType === RuleCompetitionTypeEnum.BrazilianLeagueD) {
    return generateForBrazilianLeagueD(teamsaveIds);
  }

  // if (competitionType === RuleCompetitionTypeEnum.BrazilianCup) {
  //   return generateForBrazilianCup(teamsaveIds);
  // }

  // if (competitionType === RuleCompetitionTypeEnum.BrazilianSuperCup) {
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
    availableDateMatchIndicesByCompetition[
      RuleCompetitionTypeEnum.BrazilianLeagueA
    ];

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
    availableDateMatchIndicesByCompetition[
      RuleCompetitionTypeEnum.BrazilianLeagueB
    ];

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
    availableDateMatchIndicesByCompetition[
      RuleCompetitionTypeEnum.BrazilianLeagueC
    ];

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
    availableDateMatchIndicesByCompetition[
      RuleCompetitionTypeEnum.BrazilianLeagueD
    ];

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
