import { BulkUploadForm } from "components/form/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const BulkUpload = () => {
  return (
    <PrivateLayout title="Bulk Upload | Create ">
      <section className="w-full p-4  mt-5 flex justify-center items-center ">
        <BulkUploadForm title={"Students"} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(BulkUpload);
