import { DonutGraph, RadialGraph } from "components/graph";
import {
  AssignmentOverviewSt,
  OngoingAssignmentSt,
  StudentAssignmentStat,
  SubjectWiseAssignment,
} from "components/students";
import { useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";

type AssignmentDataType = {
  data: {
    assignmentNotSubmitted: number;
    completeAssignment: number;
    totalAssignment: number;
    upcomingAssignment: number;
  };
};

type TypeWiseAssignment = {
  data: {
    _id: string;
    totalCount: number;
  }[];
};

const StudentAssignmentDashboard = () => {
  const { data: assignmentOverview, isValidating } =
    useSWRFetch<AssignmentDataType>(`dashboard/student/assignment-stat-card`);
  const { data: assignmentType } = useSWRFetch<TypeWiseAssignment>(
    `dashboard/student/assignment-type-wise`
  );

  return (
    <PrivateLayout title="Dashboard | Assignment">
      <section className="w-full pb-10">
        <StudentAssignmentStat />
        <div className="w-full grid grid-cols-12 gap-4 xl:gap-6 px-6">
          <div className="col-span-12 lg:col-span-8">
            <SubjectWiseAssignment />
          </div>
          <div className=" col-span-12 lg:col-span-4 2xl:col-span-4">
            <AssignmentOverviewSt />
          </div>
          <div className="col-span-12 lg:col-span-4 2xl:col-span-4 shadow-xl border p-6">
            <RadialGraph
              series={[
                (
                  (Number(
                    assignmentOverview?.data?.assignmentNotSubmitted || 0
                  ) / Number(assignmentOverview?.data?.totalAssignment) || 1) *
                  100
                )?.toFixed(2) || 0,
                (
                  (Number(assignmentOverview?.data?.completeAssignment || 0) /
                    Number(assignmentOverview?.data?.totalAssignment) || 1) *
                  100
                )?.toFixed(2) || 0,
                (
                  (Number(assignmentOverview?.data?.upcomingAssignment || 0) /
                    Number(assignmentOverview?.data?.totalAssignment || 1)) *
                  100
                )?.toFixed(2) || 0,
              ]}
              colors={["#FFC300", "#5B50A1", "#C43C5C"]}
              title="Assignment Status"
              labels={["Not Submitted", "Submitted", "Upcoming"]}
              average={String(assignmentOverview?.data?.totalAssignment || 0)}
              height={280}
            />
            <h3 className="font-semibold text-lg tracking-wide text-center">
              Assignments Submit
            </h3>
          </div>
          <div className=" col-span-12 lg:col-span-4 2xl:col-span-4 shadow-xl border px-2">
            <DonutGraph
              series={
                assignmentType?.data?.map((item) => item?.totalCount || 0) || []
              }
              labels={
                assignmentType?.data?.map((item) => item?._id || "Other") || []
              }
              title="Assignment Overview"
              colors={["#5B50A1", "#C43C5C", "#BD33B5"]}
            />
          </div>
          <div className=" col-span-12 lg:col-span-4 2xl:col-span-4">
            <OngoingAssignmentSt />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentAssignmentDashboard);
