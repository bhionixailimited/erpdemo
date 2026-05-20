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

export default function PieGraph({
  title,
  options,
  labels,
  colors,
  series,
  height = 850,
}: Props) {
  return (
    <>
      <div className="p-3">
        <h2 className="text-black font-semibold pl-5 pb-8">{title}</h2>
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
          type={"pie"}
        />
      </div>
    </>
  );
}
