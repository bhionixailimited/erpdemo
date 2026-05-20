import dynamic from "next/dynamic";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function ColumnChartUserDashboard({
  type,
  text = "",
  className="",title="",
  series,
  categories
}: {
  type: "radialBar" | "bar";
  text?: string;
  title?: string;
  className?: string;
  series?: [
    {
      name?:string
      data?:number[]
    },  {
      name?:string
      data?:number[]
    }
  ];
  categories?: Array<string>;
}) {
  const options = {
    series: series ,
    options: {
      chart: {
        type: "bar",
        height: 350,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "55%",
          endingShape: "rounded",
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: [
          "2022",
          "2021",
          "2020",
          "2019",
          "2018",
          "2017",
          "2016",
        ],
      },
      yaxis: {
        title: {
          text: "$ (thousands)",
        },
      },
      fill: {
        opacity: 1,
      },
      tooltip: {
        //   y: {
        //     formatter: function (val) {
        //       return "$ " + val + " thousands"
        //     }
        //   }
      },
    },
  };

  return (
    <div className={` ${className}`}>
      <h3 className="font-semibold w-full text-left tracking-wide text-black text-lg">
        {title}
      </h3>
      <ApexCharts
        height={"320"}
        options={{
          title: {
            text: text,
            // style: {
            //   fontWeight: "600",
            //   fontSize: "18px",
            //   color: "#db2777",
            //   fontFamily: "Montserrat",
            // },
          },
          chart: {
            type: "bar",
            height: 350,
          },
          plotOptions: {
            bar: {
              horizontal: false,
              columnWidth: "55%",
              //   endingShape: "rounded",
            },
          },
          dataLabels: {
            enabled: false,
          },
          stroke: {
            show: true,
            width: 2,
            colors: ["transparent"],
          },
          xaxis: {
            categories:  categories,
          },
          yaxis: {
            // title: {
            //   text: "$ (thousands)",
            // },
          },
          fill: {
            opacity: 1,
          },
          tooltip: {
            //   y: {
            //     formatter: function (val) {
            //       return "$ " + val + " thousands"
            //     }
            //   }
          },
          colors: ["#5B50A1", "#C43C5C"],
          // labels: ["Pending", "Verified"],
        }}
        series={options.series as any} 
        type={type}
      />
    </div>
  );
}
