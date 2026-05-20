import { MultiBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type PreviousExamResultType = {
  data: {
    title: string;
    _id: string;
    results: {
      _id: string;
      title: string;
      markObtain: number;
    }[];
  }[];
};

const ExamResultStudent = () => {
  const { data } = useSWRFetch<PreviousExamResultType>(
    `dashboard/student/previous-exam-result`
  );

  return (
    <div className="w-full p-4">
      <MultiBarGraph
        series={
          Array.from(
            new Set(
              data?.data?.flatMap((item, index) =>
                item?.results?.map((inner) => inner?.title)
              )
            )
          )?.map((item) => {
            return {
              name: item,
              data: data?.data
                ?.map((item) => {
                  return item?.results?.map((inner) => {
                    return {
                      title: inner?.title,
                      markObtain: inner?.markObtain,
                    };
                  });
                })
                ?.map((inner) =>
                  inner?.reduce((acc, innerItem) => {
                    if (innerItem?.title === item) {
                      return Number(acc + innerItem?.markObtain) || 0;
                    } else {
                      return acc;
                    }
                  }, 0)
                ),
            };
          }) || []
        }
        categories={data?.data?.map((item) => item?.title || "N/A")}
        colors={["#5B50A1", "#C43C5C", "#cd201f", "#BD33B5"]}
        title="Previous Examinations Result"
      />
    </div>
  );
};

export default ExamResultStudent;
