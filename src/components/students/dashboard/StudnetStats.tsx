import { Avatar } from "@mui/material";
import {
  AssignmentIcon,
  AttendanceIcon,
  ClassIcon,
  ExamIcon,
} from "assets/static-icon";
import { InfoCards } from "components/admin";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type CardStatData = {
  data: {
    totalAssignments: number;
    totalAttendance: number;
    totalClasses: number;
    totalExams: number;
  };
};

const StudentStats = () => {
  const { data, isValidating } = useSWRFetch<CardStatData>(
    `dashboard/student/dashboard-stat`
  );

  const cardStat = useMemo(() => {
    return [
      {
        title: "Classes",
        iconClassName: "bg-[#f3f8f2] group-hover:bg-theme",
        content: data?.data?.totalClasses,
        titleClassName: "text-slate-600 font-bold text-base",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={ClassIcon.src}
            alt="Classes"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/student/timetable/dashboard",
      },
      {
        title: "Assignments",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalAssignments,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={AssignmentIcon.src}
            alt="Batches"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/student/assignment/dashboard",
      },
      {
        title: "Exams",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalExams,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={ExamIcon.src}
            alt="Exams"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/student/exam/dashboard",
      },
      {
        title: "Attendance",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalAttendance,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={AttendanceIcon.src}
            alt="Assignments"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/student/attendance/dashboard",
      },
    ];
  }, [data?.data]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-6 lg:grid-cols-4  ">
      {cardStat?.map((item, index) => (
        <div className="w-full" key={index}>
          <InfoCards
            loading={isValidating}
            title={item?.title}
            iconClassName={item?.iconClassName}
            content={item?.content?.toString()}
            titleClassName={item?.titleClassName}
            contentClassName={item?.contentClassName}
            className={item?.className}
            icon={item?.icon}
            clickableRoute={item?.clickableRoute}
          />
        </div>
      ))}
    </div>
  );
};

export default StudentStats;
