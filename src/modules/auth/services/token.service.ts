import { UserRepository } from '@module/user/repositories/user.repository';
import { JwtService } from '@nestjs/jwt';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { User } from '@module/user/entities/user.entity';
import { TokenGeneratorUtil } from '@shared/utils/encryption/token.util';
import {
  SessionRepository,
  SessionWithUser,
} from '../repositories/session.repository';
import { RandomnessService } from '@shared/utils/encryption/randomness.util';

type Token = {
  accessToken: string;
  refreshToken: string;
};

@Injectable()
export class TokenService {
  private logger = new Logger(TokenService.name);

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly tokenGeneratorUtil: TokenGeneratorUtil,
    private readonly sessionRepository: SessionRepository,
    private readonly randomnessService: RandomnessService,
  ) {}

  async generateAuthToken(user: User): Promise<Token> {
    await this.userRepository.update(user.id, {
      lastLoginAt: new Date(),
    });
    const accessToken = this.generateAccessToken(user);
    const refreshToken = await this.generateRefreshToken(user);
    return { accessToken, refreshToken };
  }

  async generateRefreshToken(user: User): Promise<string> {
    const session = await this.sessionRepository.create({
      token: `${this.configService.get('common.auth.refreshTokenPrefix')}${this.randomnessService.generateSecureToken(
        this.configService.get('common.auth.refreshTokenLength'),
      )}`,
      userId: user.id,
      expiresAt: new Date(
        Date.now() +
          this.configService.get<number>(
            'common.auth.refreshTokenExpirationTime',
          ),
      ),
    });
    return session.token;
  }

  generateAccessToken(user: User): string {
    const payload = {
      id: user.id,
      name: user.name,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.roleId,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    };
    return this.jwtService.sign(payload);
  }

  async generateAccessTokenFromRefreshToken(refreshToken: string) {
    const token = (await this.sessionRepository.findOne(
      { token: refreshToken },
      'OR',
      true,
    )) as SessionWithUser;

    if (!token) {
      throw new UnauthorizedException('Session not found');
    }

    if (token.isRevoked || token.expiresAt < new Date()) {
      throw new UnauthorizedException('Session revoked or expired');
    }

    return this.generateAuthToken(token.user);
  }
}
