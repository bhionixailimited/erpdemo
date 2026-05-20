import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RadialGraph({
  series,
  colors,
  title,
  height = 310,
  average,
  labels,
}: {
  series: any[];
  colors?: string[];
  title?: string;
  height?: number;
  average?: string;
  labels?: string[];
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-black font-semibold pl-5 pb-8">{title}</h2>

      <ApexCharts
        height={height}
        options={{
          chart: {
            height: "100%",
            type: "radialBar",
            width: "100%",
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  fontSize: "22px",
                },
                value: {
                  fontSize: "16px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function (w) {
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return average || "0";
                  },
                },
              },
            },
          },
          labels: labels || [],
          colors: colors || [],
        }}
        series={series || []}
        type={"radialBar"}
      />
    </div>
  );
}
