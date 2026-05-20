import {
  AttendanceGraphStudent,
  AttendanceStatsCardStudent,
} from "components/students";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";

const Dashboard = () => {
  return (
    <PrivateLayout title="Student | Attendance Dashboard">
      <section className="p-6">
        <AttendanceStatsCardStudent />
        <AttendanceGraphStudent />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(Dashboard);
