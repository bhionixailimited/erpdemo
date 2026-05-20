import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  pieLabel: string[];
  pieSeries: number[];
  title: string;
  className?: string;
};

export default function StudentDonutChart({
  pieLabel,
  pieSeries,
  title,
  className,
}: Props) {
  return (
    <div className={`${className}`}>
      <h3 className="font-semibold w-full text-left tracking-wide text-black text-lg">
        {title}
      </h3>
      <ApexCharts
        height={"400"}
        series={pieSeries}
        options={{
          labels: pieLabel,
          //   title: {
          //     style: {
          //       fontWeight: '600',
          //       fontSize: '15px',
          //       color: 'orange',
          //       fontFamily: 'Montserrat',
          //     },
          //     text: 'Beneficiaries By Category',
          //   },

          chart: {
            // height: 100,
            type: "donut",
            height: 850,
            width: "100%",
          },
          dataLabels: {
            enabled: true,
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

          //   stroke: {
          //     curve: 'smooth',
          //   },
          //   xaxis: {
          //     categories: categories,
          //   },
          colors: ["#ff4560", "#c634eb", "#C43C5C", "#6fadde", "#5B50A1"],
        }}
        type={"donut"}
      />
    </div>
  );
}
