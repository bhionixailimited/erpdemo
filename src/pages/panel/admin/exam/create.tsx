import { CreateExam } from "components/form/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const Create = () => {
  return (
    <PrivateLayout title="Exam | Create ">
      <section className="w-full ">
        <CreateExam />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(Create);
