import { DonutGraph, RadialGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type BatchStatData = {
  data: {
    branch: string;
    course: string;
    totalClass: number;
    _id: string;
  }[];
};

type BatchWorkType = {
  data: {
    totalAssignments: number;
    totalClasses: number;
    totalExams: number;
  };
};

const BatchWiseGraph = () => {
  const { data: batchClass } = useSWRFetch<BatchStatData>(
    `dashboard/teacher/batch-wise-class?perPage=7&pageNo=1`
  );
  const { data: batchWork } = useSWRFetch<BatchWorkType>(
    `dashboard/teacher/batch-wise-work`
  );

  return (
    <div className="flex lg:flex-row flex-col items-center gap-6">
      <div className="w-full h-full bg-white rounded-xl shadow-xl p-4 border ">
        <RadialGraph
          series={
            batchClass?.data?.map(
              (item) =>
                Math.round(
                  Number(
                    (item?.totalClass /
                      Number(
                        batchClass?.data?.reduce(
                          (acc, item) => acc + item?.totalClass,
                          0
                        )
                      )) *
                      100
                  )
                ) || 0
            ) || []
          }
          colors={["#5B50A1", "#C43C5C", "#BD33B5"]}
          title="Batch Wise Classes"
          labels={batchClass?.data?.map((item) => item?.course) || []}
          average={String(
            batchClass?.data?.reduce(
              (acc, item) => acc + item?.totalClass,
              0
            ) ?? 0
          )}
          height={340}
        />
      </div>
      <div className="w-full h-full bg-white rounded-xl shadow-xl border ">
        <DonutGraph
          series={[
            batchWork?.data?.totalClasses ?? 0,
            batchWork?.data?.totalExams ?? 0,
            batchWork?.data?.totalAssignments ?? 0,
          ]}
          colors={["#5B50A1", "#C43C5C", "#BD33B5"]}
          title="Batch Work"
          labels={["Class", "Exam", "Assignment"]}
          height={340}
        />
      </div>
    </div>
  );
};

export default BatchWiseGraph;
