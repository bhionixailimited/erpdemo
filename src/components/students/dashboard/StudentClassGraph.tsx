import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type MonthlyClassDataType = {
  data: {
    _id: string;
    subjectData: {
      subject: string;
      totalClass: number;
    }[];
  }[];
};

const StudentClassGraph = () => {
  const { data } = useSWRFetch<MonthlyClassDataType>(
    `dashboard/student/get-monthly-class`
  );

  const series = useMemo(() => {
    return Array.from(
      new Set(
        data?.data?.flatMap((item, index) =>
          item?.subjectData?.map((inner) => inner?.subject || "Other")
        )
      )
    )?.map((item) => {
      return {
        name: item,
        data: data?.data
          ?.map((item) => {
            return item?.subjectData?.map((inner) => {
              return {
                month: item?._id,
                subject: inner?.subject,
                totalClass: inner?.totalClass,
              };
            });
          })
          ?.map((inner) =>
            inner?.reduce((acc, innerItem) => {
              if (innerItem?.subject === item) {
                return acc + innerItem?.totalClass;
              } else {
                return acc;
              }
            }, 0)
          ),
      };
    });
  }, [data?.data?.length]);

  const options = {
    title: {
      text: "",
      style: {
        fontWeight: "700",
        fontSize: "16px",
        color: "black",
        fontFamily: "Montserrat",
      },
    },
    chart: {
      type: "bar",
      height: 350,
      stacked: true,
      stackType: "normal",
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          legend: {
            position: "bottom",
            offsetX: -10,
            offsetY: 0,
          },
        },
      },
    ],
    xaxis: {
      categories: data?.data?.map((item) => item?._id || "Other") || [],
    },
    plotOptions: {
      bar: {
        borderRadius: 10,
      },
    },
    fill: {
      opacity: 1,
    },
    legend: {
      position: "right",
      offsetX: 0,
      offsetY: 50,
    },

    colors: ["#5B50A1", "#ff4560", "#3399FF", "#34b4eb"],
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-xl  justify-center flex flex-col gap-4 p-6 border ">
      <h3 className="font-semibold tracking-wide text-lg">Monthly Classes</h3>
      <ApexCharts
        options={options as any}
        height={500}
        series={series as any}
        type="bar"
      />
    </div>
  );
};

export default StudentClassGraph;
