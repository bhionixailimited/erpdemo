import { AdminApp, IosApp } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";

const AdminAppConfig = () => {
  return (
    <PrivateLayout title="Config | Admin App">
      <section className="w-full md:p-4">
        <div className="flex flex-col justify-center items-center lg:flex-row gap-6 md:px-6">
          <div className="w-full md:w-3/6">
            <AdminApp />
          </div>
          {/* <div className="w-full">
            <IosApp />
          </div> */}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(AdminAppConfig);
