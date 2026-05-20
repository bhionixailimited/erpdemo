import { SubjectDetails, SubjectDetailsTab } from "components/teachers";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const SubjectWiseExam = () => {
  return (
    <PrivateLayout title="View | Exam">
      <section className="w-full p-4 container mx-auto ">
        <SubjectDetails />
        <SubjectDetailsTab />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(SubjectWiseExam);
