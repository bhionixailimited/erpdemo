import { Avatar } from "@mui/material";
import { ClassIcon, StudentsIcon } from "assets/static-icon";
import { TimetableDashboardCard } from "components/core";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type DashboardStatType = {
  data: {
    onlineClass: number;
    totalClass: number;
  };
};

const DashboardStat = () => {
  const { data, isValidating } = useSWRFetch<DashboardStatType>(
    `dashboard/teacher/timetable-stat`
  );

  const cardStat = useMemo(
    () => [
      {
        title: "Online Classes",
        iconClassName: "bg-[#f3f8f2] group-hover:bg-theme",
        content: data?.data?.onlineClass,
        titleClassName: "text-slate-600 font-bold text-base",
        contentClassName: "text-black  text-xl font-bold",
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
            className="!h-20 !w-20"
          />
        ),
        pathName: "/panel/teacher/timetable",
      },
      {
        title: "Upcoming Classes",
        iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
        content: data?.data?.totalClass,
        titleClassName: "text-slate-600 font-bold text-base ",
        contentClassName: "text-black text-xl font-bold",
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
            className="!h-20 !w-20"
          />
        ),
        pathName: "/panel/teacher/timetable",
      },
    ],
    [data?.data]
  );

  return (
    <div className="flex flex-col gap-4 w-full">
      {cardStat?.map((item, index) => (
        <div className="w-full" key={index}>
          <TimetableDashboardCard
            title={item?.title}
            loading={isValidating}
            icon={item?.icon}
            content={String(item?.content)}
            contentClassName={item?.contentClassName}
            clickableRoute={item?.pathName}
            className={item?.className}
          />
        </div>
      ))}
    </div>
  );
};

export default DashboardStat;
