import { Calender, UpcomingTimetableClass } from "components/teachers";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";

const StudentTimetable = () => {
  return (
    <PrivateLayout title="Student | Timetable">
      <section className="w-full flex   px-4 xl:px-6">
        <div className="w-full flex flex-col items-start">
          <div className="flex w-full  ">
            <UpcomingTimetableClass type="STUDENT" />
          </div>
          <div className="flex w-full ">
            <Calender />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentTimetable);
