import { Avatar } from "@mui/material";
import {
  ExamCreateIcon,
  ExamOnprogressIcon,
  ExamUpcomingIcon,
} from "assets/static-icon";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";
import AssignmentCard from "../assignment/AssignmentCard";

type ExamStatData = {
  data: {
    totalExam: number;
    upcomingExam: number;
    completeExam: number;
    ongoing: number;
  };
};

const ExamStat = () => {
  const { data, isValidating } = useSWRFetch<ExamStatData>(
    `dashboard/teacher/exam-card-stat`
  );

  const cardStat = useMemo(() => {
    return [
      {
        key: "1",
        title: "Exam Complete",
        content: data?.data?.completeExam,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl   transition-all duration-500 ease-in-out hover:scale-95  ",
        icon: (
          <Avatar
            src={ExamCreateIcon.src}
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
        title: "Exam Upcoming",
        content: data?.data?.upcomingExam,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl   transition-all duration-500 ease-in-out hover:scale-95  ",
        icon: (
          <Avatar
            src={ExamUpcomingIcon.src}
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
        title: "Exam Ongoing",
        content: data?.data?.ongoing,
        titleClassName: "text-black font-bold text-base pt-2",
        contentClassName: "text-theme  text-3xl font-bold",
        className:
          " w-full bg-white rounded-xl  transition-all duration-500 ease-in-out hover:scale-95  ",
        icon: (
          <Avatar
            src={ExamOnprogressIcon.src}
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
    <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4  ">
      {cardStat?.map((item, index) => (
        <AssignmentCard
          key={index}
          title={item?.title}
          content={item?.content?.toString()}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={item?.className}
          loading={isValidating}
          iconClassName="bg-theme rounded-full"
          icon={item?.icon}
          clickableRoute="/panel/teacher/exam"
        />
      ))}
    </div>
  );
};

export default ExamStat;
