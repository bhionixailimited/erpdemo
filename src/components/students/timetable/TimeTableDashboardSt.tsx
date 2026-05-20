import { Avatar } from "@mui/material";
import { AttendanceIcon, ClassIcon, StudentsIcon } from "assets/static-icon";
import { AssignmentCard } from "components/teachers";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type TimetableStatCardType = {
  data: {
    attendedClass: number;
    totalTodaysClass: number;
    upcomingClass: number;
  };
};

const TimeTableDashboardSt = () => {
  const { data, isValidating } = useSWRFetch<TimetableStatCardType>(
    `dashboard/student/timetable-stat-card`
  );

  const cardData = useMemo(() => {
    return [
      {
        title: "Today's Classes",
        content: data?.data?.totalTodaysClass,
        iconClassName: "!bg-theme px-2 py-2 ",
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          "w-full bg-white !rounded-xl  transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={ClassIcon.src}
            alt="Classes"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
            className="!h-16 !w-16"
          />
        ),
        pathName: "/panel/student/timetable",
      },
      {
        title: "Upcoming Classes",
        content: data?.data?.upcomingClass,
        iconClassName: "!bg-theme px-2 py-2 ",
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          "w-full bg-white !rounded-xl  transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={StudentsIcon.src}
            alt="Batches"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
            className="!h-16 !w-16"
          />
        ),
        pathName: "/panel/student/timetable",
      },
      {
        title: "Class Attended",
        content: data?.data?.attendedClass,
        iconClassName: "!bg-theme px-2 py-2 ",
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          "w-full bg-white !rounded-xl  transition-all duration-500 ease-in-out hover:scale-95",
        icon: (
          <Avatar
            src={AttendanceIcon.src}
            alt="Batches"
            sx={{
              objectFit: "contain",
              borderRadius: "1px !important",
            }}
            className="!h-16 !w-16"
          />
        ),
        pathName: "/panel/student/timetable",
      },
    ];
  }, [data?.data]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center">
      {cardData?.map((item, index) => (
        <AssignmentCard
          key={index}
          loading={isValidating}
          title={item?.title}
          content={item?.content?.toString()}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={item?.className}
          iconClassName="bg-theme rounded-full"
          icon={item?.icon}
          clickableRoute="/panel/student/timetable"
        />
      ))}
    </div>
  );
};

export default TimeTableDashboardSt;
