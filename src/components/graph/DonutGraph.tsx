import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  title?: string;
  options?: any;
  labels?: string[];
  colors?: string[];
  height?: number;
  series?: any[];
};

export default function DonutGraph({
  title,
  options,
  labels,
  colors,
  series,
  height = 850,
}: Props) {
  return (
    <>
      <div className="p-4  flex flex-col gap-4 w-full">
        <h3 className="text-black font-semibold pb-11 ">{title}</h3>
        <ApexCharts
          height={"340"}
          options={{
            chart: {
              type: "donut",
              height: height,
              width: "100%",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "50%",
                },
              },
            },
            legend: {
              show: true,
              position: "bottom",
              horizontalAlign: "center",
              height: 20,
            },
            ...options,

            //   dataLabels: {
            //     formatter: function (w) {
            //       return 249
            //     },
            //   },
            //   {
            //     total: {
            //       show: true,
            //       label: 'Total',
            //       formatter: function (w) {
            //         return 249
            //       },
            //     },
            //   },
            // ],

            labels: labels || [],

            colors: colors || [],
          }}
          series={series}
          type={"donut"}
        />
      </div>
    </>
  );
}
