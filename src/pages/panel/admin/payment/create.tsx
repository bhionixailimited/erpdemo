import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const CreatePayment = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Payment | Create">
        <div>Payment Create</div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(CreatePayment);
