import {
  ExamByResult,
  ExamCountGraph,
  ExamStat,
  ExamType,
} from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const DashboardExam = () => {
  return (
    <PrivateLayout title="Exam | Dashboard">
      <section className="w-full p-2 md:p-6">
        <ExamStat />
        <div className="flex flex-col lg:flex-row px-4 gap-4  xl:gap-6 w-full">
          <div className="w-full lg:w-1/4 2xl:w-1/5 bg-white shadow-xl rounded-xl border   ">
            <ExamType />
          </div>
          <div className="w-full lg:w-1/4 2xl:w-1/5 bg-white shadow-xl rounded-xl border">
            <ExamByResult />
          </div>
          <div className=" w-full lg:w-2/4 2xl:w-3/5 bg-white shadow-xl rounded-xl border ">
            <ExamCountGraph />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(DashboardExam);
