export interface EnquireType {
  subject: string;
  user: ObjectId;
  isResolved: boolean;
  resolveDate: Date;
  resolveUser: ObjectId;
  createdAt: Date;
  _id: string;
  createdAt: Date;
  recentMessage: {
    latest: {
      message: string;
    };
  };
}
