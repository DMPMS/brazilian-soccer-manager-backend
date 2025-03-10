import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { RuleEntity } from '../entities/rule.entity';

export class ReturnRuleDTO {
  id: number;
  name: string;
  level: number;
  numberOfTeams: number;
  description: string;
  defaultCompetitionName: string;
  defaultCompetitionSrcImage: string;

  country?: ReturnCountryDTO;

  constructor(ruleEntity: RuleEntity) {
    this.id = ruleEntity.id;
    this.name = ruleEntity.name;
    this.level = ruleEntity.level;
    this.numberOfTeams = ruleEntity.numberOfTeams;
    this.description = ruleEntity.description;
    this.defaultCompetitionName = ruleEntity.defaultCompetitionName;
    this.defaultCompetitionSrcImage = ruleEntity.defaultCompetitionSrcImage;

    this.country = ruleEntity.country
      ? new ReturnCountryDTO(ruleEntity.country)
      : undefined;
  }
}
