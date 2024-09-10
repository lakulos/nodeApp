import { Injectable } from '@nestjs/common';
import { HashingUtil } from './hashing.utils';
import { compare, genSalt, hash } from 'bcrypt';

const BCRYPT_SALT_ROUNDS = Number(process.env.BCRYPT_SALT_ROUNDS);

@Injectable()
export class BcryptHashingUtil implements HashingUtil {
  async hash(value: string | Buffer): Promise<string> {
    return await hash(value, BCRYPT_SALT_ROUNDS);
  }

  async compare(value: string | Buffer, encrypted: string): Promise<boolean> {
    return await compare(value, encrypted);
  }
}
