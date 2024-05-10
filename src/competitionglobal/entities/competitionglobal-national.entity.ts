import { ChildEntity, Column } from 'typeorm';
import { CompetitionglobalEntity } from './competitionglobal.entity';
import { CreateCompetitionglobalDto } from '../dtos/createCompetitionglobal.dto';

@ChildEntity()
export class CompetitionglobalNationalEntity extends CompetitionglobalEntity {
  @Column({ name: 'country_id', nullable: false })
  countryId: number;

  constructor(createCompetitionglobalDto: CreateCompetitionglobalDto) {
    super(createCompetitionglobalDto);
    this.countryId = createCompetitionglobalDto?.countryId || 0;
  }
}
