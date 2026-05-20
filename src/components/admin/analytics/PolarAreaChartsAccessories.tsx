import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function PolarAreaChartsAccessories({
  type,
  text = "",
}: {
  type: "bar" | "area" | "line" | "polarArea";
  text?: string;
}) {
  const options = {
    series: [180, 200, 230],
    options: {
      chart: {
        type: "polarArea",
      },
      stroke: {
        colors: ["#fff"],
      },
      fill: {
        opacity: 0.8,
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
    },
  };
  return (
    <div className="p-5">
      <p className="text-black font-bold text-center pb-5">Total Accessories</p>
      <ApexCharts
        height={"500"}
        options={{
          chart: {
            type: "polarArea",
            height: 850,
            width: "100%",
          },
          stroke: {
            colors: ["#fff"],
          },
          fill: {
            opacity: 0.8,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
              },
            },
          ],

          colors: ["#F28C28", "#d9117b", "#008000"],
          labels: ["Confirm", "Cancel", "Total Stock"],

          tooltip: {
            fixed: {
              enabled: true,
              position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
              offsetY: 30,
              offsetX: 60,
            },
          },
          legend: {
            position: "bottom",
          },
        }}
        series={options.series}
        type={type}
      />
    </div>
  );
}
