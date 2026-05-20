import BatchType from "./batch";
import SubjectType from "./subject";
import UserType from "./user";

export interface ClassType {
  _id: string;
  batch: BatchType;
  subject: SubjectType;
  teacher: UserType;
  startTime: string;
  endTime: string;
  credits: number;
  classRoom: string;
  type: "OFFLINE" | "ONLINE";
  cancelled: boolean;
  isHoliday: boolean;
}
