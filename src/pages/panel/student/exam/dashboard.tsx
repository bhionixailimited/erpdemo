import {
  ExamOverviewStudent,
  ExamResultStudent,
  ExamStatStudent,
  UpcomingExamsStudent,
} from "components/students/exam";
import withProtectedStudent from "hooks/withStudentProtected";

import { PrivateLayout } from "layouts";

const DashboardExamStudent = () => {
  return (
    <PrivateLayout title="Student Exam | Dashboard">
      <section className="w-full  md:p-6 flex flex-col gap-5">
        <ExamStatStudent />
        <div className="flex flex-col lg:flex-row px-4 gap-3  xl:gap-4 w-full">
          <div className="w-full h-fit md:w-2/3 bg-white shadow-xl rounded-xl border">
            <ExamOverviewStudent />
          </div>
          <div className="w-full md:w-1/3 ">
            <UpcomingExamsStudent />
          </div>
        </div>
        <div className="flex flex-col lg-flex-row px-4 gap-3 xl:gap-4 w-full">
          <div className="w-full h-fit bg-white shadow-xl rounded-xl border">
            <ExamResultStudent />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(DashboardExamStudent);
