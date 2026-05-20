import { SearchBar } from "components/common";
import { ViewLms } from "components/teachers";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";

const Timetable = () => {
  return (
    <PrivateLayout title="Student | LMS">
      <section className="w-full p-4  ">
        <ViewLms type="STUDENT" />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(Timetable);
