import SubjectType from "./subject";
import UserType from "./user";

export interface AssignmentType {
  title: string;
  introduction: string;
  type: "MCQTYPE" | "LONGTYPE" | "ATTACHMENT";
  dueDate: Date;
  fullMark: number;
  attachmentUrl: string;
  attachmentPath: string;
  dateOfAssignment: Date;
  batch: Batch;
  student: UserType[];
  createdBy: UserType;
  subject: SubjectType;
  totalQuestions: number;
  _id: string;
  createdAt: Date;
  totalSubmitted: number;
  totalStudent: number;
  isSubmitted: boolean;
  totalMarkSecure: number;
  totalCorrectAnswer: number;
}
