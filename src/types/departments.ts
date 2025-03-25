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
  email: string;
  emailVerified?: boolean;
  roleId: string;
  image?: string;
}

export interface GetDepartmentBySlugType extends Department {
  members: {
    departmentId: string;
    userId: string;
    role: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }[];
  courses: {
    id: string;
    name: string;
    slug: string;
    createdAt: Date;
  }[];
}
