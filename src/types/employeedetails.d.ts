export interface EmployeeDetailsType {
  user: ObjectId;
  department: ObjectId;
  employmentCode: string;
  designation: ObjectId;
  yearOfExperience: Date;
  createdAt: Date;
  dateOfJoining: Date;
  dateOfResignation: Date;
}
