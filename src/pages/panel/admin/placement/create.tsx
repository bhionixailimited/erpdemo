import { PlacementCreateForm } from "components/form/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const PlacementCreate = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Placement | Create">
        <section className="w-full p-4 max-w-7xl mx-auto">
          <PlacementCreateForm />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(PlacementCreate);
