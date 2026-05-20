import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function MixedChartRefurbished({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line";
  text?: string;
}) {
  const options = {
    series: [
      {
        name: "Confirm",
        type: "column",
        data: [14, 20, 25, 15, 25, 28, 38, 46],
      },
      {
        name: "Delivered",
        type: "column",
        data: [11, 30, 31, 40, 41, 49, 65, 85],
      },
      {
        name: "Cancel",
        type: "line",
        data: [20, 29, 37, 36, 44, 45, 50, 58],
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "line",
        stacked: false,
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: [1, 1, 4],
      },
      title: {
        text: "XYZ - Refurbished Analysis (2015 - 2022)",
        align: "left",
        offsetX: 110,
      },
      xaxis: {
        categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
      },
      yaxis: [
        {
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#b00b13",
          },
          labels: {
            style: {
              colors: "#b00b13",
            },
          },
          title: {
            text: "Order (thousand crores)",
            style: {
              color: "#b00b13",
            },
          },
          tooltip: {
            enabled: true,
          },
        },
        {
          seriesName: "Order",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#00E396",
          },
          labels: {
            style: {
              colors: "#00E396",
            },
          },
          title: {
            text: "Operating Payment (thousand crores)",
            style: {
              color: "#00E396",
            },
          },
        },
        {
          seriesName: "Refund",
          opposite: true,
          axisTicks: {
            show: true,
          },
          axisBorder: {
            show: true,
            color: "#FEB019",
          },
          labels: {
            style: {
              colors: "#FEB019",
            },
          },
          title: {
            text: "Refund (thousand crores)",
            style: {
              color: "#FEB019",
            },
          },
        },
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60,
        },
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40,
      },
    },
  };
  return (
    <ApexCharts
      height={"500"}
      options={{
        chart: {
          height: 850,
          type: "line",
          stacked: false,
          width: "100%",
        },
        dataLabels: {
          enabled: false,
        },
        stroke: {
          width: [1, 1, 4],
        },
        title: {
          text: "Refurbished Analysis (2015 - 2022)",
          align: "left",
          offsetX: 110,
        },
        xaxis: {
          categories: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022],
        },
        yaxis: [
          {
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#008FFB",
            },
            labels: {
              style: {
                colors: "#008FFB",
              },
            },
            title: {
              text: "Confirm",
              style: {
                color: "#008FFB",
              },
            },
            tooltip: {
              enabled: true,
            },
          },
          {
            seriesName: "Order",
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#00E396",
            },
            labels: {
              style: {
                colors: "#00E396",
              },
            },
            title: {
              text: "Delivered",
              style: {
                color: "#00E396",
              },
            },
          },
          {
            seriesName: "Refund",
            opposite: true,
            axisTicks: {
              show: true,
            },
            axisBorder: {
              show: true,
              color: "#d9117b",
            },
            labels: {
              style: {
                colors: "#d9117b",
              },
            },
            title: {
              text: "Cancel",
              style: {
                color: "#d9117b",
              },
            },
          },
        ],
        colors: ["#FFE3B4", "#008000", "#d9117b"],

        tooltip: {
          fixed: {
            enabled: true,
            position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
            offsetY: 30,
            offsetX: 60,
          },
        },
        legend: {
          horizontalAlign: "left",
          offsetX: 40,
        },
      }}
      series={options.series}
      type={type}
    />
  );
}
