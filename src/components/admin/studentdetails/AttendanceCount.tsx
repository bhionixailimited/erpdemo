import { AttendanceCalender, AttendanceProfile } from "components/students";
import { useAuth, useSWRFetch } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClassType } from "types/class";
import StudentProfile from "./StudentProfile";

type AttendanceDataType = {
  data: {
    statistic: {
      totalAbsent: number;
      totalClass: number;
      totalLeave: number;
      totalPresent: number;
    };
    attendance: {
      _id: string;
      class: ClassType;
      createdAt: string;
      isAbsent: boolean;
      isOnLeave: boolean;
      isPresent: boolean;
      month: number;
      updatedAt: number;
      year: number;
    }[];
  };
};

const AttendanceCount = () => {
  const [date, setDate] = useState(new Date().getTime());

  const { studentID } = useRouter()?.query;

  const { data, isValidating } = useSWRFetch<AttendanceDataType>(
    studentID && `student/attendance/${studentID}?date=${date}`
  );

  return (
    <section className="w-full flex flex-col md:p-6 items-center justify-center">
      <div className="w-full flex items-center justify-center">
        <StudentProfile statData={data?.data?.statistic} />
      </div>
      <div className="flex flex-col w-full">
        <AttendanceCalender
          loading={isValidating}
          date={date}
          setDate={setDate}
          attendanceData={data?.data?.attendance}
        />
      </div>
    </section>
  );
};

export default AttendanceCount;
