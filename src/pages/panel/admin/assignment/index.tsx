import { SearchBar } from "components/common";
import { ViewAssignment } from "components/teachers";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const AssignmentPage = () => {
  return (
    <PrivateLayout title="Assignment | View">
      <section className="w-full p-4">
        {/* <SearchBar /> */}
        <ViewAssignment type="ADMIN" />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(AssignmentPage);
