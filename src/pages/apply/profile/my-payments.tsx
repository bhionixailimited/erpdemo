import MyPayments from "components/apply/registration/student-profile/MyPayments";
import StudentProfileLayout from "layouts/studentProfileLayout";

const Mypayments = () => {
  return (
    <StudentProfileLayout title="My Payments">
      <div className="w-full md:p-4">
        <MyPayments />
      </div>
    </StudentProfileLayout>
  );
};

export default Mypayments;
