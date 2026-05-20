export interface BookIssueType {
  user: ObjectId;
  book: ObjectId;
  returnDate: Date;
  returned: boolean;
  actualReturnDate: Date;
  finePaid: number;
  _id: string;
  createdAt: Date;
  pendingAmount: number;
}
