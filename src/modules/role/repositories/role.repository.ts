import { Logger } from '@nestjs/common';
import { BaseRepository } from '@shared/repository/base-repository';
import { Role, RoleModel } from '../entities/role.entity';

export class RoleRepository extends BaseRepository<Role> {
  private logger = new Logger(RoleRepository.name);
  private readonly roleRepository: typeof RoleModel;

  constructor() {
    super();
    this.roleRepository = RoleModel;
  }

  async create(data: any): Promise<Role> {
    return this.roleRepository.create({
      data,
    });
  }

  async update(id: string, data: Partial<Omit<Role, 'id'>>): Promise<Role> {
    const user = await this.roleRepository.update({
      where: {
        id,
      },
      data,
    });

    return user;
  }

  async findOne(
    param: Partial<Role>,
    searchType: 'OR' | 'AND' = 'OR',
  ): Promise<Role> {
    let where: Record<string, any> = {};
    let searchParam = [];

    for (let key in param) {
      searchParam.push({ [key]: param[key] });
    }
    where[searchType] = searchParam;

    return await this.roleRepository.findFirst({ where });
  }

  async findAll(filter: Record<string, any>): Promise<Role[]> {
    return await this.roleRepository.findMany();
  }
}
