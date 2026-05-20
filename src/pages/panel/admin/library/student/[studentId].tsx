import { StudentLibraryHistory, StudentLibraryProfile } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";

const ViewStudentData = () => {
  const { studentId } = useRouter().query;

  return (
    <PrivateLayout title="Library | Student Wise Books">
      <section className="w-full p-4 max-w-7xl mx-auto ">
        <StudentLibraryProfile studentId={studentId?.toString()} />
        <StudentLibraryHistory studentId={studentId?.toString()} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(ViewStudentData);
