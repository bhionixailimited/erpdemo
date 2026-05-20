import { Avatar } from "@mui/material";
import {
  AssignmentCompleteIcon,
  AssignmentPendingIcon,
  TotalAssignmentIcon,
} from "assets/static-icon";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";
import AssignmentCard from "./AssignmentCard";

type AssignmentStatCard = {
  data: {
    _id: any;
    totalAssignment: number;
    pendingAssignment: number;
    completeAssignment: number;
  };
};

const AssignmentStat = () => {
  const { data, isValidating } = useSWRFetch<AssignmentStatCard>(
    `dashboard/teacher/assignment-stat`
  );

  const starCardData = useMemo(
    () => [
      {
        key: "1",
        title: "Assignment Pending",
        content: data?.data?.pendingAssignment,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl   transition-all duration-500 ease-in-out hover:scale-95  ",
        icon: (
          <Avatar
            src={AssignmentPendingIcon.src}
            sx={{
              borderRadius: "5px",
              height: "3.5rem",
              width: "3.5rem",
              objectFit: "contain",
            }}
          />
        ),
      },
      {
        key: "2",
        title: "Assignment Completed",
        content: data?.data?.completeAssignment,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl  transition-all duration-500 ease-in-out hover:scale-95  ",
        icon: (
          <Avatar
            src={AssignmentCompleteIcon.src}
            sx={{
              borderRadius: "5px",
              height: "3.5rem",
              width: "3.5rem",
              objectFit: "contain",
            }}
          />
        ),
      },
      {
        key: "3",
        title: "Total Assignment",
        content: data?.data?.totalAssignment,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl   transition-all duration-500 ease-in-out hover:scale-95  ",
        icon: (
          <Avatar
            src={TotalAssignmentIcon.src}
            sx={{
              borderRadius: "5px",
              height: "3.5rem",
              width: "3.5rem",
              objectFit: "contain",
            }}
          />
        ),
      },
    ],
    [data?.data]
  );

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4  ">
      {starCardData?.map((item, index) => (
        <AssignmentCard
          key={index}
          loading={isValidating}
          title={item?.title}
          content={String(item?.content)}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={item?.className}
          iconClassName="bg-theme rounded-full"
          icon={item?.icon}
          clickableRoute="/panel/teacher/assignment"
        />
      ))}
    </div>
  );
};

export default AssignmentStat;
