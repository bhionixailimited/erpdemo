import { DonutGraph } from "components/graph";
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

export default function DonutAssignmentDashboard() {
  const { data } = useSWRFetch<AssignmentData>(
    `dashboard/teacher/assignment-submission-stat-prev?perPage=1&pageNo=1`
  );

  return (
    <>
      <div className="w-full shadow-xl rounded-xl h-full border">
        <DonutGraph
          series={[
            Number(data?.data[0]?.users?.totalStudentSubmitted || 0),
            Number(data?.data[0]?.users?.totalStudentNotSubmitted || 0),
          ]}
          labels={["Submitted", "Not Submitted"]}
          title={data?.data[0]?.title || "No new Assignment"}
          colors={["#5B50A1", "#C43C5C"]}
        />
      </div>
    </>
  );
}
