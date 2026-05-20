import UserType from "./user";

export interface AssignmentStat {
  _id: string;
  answerSubmitted: boolean;
  batch: string;
  fullMark: number;
  reviewed: boolean;
  student: {
    enrollmentCode: string;
    rollNumber: string;
    user: UserType;
    _id: string;
  };
  answer: {
    totalMark: number;
    totalCorrect: number;
    totalWrong: number;
    submittedDate: string;
  };
}
