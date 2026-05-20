import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type ClassOverviewType = {
  data: {
    _id: string;
    totalClass: number;
  }[];
};

export default function TimetableDashboardGraph({}: {}) {
  const { data } = useSWRFetch<ClassOverviewType>(
    `dashboard/teacher/class-overview`
  );

  return (
    <div className=" col-span-12 p-4 rounded-xl border mt-2 items-center bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4">
      <h3 className="font-semibold w-full text-left tracking-wide text-black  text-lg">
        Classes Overview
      </h3>
      <ReactApexChart
        type="pie"
        height={600}
        width={400}
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
          labels: data?.data?.map((item) => item?._id) || [],
          responsive: [
            {
              breakpoint: 1500,
              options: {
                chart: {
                  width: 350,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 1200,
              options: {
                chart: {
                  width: 300,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
        }}
      />
    </div>
  );
}
