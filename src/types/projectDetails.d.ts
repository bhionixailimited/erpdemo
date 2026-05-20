export type ProjectDetails = {
  _id: string;
  title: string;
  submittedTo: string;
  submittedUnder: string;
  submittedBy: string;
  date: Date;
  totalCostOfProject: number;
  description: string;
  status: string;
  sanctionDate?: Date;
  sanctionAmount?: number;
  documentPath?: string;
  documentUrl?: string;
}
export type Data = {
 data: ProjectDetails;
}
