import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import * as sharp from 'sharp';
import axios from 'axios';

const validateImage = (srcImage: string): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    axios
      .get(srcImage, { responseType: 'arraybuffer' })
      .then((response) => {
        sharp(response.data)
          .metadata()
          .then(() => resolve(true))
          .catch(() => resolve(false)); // Se a imagem não for válida
      })
      .catch(() => resolve(false)); // Se a URL não for acessível
  });
};

@ValidatorConstraint({ name: 'isValidImage', async: true })
export class isValidImage implements ValidatorConstraintInterface {
  async validate(srcImage: string) {
    const isValid = await validateImage(srcImage);
    return isValid;
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} is not a valid image URL`;
  }
}
