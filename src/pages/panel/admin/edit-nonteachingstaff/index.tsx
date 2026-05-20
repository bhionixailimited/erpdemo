import { EditTeachingStaffForm } from "components/form/admin";
import { EditDetailsForm } from "components/form/teacher";
import { withProtectedAdmin } from "hooks";

import { PrivateLayout } from "layouts";
import React from "react";

const UpdateNonTeachingStaff = () => {
  return (
    <PrivateLayout title="Update-Details">
      <section className="px-6">
        <div className="w-full">
          <EditDetailsForm />
          {/* <EditDetailsForm staffId={data} onClose={onClose} mutate={mutate} /> */}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(UpdateNonTeachingStaff);
