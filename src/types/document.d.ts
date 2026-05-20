enum DocumentType {
  HR,
  HOD,
  MOU,
  OTHER,
}

export interface IDocument {
  _id: string;
  title: string;
  path: string;
  url: string;
  uploadedBy: string;
  type: string;
  deletedBy: string;
  keywords: string[];
  category: string;
  isSuperAdminDoc: boolean;
  instituteId: Boolean;
  isDeleted: boolean;
  type: DocumentType;
  createdAt: string;
}
