import { CreateNoticeForm } from "components/form/teacher";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const CreateNotice = () => {
  return (
    <PrivateLayout title="Teacher | Notice">
      <section className="w-full md:p-4">
        <CreateNoticeForm />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(CreateNotice);
