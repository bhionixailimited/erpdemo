import ManageCoupons from "components/apply/registration/coupons/ManageCoupons";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";

const Managecoupons = () => {
  return (
    <PrivateLayout title="Manage Coupons">
      <div className="w-full md:p-4">
        <ManageCoupons />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(Managecoupons);
