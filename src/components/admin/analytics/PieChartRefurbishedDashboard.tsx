import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PieChartRefurbishedDashboard({
  type,
  text = "",
}: {
  type: "radialBar" | "pie";
  text?: string;
}) {
  const options = {
    title: {
      text: text,
    },
    series: [44, 55, 43],
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: ["Electronics", "Mobile", "Accessories"],
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
    },
  };

  return (
    <div className="p-3">
      <ApexCharts
        height={"400"}
        options={{
          title: {
            text: text,
            style: {
              fontWeight: "600",
              fontSize: "18px",
              color: "#db2777",
              fontFamily: "Montserrat",
            },
          },
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["Electronics", "Mobile", "Accessories"],
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
          legend: {
            position: "bottom",
          },
          colors: ["#db2777", "#C04000", "#E97451"],
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
