import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  type: "radialBar";
  title?: string;
  radialSeries?: number[];
  radialLabel?: string[];
  className?: string;
  totalReturn?: number;
};

export default function DashboardRadialBar({
  radialSeries,
  radialLabel,
  className = "",
  title,
  totalReturn,
}: //   totals = [],
//   categories = [],
Props) {
  return (
    <div className={` px-3 py-4  ${className}`}>
      <ApexCharts
        height={"430"}
        series={radialSeries}
        options={{
          // labels: ["Male", "Female"],
          labels: radialLabel,

          title: {
            style: {
              fontWeight: "700",
              fontSize: "16px",
              color: "black",
              fontFamily: "Montserrat",
            },
            text: `${title}`,
          },

          chart: {
            height: 50,
            type: "radialBar",
          },
          dataLabels: {
            enabled: false,
          },

          legend: {
            show: true,
            position: "bottom",
            horizontalAlign: "center",
            height: 40,
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            // strokeColor: '#fff',
            // fillColors: undefined,
            radius: 12,
            // customHTML: undefined,
            onClick: undefined,
            offsetX: 0,
            offsetY: 0,
          },
          fill: {
            type: "gradient",
            pattern: {
              style: "",
            },
          },
          plotOptions: {
            radialBar: {
              hollow: {
                size: "60%",
                dropShadow: {
                  enabled: true,
                  top: 0,
                  left: 0,
                  blur: 1,
                  opacity: 0.5,
                },
              },
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
                    // By default this function returns the average of all series. The below is just an example to show the use of custom formatter function
                    return `${totalReturn}`;
                  },
                },
              },
            },
          },
          //   stroke: {
          //     curve: 'smooth',
          //   },
          //   xaxis: {
          //     categories: categories,
          //   },
          // colors: ["#5B50A1", "#514b7d"],
          colors: ["#5B50A1", "#ff4560", "#3399FF", "#514b7d"],
        }}
        type={"radialBar"}
      />
    </div>
  );
}
