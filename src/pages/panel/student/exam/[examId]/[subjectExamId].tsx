import {
  ExamBasicInstruction,
  ExamInstruction,
  ExamThankYouPage,
  QuestionAnswerPage,
} from "components/students/exam";
import { useExamData } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { ExamLayout } from "layouts";

const ExamDetails = () => {
  const { examPageNumber } = useExamData();

  return (
    <ExamLayout title="Exam | Student">
      <section className="bg-white w-full min-h-screen p-2 ">
        {examPageNumber === 4 ? (
          <ExamThankYouPage />
        ) : examPageNumber === 3 ? (
          <QuestionAnswerPage />
        ) : examPageNumber === 2 ? (
          <ExamInstruction />
        ) : (
          <ExamBasicInstruction />
        )}
      </section>
    </ExamLayout>
  );
};

export default withProtectedStudent(ExamDetails);
