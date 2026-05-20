import { ViewStudents } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const ViewList = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Student | Manage">
        <section className="w-full p-4  ">
          <ViewStudents type="STUDENT" />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ViewList);
