import { AllFeesCard } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const ManageFees = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Fees | Manage">
        <AllFeesCard />
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ManageFees);
