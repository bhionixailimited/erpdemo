import BatchType from "./batch";
import UserType from "./user";

export interface BatchMaterialType {
  key: string;
  createdAt: string;
  _id: string;
  batch: BatchType;
  title: string;
  description: string;
  type: "PDF" | "WORD" | "LINK";
  link: string;
  filePath: string;
  fileUrl: string;
  uploadedBy: UserType;
}
