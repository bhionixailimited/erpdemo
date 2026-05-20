import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function RadialBarRepairDashboard({
  type,
  text = "",
}: {
  type: "radialBar";
  text?: string;
}) {
  const options = {
    series: [80, 70, 54],
    options: {
      chart: {
        height: 350,
        type: "radialBar",
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
              formatter: function () {
                return "1,46,912";
              },
            },
          },
        },
      },
      colors: ["#FFE3B4", "#008000", "#d9117b"],
      labels: ["Farmers", "SHG"],
    },
  };

  return (
    <div className="p-3">
      <ApexCharts
        height={"400"}
        options={{
          title: {
            text: text,
          },
          chart: {
            height: 500,
            type: "radialBar",
            width: "100%",
          },
          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            height: 20,
          },
          plotOptions: {
            radialBar: {
              dataLabels: {
                name: {
                  // fontSize: '22px',
                },
                value: {
                  fontWeight: "bold",
                  fontSize: "20px",
                },
                total: {
                  show: true,
                  label: "Total",
                  formatter: function () {
                    return "46,912";
                  },
                },
              },
            },
          },
          colors: ["#db2777", "#C04000", "#E97451"],
          labels: ["Completed", "Ongoing", "Cancelled"],
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
