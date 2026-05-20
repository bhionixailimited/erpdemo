import { CreateStock } from "components/form/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const InventoryCreate = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Inventory | Create">
        <section className="w-full md:p-4">
          <CreateStock />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(InventoryCreate);
