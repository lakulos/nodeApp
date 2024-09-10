import { Module } from '@nestjs/common';
import { Broker } from '@broker/broker';
import { AuthService } from './services/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { AuthController } from './controllers/auth.controller';
import { UserService } from '@module/user/services/user.service';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';
import { TokenGeneratorUtil } from '@shared/utils/encryption/token.util';
import { BcryptHashingUtil } from '@shared/utils/hashing/bycrpt.utils';
import { UserRepository } from '@module/user/repositories/user.repository';
import { LoginUsecase } from './usecases/login.usecase';
import { TokenService } from './services/token.service';
import { SessionRepository } from './repositories/session.repository';
import { RandomnessService } from '@shared/utils/encryption/randomness.util';

@Module({
  imports: [
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        privateKey: configService.get<string>('common.auth.jwt_secrete'),
        signOptions: {
          expiresIn: configService.get<number>(
            'common.auth.accessTokenExpiration',
          ),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    Broker,
    LoginUsecase,
    AuthService,
    UserService,
    TokenService,
    TokenGeneratorUtil,
    UserRepository,
    SessionRepository,
    RandomnessService,
    {
      provide: HashingUtil,
      useClass: BcryptHashingUtil,
    },
  ],
})
export class AuthModule {}
