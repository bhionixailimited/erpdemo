import { MultiBarGraph } from "components/graph";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";

type AssignmentData = {
  data: {
    _id: string;
    title: string;
    dateOfAssignment: string;
    users: {
      _id: null;
      totalStudentSubmitted: number;
      totalStudentNotSubmitted: number;
      totalStudent: number;
      totalGirlSubmitted: number;
      totalBoysSubmitted: number;
      totalOthersSubmitted: number;
    };
  }[];
};

const StudentAssignmentData = () => {
  const { data } = useSWRFetch<AssignmentData>(
    `dashboard/teacher/assignment-submission-stat-prev?perPage=8&pageNo=1`
  );

  return (
    <div className="w-full h-full bg-white shadow-xl rounded-xl p-4 border ">
      <MultiBarGraph
        series={[
          {
            name: "Total",
            data:
              data?.data?.map((item) =>
                Number(item?.users?.totalStudentSubmitted || 0)
              ) || [],
          },
          {
            name: "Boys",
            data:
              data?.data?.map((item) =>
                Number(item?.users?.totalBoysSubmitted || 0)
              ) || [],
          },
          {
            name: "Girls",
            data:
              data?.data?.map((item) =>
                Number(item?.users?.totalGirlSubmitted || 0)
              ) || [],
          },
          {
            name: "Others",
            data:
              data?.data?.map((item) =>
                Number(item?.users?.totalOthersSubmitted || 0)
              ) || [],
          },
        ]}
        categories={
          data?.data?.map((item) =>
            dayjs(item?.dateOfAssignment).format("MMM D")
          ) || []
        }
        colors={["#5B50A1", "#C43C5C", "#BD33B5", "#25d366"]}
        title="Assignment Overview"
      />
    </div>
  );
};

export default StudentAssignmentData;
