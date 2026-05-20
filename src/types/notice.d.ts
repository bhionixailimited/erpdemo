export interface NoticeType {
  title: string;
  description: string;
  startTime: string;
  endTime: string;
  expireTime: string;
  role: "ADMIN" | "STAFF" | "TEACHER" | "STUDENT" | "ALL";
  batch: ObjectId;
  createdBy: ObjectId;
  createdAt: string;
  _id: string;
}
