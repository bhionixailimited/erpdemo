import { StudentLibraryHistory, StudentLibraryProfile } from "components/admin";
import { useAuth } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import React from "react";

const LibraryPage = () => {
  const { user } = useAuth();

  return (
    <PrivateLayout title="Student | Library ">
      <section className="container mx-auto p-4">
        <StudentLibraryProfile studentId={user?._id} type="STUDENT" />
        <StudentLibraryHistory studentId={user?._id} type="STUDENT" />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(LibraryPage);
