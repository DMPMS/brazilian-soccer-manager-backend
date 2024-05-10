import { ReturnCountryDto } from 'src/country/dtos/returnCountry.dto';
import { CompetitionglobalEntity } from '../entities/competitionglobal.entity';
import { ReturnRuleDto } from 'src/rule/dtos/returnRule.dto';

export class ReturnCompetitionglobalDto {
  id: number;
  name: string;
  season: string;
  level: string;
  srcImage: string;
  rule?: ReturnRuleDto;
  country?: ReturnCountryDto;

  constructor(competitionglobalEntity: CompetitionglobalEntity) {
    this.id = competitionglobalEntity.id;
    this.name = competitionglobalEntity.name;
    this.season = competitionglobalEntity.season;
    this.level = competitionglobalEntity.level;
    this.srcImage = competitionglobalEntity.srcImage;

    this.rule = competitionglobalEntity.rule
      ? new ReturnRuleDto(competitionglobalEntity.rule)
      : undefined;

    this.country = competitionglobalEntity.country
      ? new ReturnCountryDto(competitionglobalEntity.country)
      : undefined;
  }
}
