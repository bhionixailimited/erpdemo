export type Certificate = {
  filePath: string;
  fileUrl: string;
  title: string;
  _id: string;
};
export interface AcademicDetailsType {
  user: ObjectId;
  applicationNumber: string;
  enrollmentCode: string;
  batch: ObjectId;
  academicYear: number;
  section: string;
  rollNumber: string;
  registrationNumber: string;
  isHostler: boolean;
  isUsingTransport: boolean;
  isAlumni: boolean;
  libraryCardNumber: string;
  createdAt: string;
  certificates: Certificate[];

  hscBoard: string;
  hscInstitute: string;
  hscFullMarks: number;
  hscMarkSecured: number;
  hscMarkPercentage: number;
  hscPassingYear: string;

  twelfthBoard: string;
  twelfthInstitute: string;
  twelfthFullMark: number;
  twelfthMarkSecured: number;
  twelfthMarkPercentage: number;
  twelfthPassingYear: number;

  diplomaBoard: string;
  diplomaInstitute: string;
  diplomaFullMark: number;
  diplomaMarkSecured: number;
  diplomaMarkPercentage: number;
  diplomaPassingYear: string;
  graduationFullMark: number;
  graduationMarkSecured: number;
  graduationMarkPercentage: number;
  graduationPassingYear: string;
  receiptNumber: string;
  studyMedium: string;
  promoteStatus: string;
  promotedClass: string;
}
