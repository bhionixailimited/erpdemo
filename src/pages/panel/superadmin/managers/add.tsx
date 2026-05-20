import { Email, PhoneTwoTone } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { AdminCard } from "components/cards";
import { AddAdminForm } from "components/form/admin";
import { withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import React from "react";

const Admins = () => {
  const { edit, editId } = useRouter().query;

  return (
    <PrivateLayout>
      <div className="w-full md:p-4">
        <div className="w-full md:w-8/12 mx-auto border mt-5 rounded-xl shadow-md">
          <h3 className="border-b py-4 text-center text-2xl text-theme font-bold">
            {edit ? "Update" : "Add"} Manager
          </h3>
          <AddAdminForm role="manager" />
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedSuperAdmin(Admins);
