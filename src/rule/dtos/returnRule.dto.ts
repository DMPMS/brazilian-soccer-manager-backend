import { RuleEntity } from '../entities/rule.entity';

export class ReturnRuleDTO {
  id: number;
  name: string;
  competitionType: number;
  numberOfTeams: number;
  yellowCardsMax: number;

  constructor(rule: RuleEntity) {
    this.id = rule.id;
    this.name = rule.name;
    this.competitionType = rule.competitionType;
    this.numberOfTeams = rule.numberOfTeams;
    this.yellowCardsMax = rule.yellowCardsMax;
  }
}
