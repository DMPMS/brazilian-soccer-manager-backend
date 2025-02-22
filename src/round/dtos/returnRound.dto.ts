import { ReturnCompetitionsaveDTO } from 'src/competitionsave/dtos/returnCompetitionsave.dto';
import { RoundEntity } from '../entities/round.entity';
import { ReturnMatchDTO } from 'src/match/dtos/returnMatch.dto';

export class ReturnRoundDTO {
  id: number;
  name: string;

  competitionsave?: ReturnCompetitionsaveDTO;
  matches?: ReturnMatchDTO[];

  constructor(roundEntity: RoundEntity) {
    this.id = roundEntity.id;
    this.name = roundEntity.name;

    this.competitionsave = roundEntity.competitionsave
      ? new ReturnCompetitionsaveDTO(roundEntity.competitionsave)
      : undefined;

    this.matches = roundEntity.matches
      ? roundEntity.matches
          .map((match) => new ReturnMatchDTO(match))
          .sort(
            (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
          )
      : undefined;
  }
}
