import { ExamSummery } from "components/admin";
import { PrivateLayout } from "layouts";

import AdminTestQuestions from "components/admin/exam/AdminTestQuestions";
import { withProtectedAdmin } from "hooks";
const ViewScheduleExam = () => {
  return (
    <PrivateLayout title="Exam | Scheduled">
      <section className="w-full container p-4 mx-auto">
        <ExamSummery />
        <AdminTestQuestions create={false} />
        {/* <ViewExamQuestion /> */}
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(ViewScheduleExam);
