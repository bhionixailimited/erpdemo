export interface InstituteType {
  _id: string;
  admin: Admin;
  instituteName: string;
  description: string;
  address: string;
  phoneNumber: string;
  createdBy: CreatedByType;
  isDeleted: boolean;
  createdAt: string;
  logoUrl: string;
  deletedBy: CreatedByType;
  totalProductCount: number;
  totalRevenue: number;
  totalFinanceCredit: number;
  totalFinanceDebit: number;
  email: string;
}

export interface CreatedByType {
  _id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  caste: string;
  gender: string;
}

export interface AdminType {
  _id: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  gender: string;
  photoUrl: string;
  caste: string;
  countryCode: string;
  dateOfBirth: string;
}
