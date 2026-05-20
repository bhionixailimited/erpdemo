import { AddBookForm } from "components/form/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const AddNewBook = () => {
  return (
    <PrivateLayout title="Library | Add Book">
      <section className="w-full md:p-4 ">
        <AddBookForm />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(AddNewBook);
