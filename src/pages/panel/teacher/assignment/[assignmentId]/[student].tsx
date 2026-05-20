import { Logout } from "@mui/icons-material";
import { CommonQuestionView } from "components/common";
import { Button } from "components/core";
import { StudentProfile } from "components/teachers";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
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
  const { push, query } = useRouter();
  const { assignmentId, student } = query;
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    assignmentId && `assignment/stat/${assignmentId}`
  );

  const { user } = useAuth();

  //get student details

  const { data: studentData, isValidating: studentLoading } =
    useSWRFetch<StudentData>(
      assignmentId && student && `assignment/details/${assignmentId}/${student}`
    );

  return (
    <PrivateLayout title="Student | Assignment">
      <section className="w-full p-4 flex flex-col-reverse lg:flex-row ">
        <div className="w-full">
          <CommonQuestionView
            assignmentDetails={{
              totalMark: data?.data?.fullMark,
              lastDate: data?.data?.dueDate,
              assignmentName: data?.data?.title,
              chapter: data?.data?.subject?.title,
              _id: assignmentId,
            }}
            studentId={student?.toString()}
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
          <div className="w-full flex py-6 items-center justify-center">
            <Button
              className="hover:!ring-red-500 bg-red-500 "
              startIcon={<Logout />}
              onClick={() => {
                push(
                  `/panel/${
                    user?.role === "TEACHER" ? "teacher" : "admin"
                  }/assignment/${assignmentId}`
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

export default withProtectedTeacher(AssignmentResult);
