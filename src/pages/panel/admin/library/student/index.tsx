import { StudentBookIssue } from "components/admin";
import { SearchBar } from "components/common";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const StudentWise = () => {
  return (
    <PrivateLayout title="Library | Student Wise">
      <section className="w-full p-4">
        <StudentBookIssue />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(StudentWise);
