import UserType from "./user";

export interface SupportMessageType {
  enquiry: string;
  sender: UserType;
  recipient: UserType;
  message: string;
  isRead: boolean;
  _id: string;
  createdAt: string;
  updatedAt: string;
}
