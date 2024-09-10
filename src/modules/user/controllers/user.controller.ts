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
} from '@nestjs/common';
import { Broker } from '@broker/broker';
import { User } from '@module/user/entities/user.entity';
import { CreateUserRequestDto } from '../dto/create-user.dto';
import { CreateUserUsecase } from '../usecases/create-user.usecase';

@Controller('user')
export class UserController {
  constructor(
    private readonly broker: Broker,
    private readonly createUserUsecase: CreateUserUsecase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createUserRequestDto: CreateUserRequestDto) {
    const result = await this.broker.runUsecases<User>(
      [this.createUserUsecase],
      createUserRequestDto,
    );

    return result;
  }
}
