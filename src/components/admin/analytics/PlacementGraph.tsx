import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  type: "radialBar";
  text?: string;
  totals?: number[];
  categories?: string[];
  className?: string;
};

export default function PlacementGraph({
  //   type,

  className = "",
}: Props) {
  return (
    <div className={` px-3 py-4  ${className}`}>
      <ApexCharts
        series={[20, 65, 54, 14]}
        options={{
          labels: ["2022", "2021", "2020", "2019"],
          //   title: {
          //     style: {
          //       fontWeight: "700",
          //       fontSize: "18px",
          //       color: "black",
          //       fontFamily: "Montserrat",
          //     },
          //     text: "Total Placement",
          //   },

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
            radius: 12,
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
                    return `${758}`;
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
          colors: ["#5B50A1", "#ff4560"],
        }}
        type={"radialBar"}
      />
    </div>
  );
}
