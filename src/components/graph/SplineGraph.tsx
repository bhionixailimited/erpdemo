import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function SpineGraph({
  series,
  colors,
  title,
  height = 310,
  categories,
  labels,
}: {
  series: any[];
  colors?: string[];
  title?: string;
  height?: number;
  categories: string[];
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
            type: "area",
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "category",
            categories: categories || [],
          },

          labels: labels || [],
          colors: colors || [],
        }}
        series={series || []}
        type={"area"}
      />
    </div>
  );
}
