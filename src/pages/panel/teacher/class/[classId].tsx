import { ClassAttendanceReport, ClassDetails } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useState } from "react";

const ClassAttendance = () => {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <PrivateLayout title="Class | Attendance">
      <section className="w-full p-4 ">
        <ClassDetails reload={handleReload} />

        <ClassAttendanceReport reload={reload} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ClassAttendance);
