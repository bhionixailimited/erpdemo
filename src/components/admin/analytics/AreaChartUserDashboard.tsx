import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function AreaChartUserDashboard({
  type,
}: {
  type: "radialBar" | "bar" | "area";
}) {
  const options = {
    series: [
      {
        name: "Customer",
        data: [31, 40, 28, 51, 42, 89, 100, 67, 87, 23, 79, 45],
      },
      {
        name: "Technician",
        data: [11, 32, 45, 32, 34, 52, 41, 68, 23, 90.35, 68, 89],
      },
    ],
    options: {
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
      //   xaxis: {
      //     type: "date",
      //     categories: [
      //       "2018-01-01T00:00:00.000Z",
      //       "2018-01-01T00:00:00.000Z",
      //       "2018-01-01T00:00:00.000Z",
      //       "2018-01-01T00:00:00.000Z",
      //       "2018-01-01T00:00:00.000Z",
      //       "2018-01-01T00:00:00.000Z",
      //       "2018-01-01T00:00:00.000Z",
      //     ],
      //   },
      tooltip: {
        x: {
          //   format: "dd/MM/yy HH:mm",
          //   format: "dd/mmm/yyyy",
        },
      },
    },
  };

  return (
    <div className="pt-8">
      <ApexCharts
        height={"350"}
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
            categories: [
              "Jan",
              "Feb",
              "March",
              "April",
              "May",
              "June",
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          tooltip: {
            enabled: true,
            x: {
              //   format: "dd/MMM/yy HH:mm",
            },
          },
          colors: ["#db2777", "#E97451"],
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
