import { prisma } from '@shared/repository/repository-config';
import { User } from '@prisma/client';

// User prisma model
const UserModel = prisma.user;

export { UserModel, User };
