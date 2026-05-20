import { Avatar } from "@mui/material";
import { CompleteIcon, StudentsIcon } from "assets/static-icon";
import { InfoCard2 } from "components/core";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type BatchDashboardData = {
  data: {
    totalAssign: number;
    totalCompleted: number;
  };
};

const DashboardStat = () => {
  const { data, isValidating } = useSWRFetch<BatchDashboardData>(
    "dashboard/teacher/batch-card"
  );

  const statData = useMemo(() => {
    return [
      {
        key: "1",
        title: "Batch Assigned",
        content: data?.data?.totalAssign,
        icon: <Avatar src={StudentsIcon.src} />,
      },
      {
        key: "2",
        title: "Batch Completed",
        content: data?.data?.totalCompleted,
        icon: <Avatar src={CompleteIcon.src} />,
      },
    ];
  }, [data?.data]);

  return (
    <div className="flex flex-col lg:flex-row xl:flex-col w-full items-center gap-4">
      {statData?.map((item) => (
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
