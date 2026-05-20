import { TestExamForm } from "components/form/teacher";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const CreateTest = () => {
  return (
    <PrivateLayout title="Admin | Test">
      <section className="w-full">
        <TestExamForm />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(CreateTest);
