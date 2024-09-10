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
import { Role } from '@module/role/entities/role.entity';
import { CreateRoleRequestDto } from '../dto/create-role.dto';
import { CreateRoleUsecase } from '../usecases/create-role.usecase';

@Controller('role')
export class RoleController {
  constructor(
    private readonly broker: Broker,
    private readonly createRoleUsecase: CreateRoleUsecase,
  ) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() createRoleRequestDto: CreateRoleRequestDto) {
    const result = await this.broker.runUsecases<Role>(
      [this.createRoleUsecase],
      createRoleRequestDto,
    );

    return result;
  }
}
