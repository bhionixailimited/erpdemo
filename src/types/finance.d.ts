export interface FinanceType {
  title: string;
  description: string;
  financeType: "DEBIT" | "CREDIT";
  createdBy: ObjectId;
  amount: number;
  _id: string;
  createdAt: string;
}
