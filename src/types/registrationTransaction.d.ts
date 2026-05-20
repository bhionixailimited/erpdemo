import { Document, ObjectId } from "mongoose";

export interface IRegistrationPayment extends Document {
  paymentType: "ONLINE" | "CASH";
  amount: number;
  programme: ObjectId;
  paymentStatus: "PENDING" | "CANCEL" | "SUCCESSFUL" | "REFUND" | "FAILED";
  metaData: any;
  refunded: boolean;
  isRefundable: boolean;
  coupon: ObjectId;
  couponDetails: any;
  programmeDetails: any[];
}
