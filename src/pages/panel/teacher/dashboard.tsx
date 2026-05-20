import {
  AnalyticalOverview,
  TeacherClassGraph,
  TeacherStat,
  UpcomingClass,
} from "components/teachers";
import TeacherWeeklyData from "components/teachers/dashboard/TeacherWeeklyData";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const TeacherDashboard = () => {
  return (
    <PrivateLayout title="Dashboard">
      <section className="w-full p-2 md:p-6 ">
        <TeacherStat />
        <div className="flex flex-col lg:flex-row gap-2 md:gap-6">
          <div className="flex w-full lg:w-2/3 py-6  ">
            <TeacherClassGraph />
          </div>
          <div className="flex w-full lg:w-1/3 py-6  ">
            <UpcomingClass />
          </div>
        </div>
        <div className="flex flex-col lg:flex-row gap-2 md:gap-6">
          <div className="flex w-full lg:w-1/3 pb-6  ">
            <TeacherWeeklyData />
          </div>
          <div className="flex w-full lg:w-2/3 pb-6  ">
            <AnalyticalOverview />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(TeacherDashboard);
