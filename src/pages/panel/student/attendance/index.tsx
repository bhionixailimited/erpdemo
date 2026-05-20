import { AttendanceCalender, AttendanceProfile } from "components/students";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useState } from "react";
import { ClassType } from "types/class";

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

const AttendancePage = () => {
  const [date, setDate] = useState(new Date().getTime());

  const { user } = useAuth();

  const { data, isValidating } = useSWRFetch<AttendanceDataType>(
    (user?.userParent?._id &&
      `student/attendance/${user?.userParent?._id}?date=${date}`) ||
      (user?._id && `student/attendance/${user?._id}?date=${date}`)
  );

  return (
    <PrivateLayout title="Attendance | Student">
      <section className="w-full flex flex-col p-6 items-center justify-center">
        <div className="w-full flex items-center justify-center">
          <AttendanceProfile statData={data?.data?.statistic} />
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
    </PrivateLayout>
  );
};

export default withProtectedStudent(AttendancePage);
