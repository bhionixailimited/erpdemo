import MyQueries from "components/apply/registration/student-profile/MyQueries";
import StudentProfileLayout from "layouts/studentProfileLayout";

const Myqueries = () => {
  return (
    <StudentProfileLayout title="My Queries">
      <div className="w-full md:p-4">
        <MyQueries />
      </div>
    </StudentProfileLayout>
  );
};

export default Myqueries;
