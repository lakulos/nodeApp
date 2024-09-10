import { User } from '@module/user/entities/user.entity';
import { UseCase } from '@shared/usecase/base-usecase';
import { UserService } from '../services/user.service';
import { CreateUserUsecaseDto } from '../dto/create-user.dto';
import { BadRequestException, Injectable } from '@nestjs/common';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';

@Injectable()
export class CreateUserUsecase extends UseCase<User> {
  constructor(
    private readonly userService: UserService,
    private readonly hashingUtil: HashingUtil,
  ) {
    super();
  }

  async execute(createUserUsecaseDto: CreateUserUsecaseDto): Promise<User> {
    await this.checkIfUserAlreadyExists(createUserUsecaseDto);
    const user = await this.userService.create({
      ...createUserUsecaseDto,
      password: await this.hashingUtil.hash(createUserUsecaseDto.password),
    });

    delete user.password;
    return user;
  }

  private async checkIfUserAlreadyExists(
    createUserUsecaseDto: CreateUserUsecaseDto,
  ): Promise<void> {
    const user = await this.userService.findOne({
      email: createUserUsecaseDto.email,
      phoneNumber: createUserUsecaseDto.phoneNumber,
    });

    if (user) {
      throw new BadRequestException('user already exists');
    }
  }
}
