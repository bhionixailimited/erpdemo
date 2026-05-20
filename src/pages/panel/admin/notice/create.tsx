import { AdminCreateNoticeForm } from "components/form/admin";
import { CreateNoticeForm } from "components/form/teacher";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const CreateNotice = () => {
  return (
    <PrivateLayout title="Teacher | Notice">
      <section className="w-full md:p-4">
        <AdminCreateNoticeForm />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(CreateNotice);
