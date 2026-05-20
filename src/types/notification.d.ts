
export interface NotificationType  {
  title: string;
  description: string;
  iconUrl: string;
  iconPath: string;
  createdBy: ObjectId;
  user: ObjectId;
  readStatus: boolean;
  _id:string;
  createdAt:string;
}