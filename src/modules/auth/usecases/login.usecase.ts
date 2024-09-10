import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { User } from '@module/user/entities/user.entity';
import { UseCase } from '@shared/usecase/base-usecase';
import { LoginUsecaseDto } from '../dto/login.dto';
import { AuthService } from '../services/auth.service';
import { TokenService } from '../services/token.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LoginUsecase extends UseCase<User> {
  private logger = new Logger(LoginUsecase.name);

  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokenService,
    private readonly configService: ConfigService,
  ) {
    super();
  }

  async execute(LoginUsecaseDto: LoginUsecaseDto): Promise<any> {
    const user = await this.authService.authenticate(LoginUsecaseDto);
    const tokens = await this.tokenService.generateAuthToken(user);

    return {
      ...tokens,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.name,
        phoneNumber: user.phoneNumber,
        lastLoginAt: user.lastLoginAt,
      },
    };
  }
}
