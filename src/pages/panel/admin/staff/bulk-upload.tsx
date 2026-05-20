import { BulkUploadForm, CreateExam } from "components/form/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useEffect } from "react";

const BulkUpload = () => {
  return (
    <PrivateLayout title="Bulk Upload | Create ">
      <section className="w-full p-4  min-h-screen flex justify-center items-center">
        <BulkUploadForm title={"Staffs"} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(BulkUpload);
