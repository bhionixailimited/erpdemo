import { StackedBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type MonthlyClassType = {
  data: {
    _id: string;
    totalClass: number;
    courseWise: {
      classCount: number;
      course: string;
    }[];
  }[];
};

export default function TimetableBarGraph({}: {}) {
  const { data } = useSWRFetch<MonthlyClassType>(
    "dashboard/teacher/weekly-classes"
  );

  return (
    <StackedBarGraph
      series={Array.from(
        new Set(
          data?.data?.flatMap((item, index) =>
            item?.courseWise?.map((inner) => inner?.course)
          )
        )
      )?.map((item) => {
        return {
          name: item,
          data: data?.data
            ?.map((item) => {
              return item?.courseWise?.map((inner) => {
                return {
                  year: item?._id,
                  course: inner?.course,
                  classCount: inner?.classCount,
                };
              });
            })
            ?.map((inner) =>
              inner?.reduce((acc, innerItem) => {
                if (innerItem?.course === item) {
                  return acc + innerItem?.classCount;
                } else {
                  return acc;
                }
              }, 0)
            ),
        };
      })}
      categories={data?.data?.map((item) => item?._id) || []}
      labels={
        Array.from(
          new Set(
            data?.data?.flatMap((item, index) =>
              item?.courseWise?.map((inner) => inner?.course)
            )
          )
        ) || []
      }
      colors={["#5B50A1", "#C43C5C", "#E97451"]}
      title="Weekly Overview "
    />
  );
}
