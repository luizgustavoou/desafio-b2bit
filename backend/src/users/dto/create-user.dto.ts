import {
  IsEmail,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';

import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  registerDecorator,
  ValidationOptions,
} from 'class-validator';

// TODO: Mover custom validator para outro arquivo
@ValidatorConstraint({ name: 'minIfNotNull', async: false })
export class MinIfNotNullValidator implements ValidatorConstraintInterface {
  validate(text: string, args: ValidationArguments) {
    const maxLength = args.constraints[0] || 30;

    if (text === undefined) return true;

    return text.length <= maxLength;
  }

  defaultMessage(args: ValidationArguments) {
    const maxLength = args.constraints[0] || 30;
    return `about must be shorter than or equal to ${maxLength} characters`;
  }
}

export function MinIfNotNull(
  maxLength?: number,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'minIfNotNull',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [maxLength],
      validator: MinIfNotNullValidator,
    });
  };
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  @MinLength(3)
  name: string;

  @MinIfNotNull(30)
  about: string;

  @IsUrl()
  @IsOptional()
  avatarURL: string | null;
}
