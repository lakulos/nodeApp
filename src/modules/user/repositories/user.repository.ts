import { Injectable, Logger } from '@nestjs/common';
import { User, UserModel } from '@module/user/entities/user.entity';
import { BaseRepository } from '@shared/repository/base-repository';

@Injectable()
export class UserRepository extends BaseRepository<User> {
  private logger = new Logger(UserRepository.name);
  private readonly userRepository: typeof UserModel;

  constructor() {
    super();
    this.userRepository = UserModel;
  }

  async create(data: any): Promise<User> {
    return this.userRepository.create({
      data,
    });
  }

  async update(
    id: string,
    data: Partial<Omit<User, 'id' | 'email'>>,
  ): Promise<User> {
    const user = await this.userRepository.update({
      where: {
        id,
      },
      data,
    });

    delete user.password;

    return user;
  }

  async findOne(
    param: Partial<User>,
    searchType: 'OR' | 'AND' = 'OR',
  ): Promise<User> {
    let where: Record<string, any> = {};
    let searchParam = [];

    for (let key in param) {
      searchParam.push({ [key]: param[key] });
    }
    where[searchType] = searchParam;

    return await this.userRepository.findFirst({ where });
  }

  async findAll(filter: Record<string, any>): Promise<User[]> {
    return await this.userRepository.findMany();
  }
}
