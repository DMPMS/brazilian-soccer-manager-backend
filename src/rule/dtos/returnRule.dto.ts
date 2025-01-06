import { RuleCompetitionTypeEnum } from 'src/shared/enums/RuleCompetitionType.enum';
import { RuleEntity } from '../entities/rule.entity';

export class ReturnRuleDTO {
  id: number;
  name: string;
  competitionType: RuleCompetitionTypeEnum;
  numberOfTeams: number;
  description: string;
  default_competition_name: string;
  default_competition_src_image: string;

  constructor(ruleEntity: RuleEntity) {
    this.id = ruleEntity.id;
    this.name = ruleEntity.name;
    this.competitionType = ruleEntity.competitionType;
    this.numberOfTeams = ruleEntity.numberOfTeams;
    this.description = ruleEntity.description;
    this.default_competition_name = ruleEntity.default_competition_name;
    this.default_competition_src_image =
      ruleEntity.default_competition_src_image;
  }
}
