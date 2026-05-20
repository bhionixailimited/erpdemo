import { ViewAssignment } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";

import { PrivateLayout } from "layouts";

const AssignmentManage = () => {
  return (
    <PrivateLayout title="Teacher | Assignment">
      <section className="w-full p-4 overflow-hidden bg-gray-50 min-h-screen ">
        <ViewAssignment type="TEACHER" />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(AssignmentManage);
