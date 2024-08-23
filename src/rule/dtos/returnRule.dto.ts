import { RuleCompetitionTypeEnum } from 'src/shared/enums/RuleCompetitionType.enum';
import { RuleEntity } from '../entities/rule.entity';

export class ReturnRuleDTO {
  id: number;
  name: string;
  competitionType: RuleCompetitionTypeEnum;
  numberOfTeams: number;
  yellowCardsMax: number;

  constructor(ruleEntity: RuleEntity) {
    this.id = ruleEntity.id;
    this.name = ruleEntity.name;
    this.competitionType = ruleEntity.competitionType;
    this.numberOfTeams = ruleEntity.numberOfTeams;
    this.yellowCardsMax = ruleEntity.yellowCardsMax;
  }
}
