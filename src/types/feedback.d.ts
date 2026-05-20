export interface FeedbackType {
  user: ObjectId;
  type: "FEEDBACK" | "STUDENT_FEEDBACK";
  isReplied: boolean;
  subject: string;
  description: string;
  _id: string;
  createdAt: string;
}
