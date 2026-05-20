import { CommonQuestionView, LongAssignment } from "components/common";
import { StudentProfile } from "components/teachers";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { AssignmentType } from "types/assignment";
import BatchType from "types/batch";
import UserType from "types/user";
type dataType = {
  data: AssignmentType;
};
type StudentData = {
  data: {
    applicationNumber: string;
    batch: BatchType;
    enrollmentCode: string;
    registrationNumber: string;
    rollNumber: string;
    student: UserType;
    submissionDate: string;
    totalAnswered: number;
    totalQuestion: number;
    totalMarkAwarded: number;
    remark: string;
  };
};
const AssignmentResult = () => {
  const { assignmentId, studentId } = useRouter()?.query;
  const assignmentDetails = {
    chapter: "New Chapter",
    lastDate: "2nd Jan 2022",
    assignmentName: "Mathematics Assignment",
  };
  //get student details
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    assignmentId && `assignment/stat/${assignmentId}`
  );
  const { data: studentData, isValidating: studentLoading } =
    useSWRFetch<StudentData>(
      assignmentId &&
        studentId &&
        `assignment/details/${assignmentId}/${studentId}`
    );

  return (
    <PrivateLayout title="Student | Assignment">
      <section className="w-full p-4 flex flex-col lg:flex-row ">
        <div className="w-full">
          <CommonQuestionView
            assignmentDetails={{
              totalMark: data?.data?.fullMark,
              lastDate: data?.data?.dueDate,
              assignmentName: data?.data?.title,
              chapter: data?.data?.subject?.title,
              _id: assignmentId,
            }}
            studentId={studentId?.toString()}
            remark={studentData?.data?.remark}
          />
        </div>
        <div className="w-full max-w-md">
          <StudentProfile
            loading={studentLoading}
            displayName={studentData?.data?.student?.displayName}
            email={studentData?.data?.student?.email}
            rollNumber={studentData?.data?.rollNumber}
            batch={studentData?.data?.batch}
            markSecured={studentData?.data?.totalMarkAwarded}
            fullMark={data?.data?.fullMark}
            totalAttempted={studentData?.data?.totalAnswered}
            submissionDate={studentData?.data?.submissionDate}
            photoUrl={studentData?.data?.student?.photoUrl}
          />
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(AssignmentResult);
