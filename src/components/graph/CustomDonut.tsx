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

export default function CustomDonut({
  title,
  options,
  labels,
  colors,
  series,
  height = 850,
}: Props) {
  return (
    <>
      <div className="flex flex-col w-full">
        <ApexCharts
          height={"240"}
          options={{
            chart: {
              type: "donut",
              height: height,
              width: "100%",
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "55%",
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
