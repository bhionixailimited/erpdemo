import { AddBox, Delete } from "@mui/icons-material";
import { Avatar, Checkbox, Divider, Skeleton } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { ICONS } from "assets";
import { AssignmentIconNew } from "assets/static-icon";
import { ScheduleExamSkeleton } from "components/admin/skeleton";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import Swal from "sweetalert2";
import BranchType from "types/branch";
import CourseType from "types/course";
import ExamType from "types/exam";
import { notify } from "utils";
type dataType = {
  data: ExamType[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};
const ScheduleExam = () => {
  const [examId, setExamId] = useState("");
  const { mutate: exam, loading } = useFetch();
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [examType, setExamType] = useState("");
  const [batchId, setBatchId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [resultPublished, setResultPublished] = useState<boolean>();
  const searchTitle = useDeferredValue(searchText);
  const { push } = useRouter();
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `exam?perPage=20&pageNo=${pageNo}&schedule=true` +
      (searchTitle?.trim() ? `&searchTitle=${searchTitle}` : "") +
      (examType ? `&type=${examType}` : "") +
      (batchId ? `&batchId=${batchId}` : "") +
      (courseId ? `&courseId=${courseId}` : "") +
      (branchId ? `&branchId=${branchId}` : "") +
      (resultPublished !== undefined
        ? `&resultPublished=${resultPublished}`
        : "")
  );

  return (
    <PrivateLayout title="Exam | Schedule">
      <section className="w-full container mx-auto px-2">
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
          {isValidating ? (
            <ScheduleExamSkeleton i={(data?.data && data?.data?.length) || 8} />
          ) : data?.data?.length ? (
            data?.data?.map((item, index) => (
              <div
                className="w-full shadow-lg border border-gray-50 bg-white p-4 flex flex-col gap-4 items-center rounded-xl "
                key={index}
              >
                <Avatar
                  src={AssignmentIconNew.src}
                  className="!p-4 !h-20 !bg-gray-100 !w-20 "
                />
                <h3 className="font-semibold tracking-wide text-lg">
                  {item?.title ? item?.title : "Not Provided"}
                </h3>
                <div className="flex flex-col gap-1 ">
                  <>
                    <small className="font-medium tracking-wide">
                      Start Date -
                      {item?.startDate
                        ? dayjs(item?.startDate).format("ll")
                        : "Not Provided"}
                    </small>
                    <small className="font-medium tracking-wide">
                      End Date -
                      {item?.endDate
                        ? dayjs(item?.endDate).format("ll")
                        : "Not Provided"}
                    </small>
                  </>
                </div>
                <button
                  className="btn-primary"
                  onClick={() =>
                    push(`/panel/admin/exam/schedule/${item?._id}`)
                  }
                >
                  View Details
                </button>{" "}
              </div>
            ))
          ) : (
            <div className="col-span-12">
              <Empty title="No Data Found" />
            </div>
          )}
        </div>
      </section>
    </PrivateLayout>
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

  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    user?.role?.toUpperCase() === "ADMIN"
      ? `batch?course=true&branch=true&session=true&perPage=5&pageNo=${pageNo}`
      : `batch?course=true&branch=true&session=true&perPage=5&pageNo=${pageNo}`
  );
  const { data: course, isValidating: courseLoading } = useSWRFetch<any>(
    `course?perPage=5&pageNo=${coursePageNo}`
  );
  const { data: branch, isValidating: branchLoading } = useSWRFetch<any>(
    `branch?perPage=5&pageNo=${branchPageNo}`
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
                {item?.course?.title}-{item?.branch?.title}-
                {item?.session?.title}
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

export default withProtectedAdmin(ScheduleExam);
