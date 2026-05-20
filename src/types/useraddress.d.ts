export interface UserAddressType {
  user: ObjectId;
  dateOfJoining: Date;
  dateOfResignation: Date;
  state: string;
  district?: string;
  city: string;
  pinCode: string;
  address: string;
  aadharNumber: string;
  aadharImageUrl: string;
  aadharImageRef: string;

  panNumber: string;
  panImageUrl: string;
  panImageRef: string;

  fatherName: string;
  motherName: string;
  parentNumber: string;
  parentEmail: string;
  emergencyContactNumber: string;
  emergencyContactName: string;

  fatherNumber:string;
  motherNumber:string;
  localGuardianName:string;
  localGuardianPhoneNumber:string;
  localGuardianRelation: string;
  localGuardianAddress:string;
  alternateStudentNumber:string;
  currentAddress:string;
  currentCity:string;
  currentDistrict:string;
  currentState:string;
  currentPinCode:string
  
}
