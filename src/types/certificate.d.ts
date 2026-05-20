export interface StudentCertificateTypes {
  student: ObjectId;
  type: "IMAGE" | "PDF";
  filePath: string;
  fileUrl: string;
  issuedBy: ObjectId;
  title: string;
  createdAt: Date;
  _id: string;
}
