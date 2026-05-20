import { useCurrency } from "hooks";
import React from "react";
import AttendanceCount from "./AttendanceCount";
import CalenderAttendance from "./CalenderAttendance";

const Attendance = () => {
  return (
    <div>
      <div className="w-full md:p-4 p-3  border-[1px] border-gray-300 bg-gray-100 rounded-md">
        <div className="w-full">
          <AttendanceCount />
        </div>
        {/* <div className="flex flex-col w-full">
          <CalenderAttendance />
        </div> */}
      </div>
    </div>
  );
};

export default Attendance;
