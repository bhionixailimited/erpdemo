import { DonutGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type ExamDataType = {
  data: {
    _id: string;
    totalExamCount: number;
  }[];
};

const ExamType = () => {
  const { data } = useSWRFetch<ExamDataType>(`dashboard/teacher/exam-overview`);

  return (
    <div className="w-full">
      <DonutGraph
        series={data?.data?.map((item) => item?.totalExamCount || 0) || []}
        labels={data?.data?.map((item) => item?._id || "Other") || []}
        title="Exam Overview"
        colors={["#5B50A1", "#C43C5C"]}
      />
    </div>
  );
};

export default ExamType;
