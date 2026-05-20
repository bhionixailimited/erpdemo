import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function YearlyGraph({
  type,
  text = "",
  monthlyData,
  Categories,
}: {
  type: "bar" | "area" | "line";
  text?: string;
  monthlyData: any[];
  Categories: any[];
}) {
  const options = {
    series: [
      {
        name: "Monthly",
        data: monthlyData as any[],
      },
    ],
  };

  return (
    <div className="rounded-md bg-white p-6 shadow-lg">
      <ApexCharts
        options={{
          title: {
            text: text,
          },
          chart: {
            height: 350,
            type: type,
            events: {
              //   click: function (chart, w, e) {
              //     // console.log(chart, w, e)
              //   },
            },
          },
          //   colors: colors,
          plotOptions: {
            bar: {
              columnWidth: "45%",
              distributed: true,
            },
          },
          tooltip: {
            x: {
              format: "month",
            },
          },
          colors: ["#FF53AE"],
          dataLabels: {
            enabled: false,
          },
          legend: {
            show: false,
          },
          xaxis: {
            type: "category",
            categories: Categories,
            labels: {
              style: {
                // colors: colors,
                fontSize: "12px",
              },
            },
          },
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
