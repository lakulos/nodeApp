import { Prisma, PrismaClient } from '@prisma/client';
import { ConfigService } from '@nestjs/config';

const ENVIRONMENT = process.env.ENVIRONMENT || 'production';
const options = { errorFormat: 'minimal' };

// Select the prisma options based on the environment.
switch (ENVIRONMENT) {
  case 'local':
    options['log'] = ['query'];
    break;

  case 'development':
    options['log'] = ['info', 'warn', 'error'];
    break;

  case 'product':
    options['log'] = ['error'];
    break;

  default:
    options['log'] = ['info', 'warn', 'error'];
    break;
}

console.log(options);

export const prisma = new PrismaClient(options as Prisma.PrismaClientOptions);
