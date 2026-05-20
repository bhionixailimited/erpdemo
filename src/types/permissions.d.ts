interface PermissionsType {
  _id: string;
  department: string;
  user: string;
  manageAdmission: boolean;
  manageStudents: boolean;
  manageDepartment: boolean;
  manageStaff: boolean;
  manageAssignment: boolean;
  manageBatch: boolean;
  manageFees: boolean;
  manageFinance: boolean;
  manageLibrary: boolean;
  manageInventory: boolean;
  manageTransport: boolean;
  managePlacement: boolean;
  manageAlumni: boolean;
  manageExam: boolean;
  manageFeedback: boolean;
  manageGrievance: boolean;
  manageConfig: boolean;
  manageInstitute: boolean;
  manageDocument: boolean;
  manageNaac: boolean;
  manageEvent: boolean;
  manageMarketingResource: boolean;
}

export default PermissionsType;
