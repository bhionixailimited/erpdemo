import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";
import { useMemo } from "react";
const ApexCharts = dynamic(() => import("react-apexcharts"), { ssr: false });

type Props = {
  type: "line" | "bar" | "area";
  text?: string;
  totals?: number[];
  categories?: string[];
};
type AdmissionType = {
  data: {
    _id: string;
    totalClass: number;
    courseWiseCount: {
      student: number;
      course: {
        title: string;
      };
    }[];
  }[];
};
export default function DashboardColumnGraph({}: Props) {
  const { data, mutate, isValidating } = useSWRFetch<AdmissionType>(
    "dashboard/admin/admission-report"
  );
  const seriesData = useMemo(
    () =>
      Array.from(
        new Set(
          data?.data?.flatMap((item, index) =>
            item?.courseWiseCount?.map((inner) => inner?.course?.title)
          )
        )
      )?.map((item) => {
        return {
          name: item || "Other",
          data: data?.data
            ?.map((item) => {
              return item?.courseWiseCount?.map((inner) => {
                return {
                  year: item?._id,
                  course: inner?.course,
                  student: inner?.student,
                };
              });
            })
            ?.map((inner) =>
              inner?.reduce((acc, innerItem) => {
                if (innerItem?.course?.title === item) {
                  return acc + innerItem?.student;
                } else {
                  return acc;
                }
              }, 0)
            ),
        };
      }),
    [data?.data]
  );

  return (
    <div className="rounded-xl bg-white p-6 ">
      <ApexCharts
        options={{
          title: {
            text: "Admissions Report",
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
            categories: data?.data?.map((item: any) => item?._id) || [],
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

          colors: ["#ff4560", "#c634eb", "#C43C5C", "#6fadde", "#5B50A1"],
        }}
        series={(seriesData as any) || []}
        type={"bar"}
      />
    </div>
  );
}
