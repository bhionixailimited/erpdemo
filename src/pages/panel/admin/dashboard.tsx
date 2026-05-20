import { SessionAdmission, StaticData } from "components/admin";
import {
  AdmissionGraph,
  DepartmentAnalytics,
  PlacementGraph,
  PlacementsGraph,
  StudentDistribution,
  VisitorAnalytics,
} from "components/admin/analytics";
import DashboardColumnGraph from "components/admin/analytics/DashboardColumnGraph";
import DashboardRadialBar from "components/admin/analytics/DashboardRadialBar";
import { Empty } from "components/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
type batchData = {
  data: {
    _id: string;
    studentCount: number;
    course: string;
  }[];
};
const Dashboard = () => {
  const router = useRouter();
  const { data: p } = useSWRFetch<any>("dashboard/admin/placement-report");
  const [code, setCode] = useState<any>();
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
        seriesName: "Totals",
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
          text: "Totals",
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
  const { data, mutate, isValidating } = useSWRFetch<batchData>(
    "dashboard/admin/batch-overview?session=true"
  );

  const { data: x } = useSWRFetch<any>("dashboard/admin/student-report");

  return (
    <PrivateLayout title="Dashboard">
      <StaticData />

      <div className="grid grid-cols-12 content-between gap-6 p-6 ">
        <div className="col-span-12 bg-white border mt-2 p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl ">
          <DashboardColumnGraph type="bar" />
        </div>
        <div className=" col-span-12 pt-2 flex  flex-col gap-5 md:col-span-12 lg:col-span-4  ">
          {!data?.data?.length ? (
            <div className="col-span-12 p-4 rounded-xl border mt-2 items-center bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4 h-full">
              <h2 className="text-left mt-2 font-semibold text-lg ">
                Batches Overview
              </h2>
              <Empty title="No batch found" />
            </div>
          ) : (
            <StudentDistribution
              className={
                "col-span-12 p-4 rounded-xl border mt-2 items-center bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4 h-full"
              }
              pieLabel={data?.data?.map((data) => data?.course) || []}
              pieSeries={data?.data?.map((data) => data?.studentCount) || []}
              title={"Batches Overview"}
            />
          )}
        </div>
        <div className=" col-span-12  mt-2 sm:col-span-12 md:col-span-12 lg:col-span-5 rounded-xl border shadow-xl bg-white hidden md:block ">
          <div className="grid grid-cols-12 content-between gap-2">
            <div className="sm:col-span-12 md:col-span-12 lg:col-span-12">
              {x?.data?.totalMale || x?.data?.totalFemale ? (
                <DashboardRadialBar
                  className="w-full "
                  type="radialBar"
                  radialLabel={["Male", "Female"]}
                  radialSeries={[
                    Math.round(
                      (x?.data?.totalMale /
                        (Number(x?.data?.totalMale ?? 0) +
                          Number(x?.data?.totalFemale ?? 0))) *
                        100
                    ) || 0,
                    Math.round(
                      (x?.data?.totalFemale /
                        (Number(x?.data?.totalMale ?? 0) +
                          Number(x?.data?.totalFemale ?? 0))) *
                        100
                    ) || 0,
                  ]}
                  totalReturn={Number(
                    Number(x?.data?.totalMale ?? 0) +
                      Number(x?.data?.totalFemale ?? 0)
                  )}
                  title={"Total Students"}
                />
              ) : (
                <Empty title="No Students Found" />
              )}
            </div>
          </div>
        </div>
        <DepartmentAnalytics />
        <div className=" w-full col-span-12 pt-2 flex  flex-col gap-5 md:col-span-12 lg:col-span-4   ">
          {/* <SessionAdmission onClick="/panel/admin/placement" />
            <div className="!p-5 flex flex-col gap-6 rounded-xl  bg-white !shadow-xl border">
              <h1 className="text-black text-xl font-bold">
                Placement Past Years
              </h1>
              <PlacementGraph type={"radialBar"} />
            </div>
            <Divider />
            <div className="!text-right p-3">
              <Button
                onClick={() => router.push("/panel/admin/student")}
                size="small"
                className="!font-bold !text-slate-600 !ml-0!text-xs normal-case"
                endIcon={<ChevronRight className=" !text-2xl " />}
              >
                View All
              </Button>
            </div> */}
          {/* <DepartmentAnalytics /> */}
          <VisitorAnalytics />
        </div>
        <div className=" col-span-12 mt-2 shadow-xl  sm:col-span-12 md:col-span-12 lg:col-span-8 !rounded-xl border border-grey-500">
          <PlacementsGraph />
          {/* <h3 className=" font-semibold tracking-wide text-lg px-4 pt-4">
              Placements Report
            </h3>
            <AdmissionGraph
              text="Admission Report"
              type="area"
              series={admissionSeries}
              options={dataOptions as any}
            /> */}
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(Dashboard);
