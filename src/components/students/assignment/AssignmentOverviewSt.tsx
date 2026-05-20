import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import dynamic from "next/dynamic";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

type WeeklyAssignmentDataType = {
  data: {
    _id: string;
    assignmentNotSubmitted: number;
    completeAssignment: number;
    subject: string;
    totalAssignment: number;
    upcomingAssignment: number;
  }[];
};

const AssignmentOverviewSt = () => {
  const { data, isValidating } = useSWRFetch<WeeklyAssignmentDataType>(
    `dashboard/student/week-assignment-overview`
  );

  return (
    <div className=" w-full rounded-xl h-full border items-center bg-white shadow-xl p-6 flex flex-col gap-5 ">
      <h3 className="font-semibold w-full text-left tracking-wide text-black  text-lg">
        Weekly Assignment Overview
      </h3>
      {data && !isValidating && data?.data?.length ? (
        <ReactApexChart
          type="pie"
          height={380}
          width={380}
          series={
            [
              data?.data?.reduce(
                (acc, item) => acc + (item?.completeAssignment || 0),
                0
              ) || 0,
              data?.data?.reduce(
                (acc, item) => acc + (item?.assignmentNotSubmitted || 0),
                0
              ) || 0,
              data?.data?.reduce(
                (acc, item) => acc + (item?.upcomingAssignment || 0),
                0
              ) || 0,
            ] || []
          }
          options={{
            chart: {
              width: 380,
              type: "pie",
            },
            legend: {
              position: "bottom",
            },
            labels: [
              "Completed Assignment",
              "Not Submitted Assignment",
              "Upcoming Assignment",
            ],
            responsive: [
              {
                breakpoint: 1500,
                options: {
                  chart: {
                    width: 350,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 1200,
                options: {
                  chart: {
                    width: 300,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          }}
        />
      ) : (
        <Empty title="No data found" height={250} />
      )}
    </div>
  );
};

export default AssignmentOverviewSt;
