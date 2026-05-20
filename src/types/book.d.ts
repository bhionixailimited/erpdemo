import BatchType from "./batch";

export interface BookType {
  imagePath: string;
  imageUrl: string;
  title: string;
  author: ObjectId;
  accessionNumber: string;
  price: number;
  summery: string;
  publication: ObjectId;
  dateOfPublication: Date;
  bookCategory: ObjectId;
  quantity: number;
  totalIssue: number;
  _id: string;
  tags: string;
  batch: BatchType;
}
