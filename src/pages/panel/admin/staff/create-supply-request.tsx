import { StockSupplied } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const SupplyStock = () => {
  return (
    <PrivateLayout title="Inventory | Supply ">
      <section className="w-full p-4">
        <StockSupplied type={"STAFF"} isSelf={true} exportType="REQUEST" />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(SupplyStock);
