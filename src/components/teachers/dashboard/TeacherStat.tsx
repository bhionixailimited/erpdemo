import { Avatar } from "@mui/material";
import {
  AssignmentIcon,
  AttendanceIcon,
  ClassIcon,
  ExamIcon,
  OnlineClassIcon,
  StudentsIcon,
} from "assets/static-icon";
import { InfoCards } from "components/admin";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type CardData = {
  data: {
    totalClass: number;
    totalExam: number;
    totalOnlineClass: number;
    totalAssignment: number;
    totalBatch: number;
    attendanceData: {
      teacherAttended: number;
      totalAttendance: number;
    };
  };
};

const TeacherStat = () => {
  const { data, isValidating } = useSWRFetch<CardData>(
    "dashboard/teacher/dashboard-stat"
  );

  const cardStat = useMemo(
    () => [
      {
        title: "Total Classes",
        iconClassName: "bg-[#f3f8f2] group-hover:bg-theme",
        content: data?.data?.totalClass,
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
        clickableRoute: "/panel/teacher/timetable/dashboard",
      },
      {
        title: "Total Batches",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalBatch,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={StudentsIcon.src}
            alt="Batches"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/teacher/batch/dashboard",
      },
      {
        title: "Total Exams",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalExam,
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
        clickableRoute: "/panel/teacher/exam/dashboard",
      },
      {
        title: "Total Assignments",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalAssignment,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={AssignmentIcon.src}
            alt="Assignments"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/teacher/assignment/dashboard",
      },
      {
        title: "My Attendance ",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: `${data?.data?.attendanceData?.teacherAttended}/${data?.data?.attendanceData?.totalAttendance}`,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={AttendanceIcon.src}
            alt="Attendance"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/teacher/attendance",
      },
      {
        title: "Online Classes",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalOnlineClass,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black font-bold",
        className:
          "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={OnlineClassIcon.src}
            alt="Online Class"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
          />
        ),
        clickableRoute: "/panel/teacher/lms/dashboard",
      },
    ],
    [data]
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 w-full  gap-6 lg:grid-cols-3  ">
      {cardStat?.map((item, index) => (
        <div className="w-full" key={index}>
          <InfoCards
            loading={isValidating}
            title={item?.title}
            iconClassName={item?.iconClassName}
            content={String(item?.content)}
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

export default TeacherStat;
