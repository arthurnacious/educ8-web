export interface Session {
  id: string;
  name: string;
}

interface Attendance {
  sessionId: string;
  status: "present" | "absent";
}

export interface User {
  id: string;
  name: string;
  image: string | null;
  marks: Field[];
  payments: Payment[];
  attendance: Attendance[];
}

export interface Enrollment {
  studentId: string;
  lessonRosterId: string;
  user: User;
}

export interface Field {
  id: string;
  name: string;
  amount: number;
  passRate: number;
  studentId: string;
}

interface Payment {
  id: string;
  userId: string;
  classId: string;
  paymentMethod: string;
  amount: number;
  createdAt: Date;
}
