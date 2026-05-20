import { AddBox, Sort } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { ClassCard, SearchBar } from "components/common";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import BranchType from "types/branch";
import CourseType from "types/course";
import SubjectType from "types/subject";

type UpcomingTimetableTypes = {
  data: any[];
};

const Class = () => {
  const [batch, setBatchId] = useState("");
  const [course, setCourseId] = useState("");
  const [branch, setBranchId] = useState("");
  const [subject, setSubjectId] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [type, setType] = useState("");
  const { push } = useRouter();

  const { user } = useAuth();

  const [searchText, setSearchText] = useState("");

  const { data, isValidating } = useSWRFetch<UpcomingTimetableTypes>(
    user?._id &&
      `teacher/class/${user?._id}` +
        (searchText?.trim()?.length ? `?searchTitle=${searchText}&` : "?") +
        (sortBy ? `sortBy=${sortBy}&` : "") +
        (subject ? `subject=${subject}&` : "") +
        (branch ? `branch=${branch}&` : "") +
        (course ? `course=${course}&` : "") +
        (batch ? `batch=${batch}&` : "") +
        (type ? `type=${type}&` : "")
  );

  const csvData = useMemo(() => {
    const keys = [
      "batch",
      "course",
      "session",
      "branch",
      "subject",
      "class room",
      "start time",
      "end time",
      "type",
    ];

    return [
      keys,
      ...(data?.data?.map((item) => {
        return [
          item?.batch?._id,
          item?.batch?.course?.title,
          item?.batch?.session?.title,
          item?.batch?.branch?.title,
          item?.subject?.title,
          item?.classRoom,
          new Date(item?.startTime).toLocaleString(),
          new Date(item?.endTime).toLocaleString(),
          item?.type,
        ];
      }) || []),
    ];
  }, [data?.data]);

  return (
    <PrivateLayout title="Teacher | Class">
      <section className="w-full p-4 ">
        <SearchBar
          sortComp={<SortFilter sort={sortBy} setSort={setSortBy} />}
          filterComp={
            <SearchFilter
              batchId={batch}
              setBatchId={setBatchId}
              courseId={course}
              setCourseId={setCourseId}
              branchId={branch}
              setBranchId={setBranchId}
              subjectId={subject}
              setSubjectId={setSubjectId}
              type={type}
              setType={setType}
            />
          }
          setSearchText={setSearchText}
          searchText={searchText}
          data={csvData}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 xl:grid-cols-4">
          {!user?._id || !data || isValidating ? (
            Array(4)
              .fill(0)
              .map((item, index) => (
                <div
                  className="w-full flex flex-col shadow-xl max-w-[380px] rounded-xl overflow-hidden relative bg-white cursor-pointer select-none scale-100 duration-300 ease-in-out hover:scale-95 border-b-8 border-b-theme "
                  key={index}
                >
                  <div className="w-full p-4">
                    <Skeleton height={70} animation="wave" />
                  </div>

                  <div className="w-full  px-4 pb-4 flex flex-col gap-2 ">
                    {<Skeleton width={100} animation="wave" />}
                    <h3 className="font-semibold  tracking-wide text-xl">
                      {<Skeleton width={200} height={40} animation="wave" />}{" "}
                      <Skeleton animation="wave" />
                    </h3>
                    <div className="flex items-center gap-4">
                      <Skeleton width={80} animation="wave" />
                    </div>
                  </div>
                </div>
              ))
          ) : data?.data?.length ? (
            data?.data?.map((item) => (
              <ClassCard
                key={item?._id}
                onClick={() => push(`/panel/teacher/class/${item?._id}`)}
                batch={item?.batch}
                cancelled={item?.cancelled}
                classRoom={item?.classRoom}
                endTime={item?.endTime}
                isHoliday={item?.isHoliday}
                startTime={item?.startTime}
                subject={item?.subject}
                type={item?.type}
                teacher={item?.teacher}
              />
            ))
          ) : (
            <div className="w-full col-span-4">
              <Empty title="No class Found" height={250} width={250} />
            </div>
          )}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(Class);

const SortFilter = ({
  sort,
  setSort,
}: {
  sort: string;
  setSort: Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div className="w-full  p-4">
      <div className="flex items-center py-4 gap-4">
        <Sort className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Sort By Alphabet
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <RadioGroup
          aria-labelledby="search-sort-radio"
          defaultValue=""
          name="search-sort"
          value={sort}
          onChange={(e) => setSort(e?.target?.value)}
        >
          <FormControlLabel
            value=""
            control={<Radio />}
            label="Sort By Default"
          />
          <FormControlLabel
            value="a-z"
            control={<Radio />}
            label="Sort Alphabetically(A-Z)"
          />
          <FormControlLabel
            value="z-a"
            control={<Radio />}
            label="Sort Alphabetically(Z-A)"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

const SearchFilter = ({
  setBatchId,
  batchId,
  courseId,
  setCourseId,
  subjectId,
  setSubjectId,
  setBranchId,
  branchId,
  type,
  setType,
}: {
  batchId: string;
  setBatchId: Dispatch<SetStateAction<string>>;
  courseId: string;
  setCourseId: Dispatch<SetStateAction<string>>;
  branchId: string;
  setBranchId: Dispatch<SetStateAction<string>>;
  subjectId: string;
  setSubjectId: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const { data: batch, isValidating: batchLoading } =
    useSWRFetch<any>(`batch/teacher`);
  const { data: course, isValidating: courseLoading } =
    useSWRFetch<any>(`course`);
  const { data: subject, isValidating: subjectLoading } =
    useSWRFetch<any>(`subject`);
  const { data: branch, isValidating: branchLoading } =
    useSWRFetch<any>(`branch`);

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
                {item?.batch?.course?.title}-{item?.batch?.branch?.title}-
                {item?.batch?.session?.title}
              </h3>
            </div>
          ))
        )}
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
            <div className="flex items-center gap-4" key={item?._id}>
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
      </div>
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Subject
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {subjectLoading ? (
          <Skeleton animation="wave" />
        ) : (
          subject?.data?.map((item: SubjectType) => (
            <div className="flex items-center gap-4" key={item?._id}>
              <Checkbox
                size="small"
                checked={item?._id === subjectId}
                onClick={() =>
                  setSubjectId(item?._id === subjectId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
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
          Filter By Branch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {branchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          branch?.data?.map((item: BranchType) => (
            <div className="flex items-center gap-4" key={item?._id}>
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
      </div>
    </div>
  );
};
