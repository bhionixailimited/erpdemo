import DepartmentType from "./department";

interface Document {
  title: string;
  url: string;
  _id: string;
}

interface MouType{
  _id: string;
  title: string;
  description: string;
  signUnderWhom: string;
  signBy: string;
  includeDepartment: DepartmentType;
  dateOfSigning: string;
  dateOfExpire: string;
  doc: Document[];
  createdAt: string;
}
export default MouType