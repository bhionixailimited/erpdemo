import BatchType from "./batch";
import { InstituteType } from "./institute";

interface UserType {
  employmentDetails: any;
  _id: string;
  user: any;
  createdAt: string;
  displayName: string;
  email: string;
  phoneNumber: string;
  emailVerified: boolean;
  phoneVerified: boolean;
  countryCode: string;
  photoUrl: string;
  photoPath?: string;
  studentName?: string;
  designation?: string;
  progress?: number;
  city?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  caste: "GENERAL" | "OBC" | "SC" | "ST" | "OTHER";
  dateOfBirth: string;
  role: "SUPER_ADMIN" | "ADMIN" | "STAFF" | "TEACHER" | "STUDENT" | "PARENT";
  batch: any;
  fcmTokens: {
    web: string;
    android: string;
    ios: string;
  };
  isOnline: boolean;
  blockStatus: "BLOCKED" | "UNBLOCKED";
  lastLogin: Date | string;
  vId: string;
  instituteId: InstituteType;
  institute: InstituteType[];
  academicDetails: {
    applicationNumber: string;
    enrollmentCode: string;
    batch: BatchType;
    academicYear: number;
    section: string;
    rollNumber: string;
    registrationNumber: string;
    isHostler: boolean;
    isUsingTransport: boolean;
    isAlumni: boolean;
    libraryCardNumber: string;
    createdAt: string;
  };
  userParent?: Partial<UserType>;
}
export default UserType;
