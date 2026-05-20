export interface QuestionType {
  _id: string;
  subjectExam: string;
  assignment: string;
  question: string;
  options: string[];
  answer: string;
  attachmentUrl: string;
  attachmentPath: string;
  type: "LONGTYPE" | "MCQTYPE" | "ATTACHMENT";
  subject: string;
  markAwarded: number;
  explanation: string;
}
