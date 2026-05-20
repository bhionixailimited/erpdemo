import { StackedBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type YearlyAssignmentDataType = {
  data: {
    _id: string;
    assignmentNotSubmitted: number;
    completeAssignment: number;
    subject: string;
    totalAssignment: number;
    upcomingAssignment: number;
  }[];
};

export default function SubjectWiseAssignment({}: {}) {
  const { data } = useSWRFetch<YearlyAssignmentDataType>(
    `dashboard/student/assignment-overview`
  );

  return (
    <StackedBarGraph
      series={[
        {
          name: "Completed",
          data: data?.data?.map((item) => item?.completeAssignment || 0) || [],
        },
        {
          name: "Upcoming",
          data: data?.data?.map((item) => item?.upcomingAssignment || 0) || [],
        },
        {
          name: "Not Submitted",
          data:
            data?.data?.map((item) => item?.assignmentNotSubmitted || 0) || [],
        },
      ]}
      categories={data?.data?.map((item) => item?.subject ?? "Other") || []}
      labels={["Completed", "Ongoing", "Canceled"]}
      colors={["#5B50A1", "#C43C5C", "#E97451", "#cd201f", "#FFC300"]}
      title="Yearly Assignment Overview "
    />
  );
}
