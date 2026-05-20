import {
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
} from "@mui/material";
import { StudentLibraryCard } from "components/cards";
import { SearchBar } from "components/common";
import { useAuth, useSWRFetch } from "hooks";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import UserType from "types/user";
import { MoneyFormat, downloadFile, notify } from "utils";
import { StudentSkeleton } from "./skeleton";
import { AddBox, Download } from "@mui/icons-material";
import CourseType from "types/course";
import BranchType from "types/branch";
import { Empty } from "components/core";

type dataType = {
  data: {
    _id: string;
    user: UserType;
    totalBookIssue: number;
    totalFinePending: number;
    totalReturnedBook: number;
  }[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const StudentBookIssue = () => {
  const [pageNo, setPageNo] = useState(1);
  const [downloadType, setDownloadType] = useState("excel");
  const [completed, setCompleted] = useState<boolean>();
  const [batchId, setBatchId] = useState("");
  const [courseId, setCourseId] = useState("");
  const [branchId, setBranchId] = useState("");
  const [resultPublished, setResultPublished] = useState<boolean>();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);

  const { data, isValidating } = useSWRFetch<dataType>(
    `library/student?perPage=15&pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "") +
      (batchId ? `&session=${batchId}` : "") +
      (courseId ? `&course=${courseId}` : "") +
      (branchId ? `&branch=${branchId}` : "")
  );
  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) || 12
  );
  // console.log(data);
  return (
    <>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchTitle}
        filterComp={
          (
            <SearchFilter
              branchId={branchId}
              setBranchId={setBranchId}
              setCourseId={setCourseId}
              courseId={courseId}
              setType={setDownloadType}
              type={downloadType}
              batchId={batchId}
              setBatchId={setBatchId}
              resultPublished={resultPublished}
              setResultPublished={setResultPublished}
              completed={completed}
              setCompleted={setCompleted}
            />
          ) || undefined
        }
        exportComp={
          (
            <ExportData
              setType={setDownloadType}
              type={downloadType}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              selectedRange={selectedRange as number}
              setSelectedRange={setSelectedRange}
              totalStudents={data?.totalCount}
              batchId={batchId}
              courseId={courseId}
              branchId={branchId}
              searchTitle={searchTitle}
              pageNo={pageNo}
            />
          ) || undefined
        }
      />
      {isValidating ? (
        <div className="w-full grid grid-cols-12 pt-4 gap-5 ">
          <StudentSkeleton i={12} />
        </div>
      ) : (
        <div className="w-full grid grid-cols-1 md:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
          {data?.data?.length ? (
            data?.data?.map((item) => (
              <StudentLibraryCard
                key={item?._id}
                name={item?.user?.displayName}
                reg={item?.user?.academicDetails?.registrationNumber}
                studentId={item?.user?._id}
                batch={
                  item?.user?.batch
                    ? `${item?.user?.batch?.course?.title} ${item?.user?.batch?.branch?.title} ${item?.user?.batch?.session?.title}`
                    : ""
                }
                email={item?.user?.email}
                phoneNumber={item?.user?.phoneNumber}
                totalBookIssue={item?.totalBookIssue}
                totalFine={MoneyFormat(item?.totalFinePending)}
                returned={item?.totalReturnedBook}
                photoUrl={item?.user?.photoUrl}
              />
            ))
          ) : (
            <div className="col-span-12">
              <Empty title={"No Data Found"} />
            </div>
          )}
        </div>
      )}
      <div className="w-full flex items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(data?.totalCount || 1) / Number(data?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div>
    </>
  );
};

export default StudentBookIssue;

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

  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    `session?perPage=5&pageNo=${pageNo}`
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
      {/* <Divider />
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
      </div> */}

      {/* <Divider /> */}
    </div>
  );
};
const exportFields = [
  { key: "displayName", value: "Display Name" },
  { key: "email", value: "Email." },
  { key: "phoneNumber", value: "Phone Number" },
  { key: "gender", value: "Gender" },
  // { key: "instituteId", value: "Institute Id" },
  { key: "rollNumber", value: "Roll Number" },
  // { key: "enrollmentCode", value: "Enrollment Code" },
  { key: "libraryCardNumber", value: "Library Card Number" },
  { key: "section", value: "section" },
  { key: "branch", value: "branch" },
  { key: "course", value: "course" },
  { key: "session", value: "session" },
  { key: "totalBookIssue", value: "Total Book Issue" },
  { key: "totalReturnedBook", value: "Total Returned Book" },
  { key: "totalFinePending", value: "Total Fine Pending" },
];
const downloadType = ["pdf", "csv", "excel"];

const ExportData = ({
  type,
  setType,
  selectedValues,
  setSelectedValues,
  selectedRange,
  setSelectedRange,
  totalStudents,
  courseId,
  branchId,
  batchId,
  pageNo,
  searchTitle,
  studentType,
}: {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedRange?: Number;
  setSelectedRange: Dispatch<SetStateAction<Number>>;
  totalStudents?: number;
  courseId?: string;
  branchId?: string;
  batchId?: string;
  pageNo?: number;
  searchTitle?: string;
  studentType?: string;
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];
  const handleCheckboxClick = (itemId: string) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(itemId)) {
        // Deselect the checkbox if it was already selected
        return prevValues.filter((value) => value !== itemId);
      } else {
        if (type === "pdf" && prevValues?.length > 3) {
          notify.error("A maximum of 3 field can be choose in PDF type.");
          return prevValues;
        }

        // Select the checkbox if it was not already selected
        return [...prevValues, itemId];
      }
    });
  };
  const handleSelectAllClick = () => {
    if (selectAll) {
      // Deselect all checkboxes if "Select All" is currently checked
      setSelectedValues([]);
      setSelectAll(false);
    } else if (!selectAll && type === "pdf") {
      notify.error("A maximum of 3 field can be choose in PDF type.");
    } else {
      // Select all checkboxes if "Select All" is currently unchecked
      const allItemIds = exportFields.map((item) => item?.key);
      setSelectedValues(allItemIds);
      setSelectAll(true);
    }
  };
  const valuetext = (value: number) => {
    return `${value}`;
  };
  const valueLabelFormat = (value: number) => {
    return value.toString();
  };

  const handleExportData = () => {
    if (type === "pdf" && selectedValues && selectedValues?.length > 3) {
      notify.error("Can't select all the field in pdf type.");
      return;
    }
    downloadFile({
      method: "GET",
      type: type as any,
      url:
        `library/student/export?perPage=${selectedRange}&pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "") +
        (batchId ? `&session=${batchId}` : "") +
        (courseId ? `&course=${courseId}` : "") +
        (branchId ? `&branch=${branchId}` : "") +
        (downloadType ? `&downloadType=${type}` : "") +
        (selectedValues?.length
          ? selectedValues?.reduce((acc, item) => {
              return acc + `&fields=${item}`;
            }, ``)
          : ""),
    });
  };

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <div className="flex items-center py-4 gap-4 justify-between">
        <div className="flex gap-1">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose fields to export
          </h3>
        </div>
        <Button
          disabled={!selectedValues?.length || !type?.length}
          startIcon={<Download />}
          onClick={handleExportData}
        >
          Generate
        </Button>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={selectAll}
            onClick={handleSelectAllClick}
            color="primary"
          />
          <h3 className="font-semibold tracking-wide text-sm text-theme">
            Select All
          </h3>
        </div>
        {exportFields?.map((item: any) => (
          <div key={item?._id} className="flex items-center gap-4">
            <Checkbox
              size="small"
              // checked={item?._id === batchId}
              checked={selectedValues?.includes(item?.key)}
              onClick={() => handleCheckboxClick(item?.key)}
            />
            <h3 className="font-medium  tracking-wide text-sm ">
              {item?.value}
            </h3>
          </div>
        ))}

        <div className="flex items-center pt-4 px-2 gap-2">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose export type *
          </h3>
        </div>
        <div className="w-full flex px-3.5 gap-2  pb-2">
          <RadioGroup
            name="downloadType"
            value={type}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setType(event.target.value);
            }}
            row
          >
            {downloadType.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center pt-4 px-2 gap-2">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose Range *
          </h3>
        </div>
        <div className="w-full flex px-5 pt-2 gap-2  pb-4">
          <Slider
            aria-label="Always visible"
            defaultValue={500}
            value={selectedRange as number}
            valueLabelFormat={valueLabelFormat}
            marks={marks}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            min={0}
            max={totalStudents}
            onChange={(event: Event, value: number | number[]) => {
              setSelectedRange(value as number);
            }}
            className="animate-slide"
          />
        </div>
      </div>
      {/* <Divider />
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
      </div> */}
      {/* <Divider />
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
      </div> */}

      {/* <Divider /> */}
    </div>
  );
};
