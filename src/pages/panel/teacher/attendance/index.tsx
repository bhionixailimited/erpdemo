import { AttendanceGraph, AttendanceStatCard } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const AttendanceReport = () => {
  return (
    <PrivateLayout title="Teacher | Attendance">
      <section className="px-6">
        <AttendanceStatCard />
        <AttendanceGraph />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(AttendanceReport);
