import { AdmissionGraph } from "components/admin/analytics";
import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type WeeklyClassData = {
  data: {
    _id: string;
    test: number;
    assignment: number;
  }[];
};

const AnalyticalOverview = () => {
  const { data } = useSWRFetch<WeeklyClassData>(
    `dashboard/teacher/test-analytics`
  );

  const admissionSeries = [
    {
      name: "Tests",
      type: "column",
      data: data?.data?.map((item) => item?.test),
    },
    {
      name: "Assignments",
      type: "column",
      data: data?.data?.map((item) => item?.assignment),
    },
    {
      name: "Total Class",
      type: "line",
      data: data?.data?.map((item) => item?.test + item?.assignment),
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
      categories: data?.data?.map((item) => item?._id) || [],
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
          text: "Assignments",
          style: {
            color: "#5B50A1",
          },
        },
        tooltip: {
          enabled: true,
        },
      },
      {
        seriesName: "Tests",
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
          text: "Tests",
          style: {
            color: "#C43C5C",
          },
        },
      },
      {
        seriesName: "Classes",
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
          text: "Classes",
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
    <div className="w-full bg-white shadow-lg rounded-lg border flex flex-col gap-4 ">
      <h3 className="font-medium tracking-wide text-lg p-4 ">
        Analytical Overview
      </h3>
      <AdmissionGraph
        type={"bar"}
        series={admissionSeries}
        options={dataOptions as any}
      />
    </div>
  );
};

export default AnalyticalOverview;
