import BatchType from "./batch";
import UserType from "./user";

export interface StudentPaymentType {
  user: UserType;
  fees: any;
  feeType: "ONETIME" | "RECURRING";
  startDate: Date;
  endDate: Date;
  amount: number;
  isPaid: boolean;
  batch: BatchType;
  _id: string;
  createdAt: string;
}
