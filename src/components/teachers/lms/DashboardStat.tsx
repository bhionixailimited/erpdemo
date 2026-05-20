import { Avatar } from "@mui/material";
import {
  ClassIcon,
  CompleteIcon,
  StudentsIcon,
  UpcomingIcon,
} from "assets/static-icon";
import { InfoCard2 } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type DashboardStatCard = {
  data: {
    totalBatch: number;
    totalStudent: number;
    totalTodaysClass: number;
    upcomingClass: any;
  };
};

const DashboardStat = () => {
  const { data, isValidating } = useSWRFetch<DashboardStatCard>(
    "dashboard/teacher/lms-card-stat"
  );

  const statCardData = useMemo(() => {
    return [
      {
        key: "1",
        title: "Todays Class",
        content: data?.data?.totalTodaysClass ?? 0,
        icon: (
          <Avatar
            src={ClassIcon.src}
            sx={{ borderRadius: "1px", objectFit: "contain" }}
          />
        ),
      },
      {
        key: "2",
        title: "Upcoming Class ",
        content: data?.data?.upcomingClass
          ? dayjs(data?.data?.upcomingClass).format("hh:mm A")
          : "--:--",
        icon: (
          <Avatar
            src={UpcomingIcon.src}
            sx={{ borderRadius: "1px", objectFit: "contain" }}
          />
        ),
      },
      {
        key: "3",
        title: "Students",
        content: data?.data?.totalStudent ?? 0,
        icon: (
          <Avatar
            src={StudentsIcon.src}
            sx={{ borderRadius: "1px", objectFit: "contain" }}
          />
        ),
      },
      {
        key: "4",
        title: "Batches",
        content: data?.data?.totalBatch ?? 0,
        icon: (
          <Avatar
            src={CompleteIcon.src}
            sx={{ borderRadius: "1px", objectFit: "contain" }}
          />
        ),
      },
    ];
  }, [data?.data]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-4 items-center">
      {statCardData?.map((item) => (
        <InfoCard2
          loading={isValidating}
          key={item?.key}
          className="hover:scale-95"
          icon={item?.icon}
          iconClassName="bg-theme rounded-xl p-4"
          content={String(item?.content)}
          title={item?.title}
          path="/panel/teacher/batch"
        />
      ))}
    </div>
  );
};

export default DashboardStat;
