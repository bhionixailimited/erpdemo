import { AddInstituteForm } from "components/form/admin";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";

const AddInstitute = () => {
  const { edit } = useRouter()?.query;
  return (
    <PrivateLayout>
      <div className="w-full md:p-4">
        <div className="w-full md:w-8/12 mx-auto border mt-5 rounded-xl shadow-md">
          <h3 className="border-b py-4 text-center text-2xl text-theme font-bold">
            {edit ? "Update" : "Add"} Institute
          </h3>
          <AddInstituteForm />
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(AddInstitute);
