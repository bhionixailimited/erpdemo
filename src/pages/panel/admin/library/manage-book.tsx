import { LibraryBody, LibraryCards, ViewLibraryBook } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const ManageBook = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Library | Book">
        <section className="w-full p-4">
          <LibraryCards />
          <LibraryBody />
          <ViewLibraryBook />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ManageBook);
