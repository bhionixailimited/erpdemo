import { Logout } from "@mui/icons-material";
import { ExamAnswerView, ExamStudentDetails } from "components/common";
import { Button } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import BatchType from "types/batch";
import { ExamSubjectType } from "types/examSubject";

type StudentSubjectData = {
  data: {
    _id: string;
    batch: BatchType;
    displayName: string;
    email: string;
    enrollmentCode: string;
    gender: string;
    photoUrl: string;
    registrationNumber: string;
    rollNumber: string;
    subjectExam: ExamSubjectType;
    totalAnswered: number;
    totalMarkAwarded: number;
    totalQuestions: number;
  };
};

const StudentExam = () => {
  const { query, push } = useRouter();

  const { student, subjectExam, examId } = query;

  const { user } = useAuth();

  //get student exam details

  const { data: studentDetails, isValidating: studentDetailsLoading } =
    useSWRFetch<StudentSubjectData>(
      student && subjectExam && `exam/subject-wise/${subjectExam}/${student}`
    );

  return (
    <PrivateLayout title="Student | Exam">
      <section className="w-full p-4 flex flex-col-reverse lg:flex-row ">
        <div className="w-full">
          <ExamAnswerView
            student={student?.toString()}
            subjectExam={subjectExam?.toString()}
          />
        </div>
        <div className="w-full max-w-md">
          <ExamStudentDetails
            loading={studentDetailsLoading}
            displayName={studentDetails?.data?.displayName}
            email={studentDetails?.data?.email}
            rollNumber={studentDetails?.data?.rollNumber}
            batch={studentDetails?.data?.batch}
            markSecured={studentDetails?.data?.totalMarkAwarded}
            fullMark={studentDetails?.data?.subjectExam?.fullMark}
            totalAttempted={studentDetails?.data?.totalAnswered}
            totalQuestions={studentDetails?.data?.totalQuestions}
            photoUrl={studentDetails?.data?.photoUrl}
          />
          <div className="w-full flex py-6 items-center justify-center">
            <Button
              className="hover:!ring-red-500 bg-red-500 "
              startIcon={<Logout />}
              onClick={() => {
                push(
                  `/panel/${
                    user?.role === "TEACHER" ? "teacher" : "admin"
                  }/exam/${examId}/${subjectExam}`
                );
              }}
            >
              Exit to overview
            </Button>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(StudentExam);
