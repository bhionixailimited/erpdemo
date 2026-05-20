import { McqType } from "components/students";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";

const AssignMent = () => {
  const { assignmentId } = useRouter().query;

  return (
    <PrivateLayout title="Assignment | Student">
      <section className="w-full p-2 md:p-4 flex flex-col lg:flex-row ">
        <div className="w-full">
          <McqType assignmentId={assignmentId?.toString()} />
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(AssignMent);
