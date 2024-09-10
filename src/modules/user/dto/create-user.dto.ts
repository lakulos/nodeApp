import { I18nUtils } from '@shared/utils/i18n/i18n.utils';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
  IsOptional,
} from 'class-validator';

const { t } = I18nUtils;

export class CreateUserServiceDto {
  name: string;
  email: string;
  phoneNumber: string;
  password: string;
  roleId?: string;
}

export class CreateUserUsecaseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  roleId?: string;
}

export class CreateUserRequestDto extends CreateUserUsecaseDto {}
