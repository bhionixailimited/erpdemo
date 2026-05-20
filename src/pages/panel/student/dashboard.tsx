import { AdmissionGraph } from "components/admin/analytics";
import {
  StudentClassGraph,
  StudentStats,
  StudentUpcomingClass,
  SubjectOverview,
} from "components/students";
import { useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useMemo } from "react";

type TestAssignmentDataType = {
  data: {
    assignment: number;
    month: string;
    test: number;
  }[];
};

const StudentDashboard = () => {
  const { data } = useSWRFetch<TestAssignmentDataType>(
    `dashboard/student/get-test-assignment-overview`
  );

  const admissionSeries = useMemo(() => {
    return [
      {
        name: "Tests",
        type: "column",
        data: data?.data?.map((item) => item?.test || 0) || [],
      },
      {
        name: "Assignments",
        type: "column",
        data: data?.data?.map((item) => item?.assignment || 0) || [],
      },
      {
        name: "Total",
        type: "line",
        data: data?.data?.map((item) => item?.assignment + item?.test, 0) || [],
      },
    ];
  }, [data?.data?.length]);

  const dataOptions = useMemo(() => {
    return {
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
        categories: data?.data?.map((item) => item?.month || "Other") || [],
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
  }, [data?.data?.length]);

  return (
    <PrivateLayout title="Student | Dashboard">
      <section className="w-full p-6 ">
        <StudentStats />
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex w-full lg:w-2/3 py-6  ">
            <StudentClassGraph />
          </div>
          <div className="flex w-full lg:w-1/3 py-6  ">
            <StudentUpcomingClass />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex w-full lg:w-1/3 pb-6">
            <SubjectOverview />
          </div>
          <div className="flex w-full lg:w-2/3 pb-6  ">
            <div className="w-full bg-white shadow-lg rounded-lg border flex flex-col gap-4 ">
              <h3 className="font-semibold tracking-wide text-lg p-4 ">
                Tests and Assignments Overview
              </h3>
              <AdmissionGraph
                type={"bar"}
                series={admissionSeries}
                options={dataOptions as any}
              />
            </div>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentDashboard);
