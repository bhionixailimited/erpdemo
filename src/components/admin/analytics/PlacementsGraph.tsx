import { AdmissionGraph } from "components/admin/analytics";
import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const AnalyticalOverview = () => {
  const { data: p } = useSWRFetch<any>("dashboard/admin/placement-report");

  const admissionSeries = [
    {
      name: "Boys",
      type: "column",
      data: p?.data?.map((item: any, i: number) => item?.totalBoys) || [],
    },
    {
      name: "Girls",
      type: "column",
      data: p?.data?.map((item: any, i: number) => item?.totalGirls) || [],
    },
    {
      name: "Totals",
      type: "line",
      data: p?.data?.map((item: any, i: number) => item?.totalStudent) || [],
    },
  ];

  const dataOptions = {
    // title: {
    //   text: text,
    // },
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
    // title: {
    //   text: "Repairs Report",
    //   align: "left",
    //   offsetX: 110,
    // },
    xaxis: {
      categories: p?.data?.map((item: any, i: number) => item?._id) || [],
    },
    yaxis: [
      {
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#5B50A1",
        },
        labels: {
          style: {
            colors: "#5B50A1",
          },
        },
        title: {
          text: "Boys",
          style: {
            color: "#5B50A1",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Girls",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#C43C5C",
        },
        labels: {
          style: {
            colors: "#C43C5C",
          },
        },
        title: {
          text: "Girls",
          style: {
            color: "#C43C5C",
          },
        },
      },
      {
        seriesName: "Total",
        opposite: true,
        axisTicks: {
          show: true,
        },
        axisBorder: {
          show: true,
          color: "#c634eb",
        },
        labels: {
          style: {
            colors: "#c634eb",
          },
        },
        title: {
          text: "Total",
          style: {
            color: "#c634eb",
          },
        },
      },
    ],
    colors: ["#5B50A1", "#C43C5C", "#c634eb"],

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
  };

  return (
    <>
      <h3 className=" font-semibold tracking-wide text-lg px-4 pt-4">
        Placements Report
      </h3>
      <AdmissionGraph
        type={"bar"}
        series={admissionSeries}
        options={dataOptions as any}
      />
    </>
  );
};

export default AnalyticalOverview;
