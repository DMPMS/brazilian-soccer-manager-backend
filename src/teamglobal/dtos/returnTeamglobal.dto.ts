import { ReturnCountryDto } from 'src/country/dtos/returnCountry.dto';
import { TeamglobalEntity } from '../entities/teamglobal.entity';
import { ReturnManagerglobalDto } from 'src/managerglobal/dtos/returnManagerglobal.dto';

export class ReturnTeamglobalDto {
  id: number;
  name: string;
  srcImage: string;
  country?: ReturnCountryDto;
  managerglobal?: ReturnManagerglobalDto;

  constructor(teamglobalEntity: TeamglobalEntity) {
    this.id = teamglobalEntity.id;
    this.name = teamglobalEntity.name;
    this.srcImage = teamglobalEntity.srcImage;

    this.country = teamglobalEntity.country
      ? new ReturnCountryDto(teamglobalEntity.country)
      : undefined;

    this.managerglobal = teamglobalEntity.managerglobal
      ? new ReturnManagerglobalDto(teamglobalEntity.managerglobal)
      : undefined;
  }
}
