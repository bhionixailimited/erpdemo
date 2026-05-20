import { SubjectDetails, SubjectDetailsTab } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const ViewExamResult = () => {
  return (
    <PrivateLayout title="Exam | Result ">
      <section className="w-full container mx-auto">
        <SubjectDetails />
        <SubjectDetailsTab />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ViewExamResult);
