import { StaffAttendanceReport } from "components/admin";
import { SearchBar } from "components/common";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const StaffAttendance = () => {
  return (
    <div className="w-full">
      <PrivateLayout title="Staff | Attendance">
        <section className="w-full p-4">
          <h3 className="font-medium tracking-wide bg-white shadow-xl mb-4 rounded-lg text-theme  text-2xl p-4">
            Staff Attendance
          </h3>

          <StaffAttendanceReport />
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(StaffAttendance);
