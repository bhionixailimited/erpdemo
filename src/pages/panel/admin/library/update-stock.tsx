import { ViewLibraryBook } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const UpdateStock = () => {
  return (
    <PrivateLayout title="Library | Stock ">
      <section className="w-full p-4">
        <ViewLibraryBook />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(UpdateStock);
