import { prisma } from '@shared/repository/repository-config';
import { Role } from '@prisma/client';

// Role prisma model
const RoleModel = prisma.role;

export { RoleModel, Role };
