import { StackedBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type WeeklyClassOverviewStat = {
  data: {
    _id: string;
    classAttended: number;
    classCancelled: number;
    subject: string;
    totalClass: number;
  }[];
};

export default function ClassOverView({}: {}) {
  const { data } = useSWRFetch<WeeklyClassOverviewStat>(
    `dashboard/student/timetable-weekly-stat`
  );
  return (
    <StackedBarGraph
      series={[
        {
          name: "ABSENT",
          data:
            data?.data?.map(
              (item) => Number(item?.totalClass - item?.classAttended) || 0
            ) || [],
        },
        {
          name: "PRESENT",
          data: data?.data?.map((item) => item?.classAttended || 0) || [],
        },
      ]}
      categories={data?.data?.map((item) => item?.subject || "Other") || []}
      // labels={["Completed", "Ongoing", "Canceled"]}
      colors={["#5B50A1", "#C43C5C", "#E97451"]}
      title="Weekly Class Overview "
    />
  );
}
