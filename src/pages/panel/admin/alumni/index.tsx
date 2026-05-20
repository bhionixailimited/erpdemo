import { ViewStudents } from "components/admin";
import { EditStudentDrawer } from "components/admin/studentdetails";
import { SearchBar } from "components/common";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useState } from "react";

const AlumniPage = () => {
  const [editStudentDrawer, setEditStudentDrawer] = useState(false);
  return (
    <div className="w-full">
      <PrivateLayout title="Alumni | List ">
        <section className="w-full p-4">
          {/* <SearchBar /> */}
          <ViewStudents
            type="ALUMNI"
            studentDrawer={() => setEditStudentDrawer(true)}
          />
          <EditStudentDrawer
            open={editStudentDrawer}
            onClose={() => setEditStudentDrawer(false)}
          />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(AlumniPage);
