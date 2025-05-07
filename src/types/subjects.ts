export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  departmentId: string;
  department: {
    id: string;
    name: string;
  };
  createdAt: Date;
  updatedAt: Date;
}
