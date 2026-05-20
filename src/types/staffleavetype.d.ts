export interface StaffLeaveType {
  staff: string;
  leaveCode: "SICK_LEAVE" | "CASUAL_LEAVE" | "OTHER";
  leaveType: "HALF_DAY" | "FULL_DAY" | "MULTIPLE_DAY";
  leaveDate: Date;
  expectedJoiningDate: Date;
  additionalLeaveInfo: "FIRST_HALF" | "SECOND_HALF";
  reason: string;
  createdAt: string;
}
