import { AssignmentBG } from "assets/backgrounds";
import {
  RecentExam,
  RecentExamResult,
  ViewExam,
} from "components/students/exam";
import { useAuth } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useEffect } from "react";

const ExamStudent = () => {
  const { user } = useAuth();

  const { query } = useRouter();

  useEffect(() => {
    (() => {
      if (!query?.reload) return;

      window.location.reload();

      window.location.href = "/panel/student/exam";
    })();
  }, [query?.reload]);

  return (
    <PrivateLayout title="Exam | Student">
      <div className="w-full bg-white md:p-6 flex flex-col gap-8">
        <div
          style={{
            backgroundImage: `url(${AssignmentBG.src})`,
            backgroundPosition: "top",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
          }}
          className="w-full hidden md:flex h-48 rounded-xl"
        >
          <div className="w-full h-full bg-[#0000005e] rounded-xl flex items-center justify-center flex-col">
            <h1 className="text-white font-bold text-4xl">
              Hi {user?.displayName}
            </h1>
            <p className="text-white font-semibold text-xl">
              Your next exam is coming up be ready.
            </p>
          </div>
        </div>
        <div className="w-full bg-white grid justify-between grid-cols-6 md:grid-cols-12 gap-6">
          <RecentExam />
          <RecentExamResult />
        </div>
        <ViewExam />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedStudent(ExamStudent);
