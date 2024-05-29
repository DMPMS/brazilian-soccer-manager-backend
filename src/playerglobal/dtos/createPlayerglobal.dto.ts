import {
  ArrayNotEmpty,
  IsArray,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePlayerglobalDTO {
  @IsNumber()
  countryId: number;

  @IsOptional()
  @IsNumber()
  teamglobalId: number;

  @IsString()
  name: string;

  @IsNumber()
  age: number;

  @IsNumber()
  overall: number;

  @IsArray()
  @ArrayNotEmpty()
  @IsNumber({}, { each: true })
  primaryPositionIds: number[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  secondaryPositionIds: number[];
}
