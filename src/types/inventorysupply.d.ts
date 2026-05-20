import { InventoryProductType } from "./inventoryproduct";

export interface InventorySupplyType {
  product: InventoryProductType;
  consumer: string;
  consumerRole: string;
  quantity: number;
  amount?: number;
  department?: any;
  purchasedDepartment: ObjectId;
  deliveredDate: Date;
  initiatedBy: ObjectId;
  fulfilledBy: ObjectId;
  orderStatus:
    | "ORDER_REQUEST"
    | "INITIATED"
    | "PROCESSING"
    | "DELIVERED"
    | "CANCELLED";
  _id: string;
  createdAt: string;
}
