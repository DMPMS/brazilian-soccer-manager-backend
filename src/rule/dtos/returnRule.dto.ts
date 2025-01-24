import { RuleEntity } from '../entities/rule.entity';

export class ReturnRuleDTO {
  id: number;
  name: string;
  numberOfTeams: number;
  description: string;
  defaultCompetitionName: string;
  defaultCompetitionSrcImage: string;

  constructor(ruleEntity: RuleEntity) {
    this.id = ruleEntity.id;
    this.name = ruleEntity.name;
    this.numberOfTeams = ruleEntity.numberOfTeams;
    this.description = ruleEntity.description;
    this.defaultCompetitionName = ruleEntity.defaultCompetitionName;
    this.defaultCompetitionSrcImage = ruleEntity.defaultCompetitionSrcImage;
  }
}
