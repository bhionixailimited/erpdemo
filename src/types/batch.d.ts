import BranchType from "./branch";
import CourseType from "./course";
import SessionType from "./session";

interface BatchType {
  iconUrl: string;
  iconPath: string;
  session: SessionType;
  course: CourseType;
  branch: BranchType;
  description: string;
  maximumStudent: number;
  headOfDepartment: string;
  isBatchCompleted: boolean;
  _id: string;
  key: any;
  batchSection: string[];
}
export default BatchType;
