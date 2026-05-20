export interface TransactionType {
  paymentId: string;
  paymentType: "ONLINE" | "CASH";
  amount: number;
  fee: ObjectId;
  paymentStatus: "PENDING" | "CANCEL" | "SUCCESSFUL";
  metaData: any;
  user: ObjectId;
}
