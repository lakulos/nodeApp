import { IsNotEmpty, IsString } from 'class-validator';
import { Response } from 'express';

export class LoginUsecaseDto {
  readonly email: string;
  readonly password: string;
  cookies: any;
}

export class LoginRequestDto {
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
