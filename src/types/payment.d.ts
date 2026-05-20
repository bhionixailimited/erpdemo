import FeeType from "./fee";
import UserType from "./user";

export interface PaymentType {
  _id: string;
  paymentId: string;
  orderId: string;
  paymentSignature: string;
  paymentMethod: "ONLINE" | "CASH";
  paymentType: "SALARY" | "BONUS" | "OTHER";
  amount: number;
  fee: FeeType;
  paymentStatus: "PENDING" | "CANCEL" | "SUCCESS";
  metaData: any;
  user: UserType;
  refunded: boolean;
  isRefundable: boolean;
  createdAt: string;
}
