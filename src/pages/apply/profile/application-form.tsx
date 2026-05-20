import ApplicationDetails from "components/apply/registration/student-profile/ApplicationDetails";
import { ApplyLayout } from "layouts";
import StudentProfileLayout from "layouts/studentProfileLayout";
import React from "react";

const Applicationform = () => {
  return (
    <StudentProfileLayout title="Application Forms">
      <div className="w-full md:p-4">
        <ApplicationDetails />
      </div>
    </StudentProfileLayout>
  );
};

export default Applicationform;
