import { MultiBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type ExamResultData = {
  data: {
    boys: number;
    girls: number;
    other: number;
    title: string;
    _id: string;
  }[];
};

const ExamCountGraph = () => {
  const { data } = useSWRFetch<ExamResultData>(
    `dashboard/teacher/previous-exam-result?perPage=10&pageNo=1`
  );

  return (
    <div className="w-full p-4">
      <MultiBarGraph
        series={[
          {
            name: "Boys Pass",
            data: data?.data?.map((item) => item?.boys) || [],
          },
          {
            name: "Girls Pass",
            data: data?.data?.map((item) => item?.girls) || [],
          },
          {
            name: "Others Pass",
            data: data?.data?.map((item) => item?.other) || [],
          },
        ]}
        categories={data?.data?.map((item) => item?.title || "Others") || []}
        colors={["#5B50A1", "#C43C5C", "#25d366"]}
        title="Previous Examinations Result"
      />
    </div>
  );
};

export default ExamCountGraph;
