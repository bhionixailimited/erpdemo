import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type MonthlyClassType = {
  data: {
    _id: string;
    totalClass: number;
    courseWise: {
      classCount: number;
      course: string;
    }[];
  }[];
};

const TeacherClassGraph = () => {
  const { data } = useSWRFetch<MonthlyClassType>(
    "dashboard/teacher/monthly-classes"
  );

  const seriesData = useMemo(
    () =>
      Array.from(
        new Set(
          data?.data?.flatMap((item, index) =>
            item?.courseWise?.map((inner) => inner?.course)
          )
        )
      )?.map((item) => {
        return {
          name: item,
          data: data?.data
            ?.map((item) => {
              return item?.courseWise?.map((inner) => {
                return {
                  year: item?._id,
                  course: inner?.course,
                  classCount: inner?.classCount,
                };
              });
            })
            ?.map((inner) =>
              inner?.reduce((acc, innerItem) => {
                if (innerItem?.course === item) {
                  return acc + innerItem?.classCount;
                } else {
                  return acc;
                }
              }, 0)
            ),
        };
      }),
    [data?.data]
  );

  const optionData = useMemo(() => {
    return {
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
          breakpoint: 500,

          options: {
            legend: {
              position: "bottom",
              offsetX: -10,
              offsetY: 0,
            },
            chart: {
              width: 350,
            },
          },
        },
      ],
      xaxis: {
        categories: data?.data?.map((item) => item?._id) || [],
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
  }, [data?.data]);

  return (
    <div className="w-full bg-white shadow-xl rounded-xl flex flex-col gap-4 p-6 border ">
      <h3 className="font-medium tracking-wide text-lg">Monthly Classes</h3>
      <ApexCharts
        options={optionData as any}
        height={500}
        series={(seriesData as any) || []}
        type="bar"
      />
    </div>
  );
};

export default TeacherClassGraph;
