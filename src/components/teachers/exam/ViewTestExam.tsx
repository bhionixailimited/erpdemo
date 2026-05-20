import { AddBox } from "@mui/icons-material";
import { Checkbox, Divider, Pagination, Skeleton } from "@mui/material";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import BranchType from "types/branch";
import CourseType from "types/course";
import ExamType from "types/exam";
import ExamCardSkeleton from "./ExamCardSkeleton";
import ViewExamCard from "./ViewExamCard";

type ExamData = {
  data: ExamType[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};

const ViewTestExam = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [examType, setExamType] = useState("");
  const [batchId, setBatchId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [resultPublished, setResultPublished] = useState<boolean>();
  const searchTitle = useDeferredValue(searchText);
  const { push } = useRouter();
  //perPage=20& -- if necessary
  const { data: exam, isValidating: examLoading } = useSWRFetch<ExamData>(
    `exam?pageNo=${pageNo}&schedule=false` +
      (searchTitle?.trim() ? `&searchTitle=${searchTitle}` : "") +
      (examType ? `&type=${examType}` : "") +
      (batchId ? `&batchId=${batchId}` : "") +
      (courseId ? `&courseId=${courseId}` : "") +
      (branchId ? `&branchId=${branchId}` : "") +
      (resultPublished !== undefined
        ? `&resultPublished=${resultPublished}`
        : "")
  );
  const { user } = useAuth();

  return (
    <div className="w-full  p-4">
      <h3 className="font-medium tracking-wide mb-4 text-xl">Exams</h3>
      <div className="w-full  ">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterComp={
            <SearchFilter
              branchId={branchId}
              setBranchId={setBranchId}
              setCourseId={setCourseId}
              courseId={courseId}
              setType={setExamType}
              type={examType}
              batchId={batchId}
              setBatchId={setBatchId}
              resultPublished={resultPublished}
              setResultPublished={setResultPublished}
            />
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {!exam || examLoading ? (
            Array(5)
              .fill(0)
              .map((item, index) => <ExamCardSkeleton key={index} />)
          ) : exam?.data?.length ? (
            exam?.data?.map((item) => (
              <ViewExamCard
                onClick={() =>
                  push(
                    ["ADMIN", "STAFF", "MANAGER", "SUPER_ADMIN"]?.includes(
                      String(user?.role?.toUpperCase())
                    )
                      ? `/panel/admin/exam/${item?._id}`
                      : `/panel/teacher/result/${item?._id}`
                  )
                }
                key={item?._id}
                title={item?.title}
                batch={item?.batch}
                startDate={item?.startDate}
                endDate={item?.endDate}
              />
            ))
          ) : (
            <div className="col-span-12 flex items-center justify-center py-8 ">
              <Empty title="No exam available" />
            </div>
          )}
        </div>
      </div>
      {/* Pagination */}
      {/* <div className="w-full flex items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(exam?.totalCount || 1) / Number(exam?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div> */}
    </div>
  );
};

const SearchFilter = ({
  setBatchId,
  batchId,
  resultPublished,
  setResultPublished,
  type,
  setType,
  setCourseId,
  courseId,
  branchId,
  setBranchId,
}: {
  batchId: string;
  setBatchId: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  resultPublished?: boolean;
  setResultPublished: Dispatch<SetStateAction<boolean | undefined>>;
  courseId?: string;
  setCourseId: Dispatch<SetStateAction<string>>;
  branchId?: string;
  setBranchId: Dispatch<SetStateAction<string>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);

  const { user } = useAuth();
  //perPage=5& ---- if necessasry
  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    user?.role?.toUpperCase() === "TEACHER"
      ? `batch/teacher?pageNo=${pageNo}`
      : `batch?course=true&branch=true&session=true&pageNo=${pageNo}`
  );
  //perPage=5& ---- if necessasry
  const { data: course, isValidating: courseLoading } = useSWRFetch<any>(
    `course?pageNo=${coursePageNo}`
  );
  //perPage=5& ---- if necessasry
  const { data: branch, isValidating: branchLoading } = useSWRFetch<any>(
    `branch?pageNo=${branchPageNo}`
  );

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Batch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {batchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          batch?.data?.map((item: any) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === batchId}
                onClick={() =>
                  setBatchId(item?._id === batchId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.batch?.course?.title || item?.course?.title}-
                {item?.batch?.branch?.title || item?.branch?.title}-
                {item?.batch?.session?.title || item?.session?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setPageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {pageNo}
          </span>
          <button
            disabled={batch?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Course
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {courseLoading ? (
          <Skeleton animation="wave" />
        ) : (
          course?.data?.map((item: CourseType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === courseId}
                onClick={() =>
                  setCourseId(item?._id === courseId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setCoursePageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {coursePageNo}
          </span>
          <button
            disabled={course?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setCoursePageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Branch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {branchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          branch?.data?.map((item: BranchType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === branchId}
                onClick={() =>
                  setBranchId(item?._id === branchId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setBranchPageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {branchPageNo}
          </span>
          <button
            disabled={branch?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setBranchPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter Type
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={type === "ONLINE"}
            onClick={() => setType(type === "ONLINE" ? "" : "ONLINE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Online</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={type === "OFFLINE"}
            onClick={() => setType(type === "OFFLINE" ? "" : "OFFLINE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Offline</h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Result Published
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={resultPublished === true}
            onClick={() =>
              setResultPublished((prev) => (prev ? undefined : true))
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Published</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={resultPublished === false}
            onClick={() =>
              setResultPublished((prev) => (prev === false ? undefined : false))
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Not Published</h3>
        </div>
      </div>
      <Divider />
    </div>
  );
};

export default ViewTestExam;
