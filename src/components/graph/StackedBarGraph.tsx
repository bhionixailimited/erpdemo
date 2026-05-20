import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function StackedBarGraph({
  series,
  categories,
  colors,
  labels,
  title,
}: {
  series?: any[];
  categories?: string[] | number[];
  colors?: string[];
  labels?: string[];
  title?: string;
}) {
  return (
    <div className="p-4 w-full rounded-xl items-center bg-white shadow-lg flex flex-col gap-5 ">
      <h3 className="font-semibold w-full text-left tracking-wide text-black  text-lg">
        {title}
      </h3>
      <div className="w-full">
        <ApexCharts
          height={"350"}
          options={{
            chart: {
              type: "bar",
              height: 500,
              stacked: true,
            },
            plotOptions: {
              bar: {
                horizontal: true,
                dataLabels: {
                  total: {
                    enabled: true,
                    offsetX: 0,
                    style: {
                      fontSize: "13px",
                      fontWeight: 900,
                    },
                  },
                },
              },
            },
            stroke: {
              width: 1,
              colors: ["#fff"],
            },
            title: {
              text: "",
            },
            xaxis: {
              categories: categories,
              labels: {
                formatter: function (val) {
                  return val;
                },
              },
            },
            yaxis: {
              title: {
                text: undefined,
              },
            },
            tooltip: {
              y: {
                formatter: function (val) {
                  return val + "";
                },
              },
            },
            fill: {
              opacity: 1,
            },
            legend: {
              position: "top",
              horizontalAlign: "left",
              offsetX: 40,
            },
            colors: colors || [],
            labels: labels || [],
          }}
          series={series}
          type={"bar"}
        />
      </div>
    </div>
  );
}
