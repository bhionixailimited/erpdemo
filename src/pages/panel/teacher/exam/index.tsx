import { ViewTestExam } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const Test = () => {
  return (
    <PrivateLayout title="Teacher | Test">
      <section className="w-full bg-gray-50">
        <ViewTestExam />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(Test);
