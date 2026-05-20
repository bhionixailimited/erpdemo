import {
  AssignmentStat,
  DonutAssignmentDashboard,
  LastAssignment,
  StudentAssignmentGraph,
} from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const AssignmentDashboard = () => {
  return (
    <PrivateLayout title="Dashboard | Assignment">
      <section className="w-full  ">
        <AssignmentStat />
        <div className="w-full grid grid-cols-12  gap-4 xl:gap-6 px-4 ">
          <div className=" col-span-12 lg:col-span-6 2xl:col-span-3">
            <DonutAssignmentDashboard />
          </div>
          <div className="col-span-12 lg:col-span-6  2xl:col-span-3">
            <LastAssignment />
          </div>
          <div className="col-span-12 lg:col-span-12 2xl:col-span-6 ">
            <StudentAssignmentGraph />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(AssignmentDashboard);
