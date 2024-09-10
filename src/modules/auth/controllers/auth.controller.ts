import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Res,
} from '@nestjs/common';
import { Broker } from '@broker/broker';
import { LoginRequestDto } from '../dto/login.dto';
import { LoginUsecase } from '../usecases/login.usecase';
import { Response } from 'express';
import { ConfigService } from '@nestjs/config';
import { access } from 'fs';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly broker: Broker,
    private readonly loginUsecase: LoginUsecase,
    private readonly configService: ConfigService,
  ) {}

  @Post('/login')
  @HttpCode(HttpStatus.OK)
  async create(
    @Res({ passthrough: true }) res: Response,
    @Body() loginRequestDto: LoginRequestDto,
  ) {
    const result = await this.broker.runUsecases(
      [this.loginUsecase],
      loginRequestDto,
    );

    res.cookie(
      this.configService.get<string>('common.auth.cookie.name'),
      JSON.stringify({
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      }),
      {
        maxAge: this.configService.get<number>('common.auth.cookie.expiry'),
        httpOnly: true,
        secure: false,
        path: '/',
        sameSite: 'lax',
      },
    );

    return result;
  }
}
