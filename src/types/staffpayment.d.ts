export interface StaffPaymentType {
  paymentId: string;
  paymentType: "SALARY" | "BONUS" | "OTHER";
  amount: number;
  paymentStatus: "PENDING" | "CANCEL" | "SUCCESSFUL";
  metaData: any;
  user: ObjectId;
  paymentMonth: Date;
  paymentMethod: "CASH" | "ONLINE";
  _id: string;
  createdAt: Date;
}
