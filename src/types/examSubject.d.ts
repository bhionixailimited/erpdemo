import { Document } from "mongoose";
import ExamType from "./exam";

export interface ExamSubjectType extends Document {
  _id: string;
  exam: ExamType;
  type: "LONGTYPE" | "MCQTYPE";
  startTime: string;
  endTime: string;
  introduction: string;
  subject: SubjectType;
  fullMark: number;
  passMark: number;
  createdBy: UserType;
  credit: number;
}
