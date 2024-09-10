import { Module } from '@nestjs/common';
import { Broker } from '@broker/broker';
import { UserService } from '@module/user/services/user.service';
import { UserController } from '@module/user/controllers/user.controller';
import { UserRepository } from '@module/user/repositories/user.repository';
import { CreateUserUsecase } from '@module/user/usecases/create-user.usecase';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';
import { BcryptHashingUtil } from '@shared/utils/hashing/bycrpt.utils';

@Module({
  controllers: [UserController],
  providers: [
    Broker,
    CreateUserUsecase,
    UserService,
    UserRepository,
    {
      provide: HashingUtil,
      useClass: BcryptHashingUtil,
    },
  ],
})
export class UserModule {}
