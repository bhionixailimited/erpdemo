import { Avatar } from "@mui/material";
import { AttendanceIcon, CalenderIcon, ClockIcon } from "assets/static-icon";
import { AdmissionDashboardCard } from "components/admin";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type AttendanceDataType = {
  data: {
    todaysDate: string;
    totalAbsent: number;
    totalAttendance: number;
    totalLeave: number;
    totalPresent: number;
  };
};

const StatCard = () => {
  const { data, isValidating } = useSWRFetch<AttendanceDataType>(
    "dashboard/teacher/attendance-stat"
  );

  const dashboardStat = useMemo(() => {
    return [
      {
        title: "Reporting Time",
        iconClassName: "bg-theme px-2 py-2 ",
        content: dayjs(data?.data?.todaysDate).isToday()
          ? dayjs(data?.data?.todaysDate).format("hh:mm A")
          : "No Reports",
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-lg  transition-all duration-500 ease-in-out hover:scale-95",
        icon: <Avatar variant="rounded" src={ClockIcon.src} />,
      },
      {
        title: "Attendance",
        iconClassName: "bg-theme px-2 py-2 ",
        content: `${data?.data?.totalPresent ?? 0}/${
          data?.data?.totalAttendance
        } days`,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-lg  transition-all duration-500 ease-in-out hover:scale-95",
        icon: <Avatar variant="rounded" src={AttendanceIcon.src} />,
      },
      {
        title: "Leave Holidays",
        iconClassName: "bg-theme px-2 py-2 ",
        content: data?.data?.totalLeave,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-lg  transition-all duration-500 ease-in-out hover:scale-95",
        icon: <Avatar variant="rounded" src={CalenderIcon.src} />,
      },
    ];
  }, [data?.data]);

  return (
    <div className="w-full grid grid-cols-12  gap-4 ">
      {dashboardStat?.map((item, index) => (
        <AdmissionDashboardCard
          key={index}
          loading={isValidating}
          title={item?.title}
          iconClassName={item?.iconClassName}
          content={String(item?.content)}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={
            item?.className +
            (index === 2
              ? " col-span-12 lg:col-span-4 "
              : " col-span-12 md:col-span-6 lg:col-span-4 ")
          }
          icon={item?.icon}
        />
      ))}
    </div>
  );
};

export default StatCard;
