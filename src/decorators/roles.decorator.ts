import { SetMetadata } from '@nestjs/common';
import { ROLE_ENUM } from '../users/users.constant';

export const ROLES_KEY = 'role';
export const Roles = (role: ROLE_ENUM) => SetMetadata(ROLES_KEY, role);
