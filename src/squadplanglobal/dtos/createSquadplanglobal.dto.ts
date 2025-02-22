import {
  ArrayMaxSize,
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsInt,
  Validate,
} from 'class-validator';
import { FormationEnum } from 'src/shared/enums/Formation.enum';
import { TEAMGLOBAL_SQUADPLANGLOBAL_PLAYERSGLOBAL_LENGTH } from 'src/utils/constants/dtoValidators';
import { UniqueArray } from 'src/validators/uniqueArray';

export class CreateSquadplanglobalDTO {
  @IsInt()
  teamglobalId: number;

  @IsEnum(FormationEnum)
  formationId: FormationEnum;

  @IsArray()
  @IsInt({ each: true })
  @Validate(UniqueArray)
  @ArrayMinSize(TEAMGLOBAL_SQUADPLANGLOBAL_PLAYERSGLOBAL_LENGTH)
  @ArrayMaxSize(TEAMGLOBAL_SQUADPLANGLOBAL_PLAYERSGLOBAL_LENGTH)
  playerglobalIds: number[];
}
