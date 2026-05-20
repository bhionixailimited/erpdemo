import { AddBox } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
  Pagination,
  Skeleton,
  TextField,
} from "@mui/material";
import { StudentSkeleton } from "components/admin/skeleton";
import { BatchCard, SearchBar } from "components/common";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { PrivateLayout } from "layouts";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import BatchType from "types/batch";
import BranchType from "types/branch";
import CourseType from "types/course";

type batchType = {
  data:
    | BatchType[]
    | {
        batch: BatchType;
        _id: string;
      }[];
  totalCount?: number;
  perPage?: number;
};
type batchDataType = {
  data: {
    batch: BatchType;
    _id: string;
  }[];
  totalCount?: number;
  perPage?: number;
};
const BatchList = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchTitle = useDeferredValue(searchText?.trim());
  const [examType, setExamType] = useState("");
  const [completed, setCompleted] = useState<boolean>();
  // const [batchIds, setBatchIds] = useState<string[]>([]);
  const [batchId, setBatchId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [resultPublished, setResultPublished] = useState<boolean>();
  const { user } = useAuth();
  //perPage=10& -- if necessary
  const {
    data: batch,
    isValidating,
    mutate,
  } = useSWRFetch<batchDataType | batchType>(
    user?.role === "TEACHER"
      ? `batch/teacher?pageNo=${pageNo}` +
          (completed ? `&isBatchCompleted=${completed}` : "")
      : `batch?course=true&branch=true&session=true&pageNo=${pageNo}` +
          (completed ? `&isBatchCompleted=${completed}` : "") +
          // (batchIds ? `&sessionId=${batchIds}` : "") +
          (batchId ? `&sessionId=${batchId}` : "") +
          (courseId ? `&courseId=${courseId}` : "") +
          (branchId ? `&branchId=${branchId}` : "") +
          (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );

  return (
    <PrivateLayout title={`${user?.role} | Batch`}>
      <section className="w-full bg-gray-50 p-4 ">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          filterComp={
            (
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
                completed={completed}
                setCompleted={setCompleted}
              />
            ) || undefined
          }
        />
        {!batch || isValidating ? (
          <div className="w-full grid grid-cols-3 md:grid-cols-9 lg:grid-cols-12  gap-4">
            <StudentSkeleton i={8} />
          </div>
        ) : (
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mt-4 gap-4">
            {batch?.data?.length ? (
              batch?.data?.map((item: any) => (
                <BatchCard
                  key={item?._id}
                  data={user?.role === "TEACHER" ? item?.batch : item}
                  mutate={mutate}
                />
              ))
            ) : (
              <div className="w-full col-span-12 flex items-center justify-center">
                <Empty title="No batch found" />
              </div>
            )}
          </div>
        )}
        {/* ------------------------Pagination--------------------- */}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(
              Number(batch?.totalCount || 1) / Number(batch?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </section>
    </PrivateLayout>
  );
};

export default withTeacherAdminProtected(BatchList);
const SearchFilter = ({
  setCompleted,
  completed,
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
  completed?: boolean;
  setCompleted: Dispatch<SetStateAction<boolean | undefined>>;
  courseId?: string;
  setCourseId: Dispatch<SetStateAction<string>>;
  branchId?: string;
  setBranchId: Dispatch<SetStateAction<string>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);

  const { user } = useAuth();
  //------------------------ filter by batch session-----------------------
  //perPage=5& -- if needed
  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    `session?pageNo=${pageNo}`
  );
  const [selectedBatchSessionItem, setSelectedBatchSessionItem] =
    useState<string>("");
  const handleBatchSession = (event: React.SyntheticEvent, value: any) => {
    setSelectedBatchSessionItem(value);
    setBatchId && setBatchId(value?._id);
  };
  //------------------------ filter by Course-----------------------
  //perPage=5& -- if needed
  const { data: course, isValidating: courseLoading } = useSWRFetch<any>(
    `course?pageNo=${coursePageNo}`
  );
  const [selectCourseItem, setSelectCourseItem] = useState<string>("");
  const handleCourse = (event: React.SyntheticEvent, value: any) => {
    setSelectCourseItem(value);
    setCourseId && setCourseId(value?._id);
  };
  //------------------------ filter by Branch-----------------------
  //perPage=5  -- if needed
  const { data: branch, isValidating: branchLoading } = useSWRFetch<any>(
    `branch?pageNo=${branchPageNo}`
  );
  const [selectBranchItem, setSelectBranchItem] = useState<string>("");
  const handleBranch = (event: React.SyntheticEvent, value: any) => {
    // console.log("value-->", value);
    setSelectBranchItem(value);
    setBranchId && setBranchId(value?._id);
  };

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* ---------------------Filter By Batch Session autocomplete-------------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Batch Session
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          // multiple
          id="batchSession-filter"
          options={batch?.data || []}
          value={selectedBatchSessionItem || null}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleBatchSession}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Batch Session"
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: option?._id })} // Use the ID as the index
                key={option?._id}
              />
            ))
          }
        />
      </div>
      {/* ---------------------Filter By Batch Session autocomplete-------------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Course
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          // multiple
          id="batchSession-filter"
          options={course?.data || []}
          value={selectCourseItem || null}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleCourse}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Course"
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: option?._id })} // Use the ID as the index
                key={option?._id}
              />
            ))
          }
        />
      </div>
      {/* ---------------------Filter By Branch autocomplete-------------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Branch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          // multiple
          id="batchSession-filter"
          options={branch?.data || []}
          value={selectBranchItem || null}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleBranch}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Branch"
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: option?._id })} // Use the ID as the index
                key={option?._id}
              />
            ))
          }
        />
      </div>
      {/*---------------------------- Filter By Status -----------------------------*/}
      {/* <Divider /> */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Status
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={completed === false}
            onClick={() =>
              setCompleted((prev) => (prev === false ? undefined : false))
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Ongoing</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={completed === true}
            onClick={() => setCompleted((prev) => (prev ? undefined : true))}
          />
          <h3 className="font-medium  tracking-wide text-sm">Completed</h3>
        </div>
      </div>
      <Divider />
      {/* ---------------------Filter By Batch Session autocomplete ended-------------------------- */}
      {/* <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Session
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
                {item?.title}
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
      </div> */}
      {/* <Divider /> */}
      {/* <div className="flex items-center py-4 gap-4">
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
      </div> */}
      {/* <Divider /> */}
      {/* <div className="flex items-center py-4 gap-4">
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
      </div> */}
    </div>
  );
};
