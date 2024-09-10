import { User } from '@module/user/entities/user.entity';
import { UserService } from '@module/user/services/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { HashingUtil } from '@shared/utils/hashing/hashing.utils';

type AuthParams = {
  email: string;
  password: string;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly hashingUtil: HashingUtil,
    private readonly userService: UserService,
  ) {}

  async authenticate(authParams: AuthParams): Promise<User> {
    const user = await this.findUserByEmail(authParams.email);
    await this.validatePassword(user, authParams.password);
    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userService.findOne({
      email,
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async validatePassword(user: User, password: string): Promise<void> {
    const isPasswordValid = await this.hashingUtil.compare(
      password,
      user.password,
    );
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
