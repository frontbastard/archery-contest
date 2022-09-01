import { UserRole } from '../common/user-roles';

export interface User {
  id: string;
  email: string;
  name: string;
  dateOfBirth: Date;
  role: UserRole;
  blocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserFilterModel {
  blocked: boolean;
}
