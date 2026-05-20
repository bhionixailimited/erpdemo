import { ManageRegistration } from "components/apply/registration";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";

const Manageregistrations = () => {
  return (
    <PrivateLayout title="Manage Registrations">
      <div className="w-full md:p-4"></div>
      <section className="w-full container mx-auto p-4 ">
        <div className="w-full p-4 rounded-md bg-white my-4 border">
          <h3 className="text-lg font-semibold tracking-wide text-theme">
            Manage Registrations
          </h3>
        </div>
        <ManageRegistration />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(Manageregistrations);
