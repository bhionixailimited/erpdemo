import { AddBox } from "@mui/icons-material";
import {
  Checkbox,
  Dialog,
  Divider,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Skeleton,
} from "@mui/material";
import { Button, Empty } from "components/core";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import BatchType from "types/batch";
import SubjectType from "types/subject";
import SearchBar from "./SearchBar";
import UpdateExamResult from "./UpdateExamResult";
import { notify } from "utils";
import ExamType from "types/exam";
import UserType from "types/user";

type SubjectExamStudentData = {
  data: {
    _id: string;
    batch: BatchType;
    exam: string;
    examSubject: string;
    fullMark: number;
    passMark: number;
    credit: number;
    subject: SubjectType;
    type: string;
    examType: string;
    student: {
      _id: string;
      displayName: string;
      email: string;
      phoneNumber: string;
      photoUrl: string;
      gender: string;
      rollNumber: string;
      registrationNumber: string;
      section: string;
    };
    result: {
      _id: string;
      obtainMark: number;
      remark: string;
      isAttended: boolean;
      markPercentage: number;
    };
  }[];
  isLastChunk: boolean;
  totalCount: number;
  perPage: number;
  pageNo: number;
};

type SubjectExamType = {
  data: {
    _id: string;
    absentStudent: number;
    batch: any;
    createdBy: UserType;
    endTime: string;
    exam: ExamType;
    failStudent: number;
    fullMark: number;
    notPublished: number;
    passMark: number;
    passStudent: number;
    startTime: number;
    subject: SubjectType;
    totalQuestion: number;
    totalStudents: number;
    type: string;
  };
};

const ExamStudents = ({
  canUpdate = true,
  pageType = "exam",
}: {
  canUpdate?: boolean;
  pageType?: "exam" | "result";
}) => {
  const [studentData, setStudentData] = useState<any>();
  const [updateResult, setUpdateResult] = useState<string | boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [openDemoteDialog, setOpenDemoteDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const [pageNo, setPageNo] = useState(1);
  const [type, setType] = useState<boolean | undefined>();
  const [searchTitle, setSearchTitle] = useState("");
  const [gender, setGender] = useState("");

  const { query, push } = useRouter();

  const { subjectExam, examId, subjectExamId } = query;

  const searchText = useDeferredValue(searchTitle);

  const { user } = useAuth();

  const { data: subjectDetails } = useSWRFetch<SubjectExamType>(
    ["ADMIN", "SUPER_ADMIN", "MANAGER", "STAFF", "TEACHER"]?.includes(
      String(user?.role?.toUpperCase())
    )
      ? subjectExamId && `exam/subject/details/${subjectExamId}`
      : subjectExam && `exam/subject/details/${subjectExam}`
  );

  const { data: batchData } = useSWRFetch<{ data: BatchType }>(
    `batch/${subjectDetails?.data?.batch?._id}`
  );

  const { mutate: fetch } = useFetch();

  //get exam student data
  const {
    data: student,
    isValidating,
    mutate,
  } = useSWRFetch<SubjectExamStudentData>(
    ["ADMIN", "SUPER_ADMIN", "MANAGER", "STAFF", "TEACHER"]?.includes(
      String(user?.role?.toUpperCase())
    )
      ? subjectExamId &&
          `exam/student-attended/${subjectExamId}?perPage=10&pageNo=${pageNo}` +
            (searchText ? `&searchTitle=${searchText}` : "") +
            (type !== undefined ? `&type=${type}` : "") +
            (gender ? `&gender=${gender}` : "")
      : subjectExam &&
          `exam/student-attended/${subjectExam}?perPage=10&pageNo=${pageNo}` +
            (searchText ? `&searchTitle=${searchText}` : "") +
            (type !== undefined ? `&type=${type}` : "") +
            (gender ? `&gender=${gender}` : "")
  );

  const handleClick = async (studentId: string) => {
    try {
      const response = await fetch({
        path: `student/academic/${studentId}`,
        method: "POST",
        body: JSON.stringify({
          promotedClass: selectedSection,
        }),
      });

      if (response?.status !== 200) throw new Error(response?.data?.message);

      notify.success("Student updated successfully");
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong!"
      );
    } finally {
      setOpenDialog(false);
      setSelectedStudent("");
      setSelectedSection("");
    }
  };

  return (
    <div className="w-full">
      <UpdateExamResult
        open={Boolean(updateResult)}
        closeFn={() => setUpdateResult(false)}
        examSubjectId={subjectExamId ? subjectExamId : subjectExam}
        studentData={studentData}
        reload={mutate}
      />
      <SearchBar
        searchText={searchTitle}
        setSearchText={setSearchTitle}
        filterComp={
          <FilterComp
            gender={gender}
            setGender={setGender}
            type={type}
            setType={setType}
          />
        }
      />
      <div className="grid grid-cols-1 py-4 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {!student || isValidating ? (
          Array(5)
            .fill(0)
            .map((item, index) => (
              <div
                className="w-full bg-white shadow-xl rounded-lg  hover:cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out transition-all "
                key={index}
              >
                <div className="flex items-center gap-4 border-b p-4 ">
                  <div className="flex items-center h-20 !w-20 overflow-hidden rounded-full shadow-xl justify-center">
                    <Skeleton
                      animation="wave"
                      variant="circular"
                      height={80}
                      width={80}
                    />
                  </div>
                  <div className="flex flex-col gap-1 items-start">
                    <h3 className="font-semibold text-base tracking-wide">
                      <Skeleton animation="wave" variant="text" width={180} />
                    </h3>
                    <small className="text-gray-600 font-medium ">
                      <Skeleton animation="wave" variant="text" width={200} />
                    </small>
                    <small className="text-gray-600 font-medium ">
                      <Skeleton animation="wave" variant="text" width={200} />
                    </small>
                  </div>
                </div>
                <div className="w-full p-4">
                  <h3 className="text-theme font-semibold mb-2 tracking-wide">
                    <Skeleton animation="wave" variant="text" width={50} />
                  </h3>

                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-sm tracking-wide">
                      <Skeleton animation="wave" variant="text" width={200} />
                    </h3>
                    <h3 className="font-medium text-sm tracking-wide">
                      <Skeleton animation="wave" variant="text" width={200} />
                    </h3>
                  </div>
                </div>
                <div className="flex items-center pb-4 justify-center">
                  <Skeleton
                    animation="wave"
                    variant="rounded"
                    width={100}
                    height={30}
                  />
                </div>
              </div>
            ))
        ) : student?.data?.length ? (
          student?.data?.map((item) => (
            <div
              className="w-full bg-white shadow-xl rounded-lg  hover:cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out transition-all "
              key={item?.student?._id}
            >
              <div className="flex items-center gap-4 border-b p-4 ">
                <div
                  className="flex items-center h-20 !w-20 overflow-hidden rounded-full shadow-xl justify-center"
                  onClick={() =>
                    push(
                      `/panel/${
                        user?.role === "TEACHER" ? "teacher" : "admin"
                      }/${
                        user?.role === "ADMIN" ? "exam" : pageType
                      }/${examId}/${
                        subjectExamId ? subjectExamId : subjectExam
                      }/${item?.student?._id}`
                    )
                  }
                >
                  <img
                    src={item?.student?.photoUrl || "/static/student.png"}
                    alt="Certificate icon"
                    className=" h-12 !w-12 object-contain   "
                    loading="lazy"
                  />
                </div>
                <div className="flex flex-col gap-1 items-start">
                  <h3 className="font-semibold text-base tracking-wide">
                    {item?.student?.displayName}
                  </h3>
                  <small className="text-gray-600 font-medium ">
                    Reg No -{" "}
                    {item?.student?.registrationNumber || "Unavailable"}
                  </small>
                  <small className="text-gray-600 font-medium ">
                    Roll No - {item?.student?.rollNumber || "Unavailable"}
                  </small>
                </div>
              </div>
              <div className="w-full p-4">
                <h3 className="text-theme font-semibold mb-2 tracking-wide">
                  Overview -
                </h3>
                {item?.result?.isAttended ? (
                  <div className="flex flex-col gap-1">
                    <h3 className="font-medium text-sm tracking-wide">
                      Result - {item?.result?.obtainMark}/{item?.fullMark}
                    </h3>
                    <h3 className="font-medium text-sm tracking-wide">
                      Percentage -{" "}
                      {(item?.result?.markPercentage &&
                        item?.result?.markPercentage?.toFixed(1)) ??
                        0}{" "}
                      %
                    </h3>
                  </div>
                ) : (
                  <h3 className="font-medium text-themeSecondary text-sm tracking-wide">
                    Not Attended
                  </h3>
                )}
              </div>
              {canUpdate && (
                <div className="flex flex-col gap-2 px-4">
                  <div className="flex items-center gap-4 pb-4 justify-center">
                    <Button
                      onClick={() => {
                        setUpdateResult(item?.student?._id);
                        setStudentData(item);
                      }}
                      className="!text-sm"
                    >
                      Update Result
                    </Button>
                    <Button
                      className="hover:!ring-blue-500 !text-sm !bg-blue-500 "
                      onClick={() => {
                        push(
                          `/panel/${
                            user?.role === "TEACHER" ? "teacher" : "admin"
                          }/${
                            user?.role === "ADMIN" ? "exam" : pageType
                          }/${examId}/${
                            subjectExamId ? subjectExamId : subjectExam
                          }/${item?.student?._id}`
                        );
                      }}
                    >
                      View Student
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="w-full flex items-center justify-center col-span-4">
            <Empty title="No student available" />
          </div>
        )}
      </div>
      <div className="w-full flex items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(student?.totalCount || 1) / Number(student?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div>
    </div>
  );
};

export default ExamStudents;

const FilterComp = ({
  gender,
  setGender,
  type,
  setType,
}: {
  setGender?: Dispatch<SetStateAction<string>>;
  gender?: string;
  type?: boolean;
  setType?: Dispatch<SetStateAction<boolean | undefined>>;
}) => {
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Gender
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "MALE"}
            onClick={() => setGender?.(gender === "MALE" ? "" : "MALE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Male</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "FEMALE"}
            onClick={() => setGender?.(gender === "FEMALE" ? "" : "FEMALE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Female</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "OTHER"}
            onClick={() => setGender?.(gender === "OTHER" ? "" : "OTHER")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Other</h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Attendance
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={type === true}
            onClick={() => setType?.(type === true ? undefined : true)}
          />
          <h3 className="font-medium  tracking-wide text-sm">Attended</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={type === false}
            onClick={() => setType?.(type === false ? undefined : false)}
          />
          <h3 className="font-medium  tracking-wide text-sm">Not Attended</h3>
        </div>
      </div>
      <Divider />
    </div>
  );
};
