import { Avatar } from "@mui/material";
import {
  ExamCreateIcon,
  ExamOnprogressIcon,
  ExamUpcomingIcon,
} from "assets/static-icon";
import { AssignmentCard } from "components/teachers";
import { useSWRFetch } from "hooks";
import { useMemo } from "react";

type ExamStatCardType = {
  data: {
    completedExam: number;
    ongoingExam: number;
    upcomingExam: number;
    totalExam: number;
  };
};

const ExamStatStudent = () => {
  const { data, isValidating } = useSWRFetch<ExamStatCardType>(
    `dashboard/student/exam-stat-card`
  );

  const statCardData = useMemo(() => {
    return [
      {
        key: "1",
        title: "TotalExams",
        content: data?.data?.totalExam,
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
        key: "2",
        title: "Ongoing Exams",
        content: data?.data?.ongoingExam,
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
      {
        key: "3",
        title: "Upcoming Exams",
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
    ];
  }, [data?.data]);

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center p-4  ">
      {statCardData?.map((item, index) => (
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
          clickableRoute="/panel/student/exam"
        />
      ))}
    </div>
  );
};

export default ExamStatStudent;
