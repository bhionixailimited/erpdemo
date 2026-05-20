import { ManageProgram } from "components/apply/registration";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";

const Manageprograms = () => {
  return (
    <PrivateLayout title="Manage Programmes">
      <div className="w-full md:p-4">
        <ManageProgram />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(Manageprograms);
