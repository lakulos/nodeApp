import { UseCase } from '@shared/usecase/base-usecase';
import { RoleService } from '../services/role.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from '../entities/role.entity';
import { CreateRoleUsecaseDto } from '../dto/create-role.dto';

@Injectable()
export class CreateRoleUsecase extends UseCase<Role> {
  constructor(private readonly RoleService: RoleService) {
    super();
  }

  async execute(createRoleUsecaseDto: CreateRoleUsecaseDto): Promise<Role> {
    await this.checkIfRoleAlreadyExists(createRoleUsecaseDto);
    return this.RoleService.create(createRoleUsecaseDto);
  }

  private async checkIfRoleAlreadyExists(
    createRoleUsecaseDto: CreateRoleUsecaseDto,
  ): Promise<void> {
    const Role = await this.RoleService.findOne({
      name: createRoleUsecaseDto.name,
      alias: createRoleUsecaseDto.alias,
    });

    if (Role) {
      throw new BadRequestException('Role already exists');
    }
  }
}
