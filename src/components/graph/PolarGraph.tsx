import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PolarGraph({
  series,
  colors,
  title,
  height = 310,
  labels,
}: {
  series: any[];
  colors?: string[];
  title?: string;
  height?: number;
  labels?: string[];
}) {
  return (
    <div className="w-full flex flex-col gap-4">
      <h2 className="text-black font-semibold pl-5 pb-8">{title}</h2>

      <ApexCharts
        height={height}
        options={{
          chart: {
            height: 350,
            type: "polarArea",
          },
          responsive: [
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
          labels: labels || [],
          colors: colors || [],
        }}
        series={series || []}
        type={"polarArea"}
      />
    </div>
  );
}
