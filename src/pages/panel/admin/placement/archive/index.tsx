import { AllSessionPlacementData } from "components/admin";
import { SearchBar } from "components/common";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const PlacementArchive = () => {
  return (
    <PrivateLayout title="Placement | Archive ">
      <section className="w-full container mx-auto">
        {/* <SearchBar /> */}
        <AllSessionPlacementData />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(PlacementArchive);
