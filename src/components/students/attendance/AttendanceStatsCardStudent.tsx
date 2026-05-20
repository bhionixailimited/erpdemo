import { Avatar } from "@mui/material";
import {
  AttendanceIcon,
  CalenderIcon,
  CollegeHoliday,
} from "assets/static-icon";
import { AdmissionDashboardCard } from "components/admin";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

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

const AttendanceStatsCardStudent = () => {
  const { data, isValidating } = useSWRFetch<AttendanceStatCardType>(
    `dashboard/student/attendance-stat-card`
  );

  const statCard = useMemo(() => {
    return [
      {
        title: "Attendance",
        iconClassName: "bg-theme px-2 py-2 ",
        content: data?.data?.totalAttendance ?? 0,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white !rounded-xl  transition-all duration-500 ease-in-out hover:scale-95",
        icon: <Avatar variant="rounded" src={AttendanceIcon.src} />,
      },
      {
        title: "Leave Taken",
        iconClassName: "bg-theme px-2 py-2 ",
        content: data?.data?.totalLeaveTaken ?? 0,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white !rounded-xl transition-all duration-500 ease-in-out hover:scale-95",
        icon: <Avatar variant="rounded" src={CalenderIcon.src} />,
      },
      {
        title: "College Holidays",
        iconClassName: "bg-theme px-2 py-2 ",
        content: data?.data?.totalHolidays ?? 0,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white !rounded-xl  transition-all duration-500 ease-in-out hover:scale-95",
        icon: <Avatar variant="rounded" src={CollegeHoliday.src} />,
      },
    ];
  }, [data?.data]);

  return (
    <div className="w-full grid grid-cols-12  gap-4 ">
      {statCard?.map((item, index) => (
        <AdmissionDashboardCard
          loading={isValidating}
          key={index}
          title={item?.title}
          iconClassName={item?.iconClassName}
          content={item?.content?.toString()}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={` col-span-12 md:col-span-6 lg:col-span-4 ${item.className}`}
          icon={item?.icon}
          clickableRoute="/panel/student/attendance"
        />
      ))}
    </div>
  );
};

export default AttendanceStatsCardStudent;
