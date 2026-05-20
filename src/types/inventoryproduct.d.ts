import { InstituteType } from "./institute";

export interface InventoryProductType {
  imagePath: string;
  imageUrl: string;
  title: string;
  quantity: number;
  price: number;
  category: ObjectId;
  description: string;
  stockUsed: number;
  createdAt: string;
  _id: string;
  cost: string;
  brand: string;
  supplier: string;
  expiryDate: string;
  institute: InstituteType;
}
