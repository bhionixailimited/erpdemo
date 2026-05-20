import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  type: "line" | "bar" | "area";
  text?: string;
  styleClass?: string;
};

export default function MultiPulLineGraph({
  type,
  text = "",
  styleClass = "",
}: Props) {
  const options = {
    series: [
      {
        name: "In Store",
        data: [60, 70, 35, 40, 42, 109, 100, 50, 120, 200, 250],
      },
      {
        name: "Mail",
        data: [11, 32, 45, 32, 34, 52, 41, 60, 55, 40, 70, 40],
      },
      {
        name: "Call Out",
        data: [1, 24, 23, 11, 22, 16, 25, 30, 60, 20, 55, 25],
      },
    ],
    options: {
      chart: {
        height: 40,
        type: type,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
      },
      xaxis: {
        type: "category",
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
        x: {
          format: "month",
        },
      },
    },
  };
  return (
    <div className="rounded-md bg-white p-6 w-full h-full shadow-lg">
      <ApexCharts
        options={{
          title: {
            text: text,
          },

          chart: {
            // height: 20,
            type: type,
          },

          dataLabels: {
            enabled: false,
          },
          stroke: {
            curve: "smooth",
          },
          xaxis: {
            type: "category",
            categories: [
              "Jan",
              "Feb",
              "March",
              "April",
              "May",
              "Jun",
              "July",
              "Aug",
              "Sep",
              "Oct",
              "Nov",
              "Dec",
            ],
          },
          tooltip: {
            x: {
              format: "month",
            },
          },
          colors: ["#FF53AE", "#d9117b", "#d21579"],
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
