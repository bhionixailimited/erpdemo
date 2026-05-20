export interface PlacementNoticeType {
  title: string;
  qualification: string;
  session: ObjectId;
  companyName: string;
  companyDetails: string;
  jobDescription: string;
  jobBenefits: string;
  howToApply: string;
  companyRepresentative: string;
  lastDateToApply: string;
  createdBy: ObjectId;
  position: string;
  _id: string;
  createdAt: Date;
  companyId: {
    address: string;
    branch: string;
    description: string;
    industry: string;
    name: string;
    phoneNumber: string;
    _id: string;
  };
}
