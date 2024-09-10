import { prisma } from '@shared/repository/repository-config';
import { Session, User, Prisma } from '@prisma/client';

const SessionModel = prisma.session;

export { SessionModel, Session, Prisma };
