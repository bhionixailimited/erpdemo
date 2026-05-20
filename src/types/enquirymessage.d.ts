export interface EnquireMessageType {
  enquiry: ObjectId;
  sender: ObjectId;
  recipient: ObjectId;
  message: string;
  isRead: boolean;
}
