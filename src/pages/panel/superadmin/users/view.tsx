import { PrivateLayout } from "layouts";
import { useFetch, withProtectedSuperAdmin } from "hooks";
import { ViewAllStaff } from "components/admin";

const ViewUsers = () => {
  return (
    <PrivateLayout title="Users | View">
      <section className="w-full container mx-auto p-4 ">
        <div className="w-full p-4 rounded-md bg-white my-4 border">
          <h3 className="text-lg font-semibold tracking-wide text-theme">
            View Users
          </h3>
        </div>
        <ViewAllStaff />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(ViewUsers);
