import { Empty } from "components/core";
import { StackedBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type LMSBarGraphType = {
  data: {
    _id: string;
    totalClass: number;
  }[];
};

export default function LmsBarGraph({}: {}) {
  const { data, isValidating } = useSWRFetch<LMSBarGraphType>(
    "dashboard/teacher/weekly-lms"
  );

  if (!isValidating && data?.data?.length) {
    return (
      <StackedBarGraph
        series={[
          {
            name: "Completed",
            data: data?.data?.map((item) => item?.totalClass) || [],
          },
        ]}
        categories={data?.data?.map((item) => item?._id) || []}
        colors={["#5B50A1", "#C43C5C", "#E97451"]}
        title="LMS Class Weekly"
      />
    );
  }

  return <Empty title="No data available" />;
}
