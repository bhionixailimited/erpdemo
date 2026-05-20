import { ViewAllExam } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const ViewAllExamPage = () => {
  return (
    <PrivateLayout title="Exam | View All">
      <section className="w-full container mx-auto ">
        <ViewAllExam />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ViewAllExamPage);
