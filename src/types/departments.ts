import { departmentUserRole } from "./roles";

export interface Department {
  id: string;
  name: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CourseToDepartment {
  courseId: string;
  departmentId: string;
}

export interface User {
  id: string;
  name: string;
  email?: string;
  emailVerified?: Date;
  passwordHash?: string;
  roleId?: string;
  image?: string;
}

export interface DepartmentWithMembers extends Department {
  members: {
    id: string;
    name: string;
    email?: string;
    role: departmentUserRole;
  }[];
}
