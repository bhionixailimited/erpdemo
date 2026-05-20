import { AddBatchForm } from "components/form/admin";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { PrivateLayout } from "layouts";

const CreateBatch = () => {
  return (
    <PrivateLayout title="Batch | Create">
      <div className="w-full p-4">
        <AddBatchForm />
      </div>
    </PrivateLayout>
  );
};

export default withTeacherAdminProtected(CreateBatch);
