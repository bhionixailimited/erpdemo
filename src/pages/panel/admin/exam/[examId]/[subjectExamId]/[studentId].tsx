// import { ExamAnswerView, ExamStudentDetails } from "components/common";
// import { useSWRFetch, withProtectedAdmin } from "hooks";
// import { PrivateLayout } from "layouts";
// import { useRouter } from "next/router";
// import BatchType from "types/batch";
// import { ExamSubjectType } from "types/examSubject";

// type StudentSubjectData = {
//   data: {
//     _id: string;
//     batch: BatchType;
//     displayName: string;
//     email: string;
//     enrollmentCode: string;
//     gender: string;
//     photoUrl: string;
//     registrationNumber: string;
//     rollNumber: string;
//     subjectExam: ExamSubjectType;
//     totalAnswered: number;
//     totalMarkAwarded: number;
//     totalQuestions: number;
//   };
// };

// const StudentExam = () => {
//   const { query } = useRouter();

//   const { studentId, subjectExamId } = query;

//   //get student exam details

//   const { data: studentDetails, isValidating: studentDetailsLoading } =
//     useSWRFetch<StudentSubjectData>(
//       studentId &&
//         subjectExamId &&
//         `exam/subject-wise/${subjectExamId}/${studentId}`
//     );

//   return (
//     <PrivateLayout title="Student | Exam">
//       <section className="w-full p-4 flex flex-col lg:flex-row ">
//         <div className="w-full">
//           <ExamAnswerView
//             student={studentId?.toString()}
//             subjectExam={subjectExamId?.toString()}
//           />
//         </div>
//         <div className="w-full max-w-md">
//           <ExamStudentDetails
//             loading={studentDetailsLoading}
//             displayName={studentDetails?.data?.displayName}
//             email={studentDetails?.data?.email}
//             rollNumber={studentDetails?.data?.rollNumber}
//             batch={studentDetails?.data?.batch}
//             markSecured={studentDetails?.data?.totalMarkAwarded}
//             fullMark={studentDetails?.data?.subjectExam?.fullMark}
//             totalAttempted={studentDetails?.data?.totalAnswered}
//             totalQuestions={studentDetails?.data?.totalQuestions}
//             photoUrl={studentDetails?.data?.photoUrl}
//           />
//         </div>
//       </section>
//     </PrivateLayout>
//   );
// };

// export default withProtectedAdmin(StudentExam);

import { ExamAnswerView, ExamStudentDetails } from "components/common";
import { useSWRFetch, withProtectedAdmin } from "hooks";

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
  const { query } = useRouter();

  const { studentId, subjectExamId } = query;

  //get student exam details

  const { data: studentDetails, isValidating: studentDetailsLoading } =
    useSWRFetch<StudentSubjectData>(
      studentId &&
        subjectExamId &&
        `exam/subject-wise/${subjectExamId}/${studentId}`
    );

  return (
    <PrivateLayout title="Student | Exam">
      <section className="w-full p-4 flex flex-col-reverse lg:flex-row ">
        <div className="w-full">
          <ExamAnswerView
            student={studentId?.toString()}
            subjectExam={subjectExamId?.toString()}
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
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(StudentExam);
