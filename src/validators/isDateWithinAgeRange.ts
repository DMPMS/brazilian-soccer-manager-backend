import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as dayjs from 'dayjs';
import { CURRENT_DATE_UTC } from 'src/utils/constants/others';

@ValidatorConstraint({ name: 'isDateWithinAgeRange', async: false })
export class IsDateWithinAgeRange implements ValidatorConstraintInterface {
  validate(dateString: string, args: ValidationArguments) {
    const [minAge, maxAge] = args.constraints as [number, number];

    const date = dayjs(dateString).startOf('day');

    const minDate = CURRENT_DATE_UTC.subtract(minAge, 'year').startOf('day');
    const maxDate = CURRENT_DATE_UTC.subtract(maxAge, 'year').startOf('day');

    return !(date.isAfter(minDate) || date.isBefore(maxDate));
  }

  defaultMessage(args: ValidationArguments) {
    const [minAge, maxAge] = args.constraints as [number, number];
    return `${args.property} must result in an age between ${minAge} and ${maxAge} years.`;
  }
}
