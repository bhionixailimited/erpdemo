import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type BatchWiseLMSType = {
  data: {
    course: string;
    totalClass: number;
  }[];
};

export default function BatchWiseLms({}: {}) {
  const { data, isValidating } = useSWRFetch<BatchWiseLMSType>(
    "dashboard/teacher/lms-batch-wise-class"
  );

  return (
    <div className=" col-span-12 p-4 rounded-xl border mt-2 items-center bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4">
      <h3 className="font-semibold w-full text-left tracking-wide text-black  text-lg">
        Batch Wise Class
      </h3>
      {!isValidating && data?.data?.length ? (
        <ReactApexChart
          type="pie"
          height={550}
          width={355}
          series={data?.data?.map((item) => item?.totalClass) || []}
          options={{
            chart: {
              width: 380,
              type: "pie",
            },
            legend: {
              position: "bottom",
            },
            colors: ["#ff4560", "#c634eb", "#C43C5C", "#6fadde", "#5B50A1"],
            labels: data?.data?.map((item) => item?.course) || [],
          }}
        />
      ) : (
        <Empty title="No data available" />
      )}
    </div>
  );
}
