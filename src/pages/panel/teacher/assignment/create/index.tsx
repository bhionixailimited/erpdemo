import { AssignmentCreateForm } from "components/form/teacher";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const AssignmentCreatePage = () => {
  return (
    <PrivateLayout title="Teacher | Assignment">
      <div className="shadow-xl border bg-white px-4">
        <AssignmentCreateForm />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(AssignmentCreatePage);
