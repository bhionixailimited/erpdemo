

interface RESOURCE_PERSON_TYPE {
  data: Data
}
export default RESOURCE_PERSON_TYPE;

interface Data {
  nameOfResourcePerson: string;
  designation: string;
  nameOfOrganization?: string;
  subjectExport?: string;
  exportEmailId?: string;
  mobileNo?: string;
  profile?: string;
  photoUrl: string;
}
export default Data;
