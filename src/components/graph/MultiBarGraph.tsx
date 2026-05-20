import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MultiBarGraph({
  className = "",
  title = "",
  series,
  categories,
  colors,
  height = 320,
}: {
  title?: string;
  className?: string;
  series?: any[];
  categories?: string[];
  colors?: string[];
  height?: number;
}) {
  return (
    <div className={` ${className}`}>
      <h3 className="font-semibold w-full text-left tracking-wide text-black text-lg">
        {title}
      </h3>
      <ApexCharts
        height={height}
        options={{
          title: {
            text: "",
          },
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              //   endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories: categories || [],
          },
          yaxis: {
            // title: {
            //   text: "$ (thousands)",
            // },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            //   y: {
            //     formatter: function (val) {
            //       return "$ " + val + " thousands"
            //     }
            //   }
          },
          colors: colors || [],
        }}
        series={series}
        type={"bar"}
      />
    </div>
  );
}
