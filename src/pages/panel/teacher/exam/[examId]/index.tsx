import { Add } from "@mui/icons-material";
import { Divider, IconButton } from "@mui/material";
import { AllExamSubject } from "components/common";
import { TeacherCreatedExam } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";

const ViewAllExam = () => {
  const { push, query } = useRouter();

  const { examId } = query;

  return (
    <PrivateLayout title="View | Exam">
      <section className="container mx-auto">
        <h3 className="font-semibold tracking-wide text-xl mt-8 py-4 text-theme w-full  border-b border-theme/20 ">
          All Exams
        </h3>
        <div className="flex  flex-col">
          <h3 className="font-semibold tracking-wide text-xl mt-8 ">
            Your Exams
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
            <div className="w-full flex shadow-lg border-b-8 border-t-8 border-theme bg-white p-4 justify-center gap-4 items-center rounded-xl ">
              <IconButton
                onClick={() =>
                  push(`/panel/teacher/exam/view/${examId}/create`)
                }
              >
                <Add className="text-7xl text-theme" />
              </IconButton>
            </div>
            <TeacherCreatedExam />
          </div>
          <Divider />
          <h3 className="font-semibold tracking-wide text-xl mt-4 ">
            All Subjects
          </h3>
          <AllExamSubject />
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ViewAllExam);
