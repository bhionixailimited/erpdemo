import ChangePassword from "components/apply/registration/student-profile/ChangePassword";
import MyPayments from "components/apply/registration/student-profile/MyPayments";
import StudentProfileLayout from "layouts/studentProfileLayout";

const Changepassword = () => {
  return (
    <StudentProfileLayout title="Change Password">
      <div className="w-full md:p-4">
        <ChangePassword />
      </div>
    </StudentProfileLayout>
  );
};

export default Changepassword;
