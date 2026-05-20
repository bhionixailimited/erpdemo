import { ViewAllStudent } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const FeePayments = () => {
  return (
    <PrivateLayout title="Fees | Payment">
      <section className="w-full container mx-auto p-4">
        <ViewAllStudent />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(FeePayments);
