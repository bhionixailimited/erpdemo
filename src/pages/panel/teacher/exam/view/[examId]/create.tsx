import { TestExamForm } from "components/form/teacher";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const CreateTest = () => {
  return (
    <PrivateLayout title="Teacher | Test">
      <section className="w-full">
        <TestExamForm />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(CreateTest);
