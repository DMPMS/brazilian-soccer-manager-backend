import { ReturnCountryDTO } from 'src/country/dtos/returnCountry.dto';
import { TeamglobalEntity } from '../entities/teamglobal.entity';
import { ReturnManagerglobalDTO } from 'src/managerglobal/dtos/returnManagerglobal.dto';

export class ReturnTeamglobalDTO {
  id: number;
  name: string;
  srcImage: string;
  country?: ReturnCountryDTO;
  managerglobal?: ReturnManagerglobalDTO;

  constructor(teamglobalEntity: TeamglobalEntity) {
    this.id = teamglobalEntity.id;
    this.name = teamglobalEntity.name;
    this.srcImage = teamglobalEntity.srcImage;

    this.country = teamglobalEntity.country
      ? new ReturnCountryDTO(teamglobalEntity.country)
      : undefined;

    this.managerglobal = teamglobalEntity.managerglobal
      ? new ReturnManagerglobalDTO(teamglobalEntity.managerglobal)
      : undefined;
  }
}
