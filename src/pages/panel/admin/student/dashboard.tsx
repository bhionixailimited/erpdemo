import { StudentCards } from "components/admin";
import {
  ColumnChartUserDashboard,
  DonutBuyDashboard,
  StudentDonutChart,
} from "components/admin/analytics";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useMemo } from "react";

const Dashboard = () => {
  const { data } = useSWRFetch<any>("dashboard/admin/pass-student");

  type AdmissionType = {
    data: {
      _id: string;
      totalClass: number;
      totalMale: number;
      totalFemale: number;
      totalOther: number;
      courseWiseCount: {
        student: number;
        course: {
          title: string;
        };
      }[];
    }[];
  };

  const {
    data: batchwise,
    mutate,
    isValidating,
  } = useSWRFetch<AdmissionType>("dashboard/admin/admission-report");

  const seriesData = useMemo(
    () =>
      Array.from(
        new Set(
          batchwise?.data?.flatMap((item, index) =>
            item?.courseWiseCount?.map(
              (inner) => inner?.course?.title || "Other"
            )
          )
        )
      )?.map((item) => {
        return {
          name: item,
          data: batchwise?.data
            ?.flatMap((item) => {
              return item?.courseWiseCount?.map((inner) => {
                return {
                  year: item?._id,
                  course: inner?.course?.title || "Other",
                  student: inner?.student,
                };
              });
            })
            ?.reduce((acc, innerItem) => {
              if (innerItem?.course === item) {
                return acc + innerItem?.student;
              } else {
                return acc;
              }
            }, 0),
        };
      }),
    [batchwise?.data]
  );

  return (
    <div className="w-full">
      <PrivateLayout title="Student | Dashboard">
        <>
          <StudentCards />
          <div className="grid grid-cols-12 content-between gap-4  p-6 ">
            <div className=" col-span-12 gap-2 md:col-span-12 lg:col-span-5">
              {!seriesData?.length ? (
                <div className="col-span-12 p-4 rounded-xl border  bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4 h-full mb-3">
                  <h2 className="flex flex-col text-left items-start mt-2 font-semibold text-lg ">
                    Batch Wise Students
                  </h2>
                  <Empty title="No data found" />
                </div>
              ) : (
                <StudentDonutChart
                  pieLabel={
                    seriesData?.map((seriesData) => seriesData?.name) || []
                  }
                  pieSeries={
                    seriesData?.map((seriesData) => seriesData?.data || 0) || []
                  }
                  title={"Batch Wise Students"}
                  className={
                    "col-span-12 p-6  gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-5"
                  }
                />
              )}
            </div>
            <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-7 !border-grey-500 rounded-xl !shadow-xl">
              <ColumnChartUserDashboard
                type={"bar"}
                title={"Pass Out Students Report"}
                categories={
                  data?.data?.map((id: any) => id?._id || "Other") || []
                }
                series={[
                  {
                    name: "Boys",
                    data: data?.data?.map((id: any) => id?.male || 0) || [],
                  },
                  {
                    name: "Girls",
                    data: data?.data?.map((id: any) => id?.female || 0) || [],
                  },
                ]}
                className={"col-span-12   gap-10  flex flex-col "}
              />
            </div>
            <div className=" col-span-12 gap-2 md:col-span-12  lg:col-span-7"></div>
          </div>
        </>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Dashboard);
