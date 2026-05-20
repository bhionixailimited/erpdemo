import { Calender, UpcomingTimetableClass } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const Timetable = () => {
  return (
    <PrivateLayout title="Teacher | Timetable">
      <section className="w-full flex overflow-x-hidden  px-4 xl:px-6">
        <div className="w-full flex flex-col items-start">
          <div className="flex w-full  ">
            <UpcomingTimetableClass type="TEACHER" />
          </div>
          <div className="flex w-full ">
            <Calender />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(Timetable);
