import { StudentDistribution } from "components/admin/analytics";
import { MultiBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type AttendanceStatCardType = {
  data: {
    attendancePercentage: number;
    totalAttendance: number;
    totalClass: number;
    totalClassAbsent: number;
    totalHolidays: number;
    totalLeaveTaken: number;
  };
};
type MonthlyAttendanceType = {
  data: {
    _id: string;
    totalAbsent: number;
    totalAttended: number;
    totalLeave: number;
  }[];
};

const AttendanceGraphStudent = () => {
  const { data } = useSWRFetch<AttendanceStatCardType>(
    `dashboard/student/attendance-stat-card`
  );
  const { data: monthlyStudent } = useSWRFetch<MonthlyAttendanceType>(
    `dashboard/student/monthly-attendance-overview`
  );

  return (
    <div className="grid grid-cols-12 content-between gap-4  py-6 ">
      <div className=" col-span-12 gap-2 md:col-span-12 lg:col-span-4">
        <StudentDistribution
          className={
            "col-span-12 p-6  gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-4"
          }
          pieLabel={["Classes Joined", "Personal Leave", "Absent"]}
          pieSeries={[
            data?.data?.totalAttendance ?? 0,
            data?.data?.totalLeaveTaken ?? 0,
            data?.data?.totalClassAbsent ?? 0,
          ]}
          title={"Attendance Overview"}
        />
      </div>
      <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
        <MultiBarGraph
          title={"Monthly Attendance Report"}
          categories={monthlyStudent?.data?.map((item) => item?._id)}
          series={[
            {
              name: "Present",
              data: monthlyStudent?.data?.map((item) => item?.totalAttended),
            },
            {
              name: "Absent",
              data: monthlyStudent?.data?.map((item) => item?.totalAbsent),
            },
            {
              name: "Leave",
              data: monthlyStudent?.data?.map((item) => item?.totalLeave),
            },
          ]}
          colors={["#5B50A1", "#C43C5C", "#BD33B5"]}
          height={400}
        />
      </div>
    </div>
  );
};

export default AttendanceGraphStudent;
