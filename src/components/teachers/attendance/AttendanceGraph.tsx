import { StudentDistribution } from "components/admin/analytics";
import { MultiBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type AttendanceDataType = {
  data: {
    todaysDate: string;
    totalAbsent: number;
    totalAttendance: number;
    totalLeave: number;
    totalPresent: number;
  };
};

type MonthlyAttendanceDataType = {
  data: {
    _id: string;
    totalPresent: number;
    totalLeave: number;
    totalAttendance: number;
    totalAbsent: number;
  }[];
};

const AttendanceGraph = () => {
  const { data: attendanceOverview } = useSWRFetch<AttendanceDataType>(
    "dashboard/teacher/attendance-stat"
  );
  const { data: monthlyAttendance } = useSWRFetch<MonthlyAttendanceDataType>(
    "dashboard/teacher/attendance-overview-monthly"
  );

  return (
    <div className="grid grid-cols-12 content-between gap-4  py-6 ">
      <div className=" col-span-12 gap-2 md:col-span-12 lg:col-span-4">
        <StudentDistribution
          className={
            "col-span-12 p-6  gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-4"
          }
          pieLabel={["Classes Joined", "Official Leave", "Absent"]}
          pieSeries={[
            attendanceOverview?.data?.totalPresent ?? 0,
            attendanceOverview?.data?.totalLeave ?? 0,
            attendanceOverview?.data?.totalAbsent ?? 0,
          ]}
          title={"Attendance Overview"}
        />
      </div>
      <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
        <MultiBarGraph
          title={"Monthly Attendance Report"}
          categories={monthlyAttendance?.data?.map((item) => item?._id) || []}
          series={[
            {
              name: "Leave",
              data:
                monthlyAttendance?.data?.map((item) => item?.totalLeave) || [],
            },
            {
              name: "Absent",
              data:
                monthlyAttendance?.data?.map((item) => item?.totalAbsent) || [],
            },
            {
              name: "Attended",
              data:
                monthlyAttendance?.data?.map((item) => item?.totalPresent) ||
                [],
            },
          ]}
          colors={["#5B50A1", "#C43C5C"]}
          height={400}
        />
      </div>
    </div>
  );
};

export default AttendanceGraph;
