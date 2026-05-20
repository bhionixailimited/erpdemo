import { Avatar } from "@mui/material";
import {
  AssignmentCompleteIcon,
  AssignmentPendingIcon,
  TotalAssignmentIcon,
} from "assets/static-icon";
import { AssignmentCard } from "components/teachers";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type AssignmentDataType = {
  data: {
    assignmentNotSubmitted: number;
    completeAssignment: number;
    totalAssignment: number;
    upcomingAssignment: number;
  };
};

const StudentAssignmentStat = () => {
  const { data, isValidating } = useSWRFetch<AssignmentDataType>(
    `dashboard/student/assignment-stat-card`
  );

  const statCard = useMemo(() => {
    return [
      {
        key: "1",
        title: "Total Assignments",
        content: data?.data?.totalAssignment || 0,
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
        title: "Completed Assignments",
        content: data?.data?.completeAssignment || 0,
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
        title: "Upcoming Assignments",
        content: data?.data?.upcomingAssignment || 0,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl  transition-all duration-500 ease-in-out hover:scale-95  ",
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
    ];
  }, [data?.data]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4  ">
      {statCard?.map((item, index) => (
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
          clickableRoute="/panel/student/assignment"
        />
      ))}
    </div>
  );
};

export default StudentAssignmentStat;
