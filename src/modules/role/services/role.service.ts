import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { CreateRoleServiceDto } from '../dto/create-role.dto';
import { RoleRepository } from '@module/role/repositories/role.repository';
import { Role } from '@module/role/entities/role.entity';

@Injectable()
export class RoleService {
  private logger = new Logger(RoleService.name);

  constructor(private readonly roleRepository: RoleRepository) {}

  async create(createRoleServiceDto: CreateRoleServiceDto): Promise<Role> {
    return this.roleRepository.create(createRoleServiceDto);
  }

  async findOne(
    param: Partial<Role>,
    searchType: 'OR' | 'AND' = 'OR',
  ): Promise<Role> {
    return this.roleRepository.findOne(param, searchType);
  }

  async findOneOrFail(
    param: Partial<Role>,
    searchType: 'OR' | 'AND' = 'OR',
  ): Promise<Role> {
    const role = await this.roleRepository.findOne(param, searchType);
    if (!role) throw new NotFoundException('role not found');
    return role;
  }
}
