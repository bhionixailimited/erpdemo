import { InventoryStockList } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const InventoryManageStock = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Inventory | Stock">
        <section className="w-full p-4">
          <InventoryStockList />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(InventoryManageStock);
