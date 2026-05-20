import { Transaction } from "components/apply/registration";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React from "react";

const Transactions = () => {
  return (
    <PrivateLayout title="Transaction History">
      <div className="w-full md:p-4">
        <Transaction />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(Transactions);
