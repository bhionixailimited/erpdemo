import { UpComingCommon } from "components/common";
import { ClassOverView, TimeTableDashboardSt } from "components/students";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";

const Timetable = () => {
  return (
    <PrivateLayout title="Student | Timetable">
      <section className="w-full p-6">
        <div className="flex gap-4 flex-col lg:flex-row w-full">
          <TimeTableDashboardSt />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row w-full mt-8  ">
          <div className="w-full md:w-2/3">
            <ClassOverView />
          </div>
          <div className="w-full md:w-1/3    ">
            <UpComingCommon />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(Timetable);
