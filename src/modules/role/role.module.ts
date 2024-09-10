import { Module } from '@nestjs/common';
import { RoleService } from '@module/role/services/role.service';
import { RoleController } from '@module/role/controllers/role.controller';
import { CreateRoleUsecase } from './usecases/create-role.usecase';
import { RoleRepository } from './repositories/role.repository';
import { Broker } from '@broker/broker';

@Module({
  controllers: [RoleController],
  providers: [Broker, RoleRepository, RoleService, CreateRoleUsecase],
})
export class RoleModule {}
