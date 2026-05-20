import { ViewTestExam } from "components/teachers";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const Manage = () => {
  return (
    <PrivateLayout title="Exam | Manage">
      <section className="w-full container mx-auto ">
        <ViewTestExam />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(Manage);
