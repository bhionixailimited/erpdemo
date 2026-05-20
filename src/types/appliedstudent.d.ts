export interface PlacementApplicationType {
  placement: ObjectId;
  user: ObjectId;
  resumeFile: string;
  resumePath: string;
  description: string;
  createdAt: string;
  _id: string;
  isSelected: boolean;
}
