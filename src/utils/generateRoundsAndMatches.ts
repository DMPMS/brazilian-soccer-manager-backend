import { MatchType } from 'src/types/Match.type';

export function generateRoundsAndMatches(teamsaveIds: number[]): MatchType[][] {
  const numberOfTeams = teamsaveIds.length;

  //   if (numberOfTeams % 2 !== 0) {
  //     teamsaveIds.push(null);
  //   }

  const rounds: MatchType[][] = [];
  const numberOfRounds = (numberOfTeams - 1) * 2;
  const numberOfMatchesPerRound = numberOfTeams / 2;

  for (let i = 0; i < numberOfRounds / 2; i++) {
    const matches: MatchType[] = [];

    for (let j = 0; j < numberOfMatchesPerRound; j++) {
      const teamsaveAId = teamsaveIds[j];
      const teamsaveBId = teamsaveIds[numberOfTeams - 1 - j];

      if (i % 2 === 0) {
        matches.push({
          teamsaveHomeId: teamsaveAId,
          teamsaveAwayId: teamsaveBId,
        });
      } else {
        matches.push({
          teamsaveHomeId: teamsaveBId,
          teamsaveAwayId: teamsaveAId,
        });
      }
    }

    rounds.push(matches);

    // Rotate teamsaveIds (Round-robin tournament)
    teamsaveIds.splice(1, 0, teamsaveIds.pop()!);
  }

  const returnRounds = rounds.map((round) =>
    round.map((match) => ({
      teamsaveHomeId: match.teamsaveAwayId,
      teamsaveAwayId: match.teamsaveHomeId,
      date: '',
    })),
  );

  return rounds.concat(returnRounds);
}
