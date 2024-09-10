import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateRoleServiceDto {
  name: string;
  alias: string;
}

export class CreateRoleUsecaseDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(20)
  alias: string;
}

export class CreateRoleRequestDto extends CreateRoleUsecaseDto {}
