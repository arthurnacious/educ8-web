export interface BaseCourse {
  id: string;
  subjectName: string;
  departmentName: string;
  createdAt: Date;
}

export interface LecturedCourse extends BaseCourse {
  lecturer: {
    name: string;
    image?: string;
  };
}
