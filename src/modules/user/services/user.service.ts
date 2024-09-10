import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { User } from '@module/user/entities/user.entity';
import { UserRepository } from '@module/user/repositories/user.repository';
import { CreateUserServiceDto } from '../dto/create-user.dto';

@Injectable()
export class UserService {
  private logger = new Logger(UserService.name);

  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserServiceDto: CreateUserServiceDto): Promise<User> {
    return this.userRepository.create(createUserServiceDto);
  }

  async findOne(
    param: Partial<User>,
    searchType: 'OR' | 'AND' = 'OR',
  ): Promise<User> {
    return this.userRepository.findOne(param, searchType);
  }

  async findOneOrFail(
    param: Partial<User>,
    searchType: 'OR' | 'AND' = 'OR',
  ): Promise<User> {
    const user = await this.userRepository.findOne(param, searchType);
    if (!user) throw new NotFoundException('User not found');
    return user;
  }
}
