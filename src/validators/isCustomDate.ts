import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import { isValidDateFormat } from 'src/utils/isValidDateFormat';

@ValidatorConstraint({ name: 'isCustomDate', async: false })
export class IsCustomDate implements ValidatorConstraintInterface {
  validate(dateString: string) {
    return isValidDateFormat(dateString);
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be in the format 'YYYY-MM-DD'`;
  }
}
