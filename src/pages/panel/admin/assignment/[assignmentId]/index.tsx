import { AddBox, Sort } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Skeleton,
} from "@mui/material";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { AssignmentDetails, StudentCard } from "components/teachers";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { AssignmentStat } from "types/assignmentStat";
import { useRouter } from "next/router";

type AssignmentData = {
  data: AssignmentStat[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};
const ViewAssignment = () => {
  const [pageNo, setPageNo] = useState(1);
  const [submittedStudent, setSubmittedStudent] = useState("");
  const [assignmentReviewed, setAssignmentReviewed] = useState("");
  const [searchTitle, setSearchTitle] = useState("");
  const [sortBy, setSortBy] = useState("");

  const { assignmentId } = useRouter()?.query;
  const searchText = useDeferredValue(searchTitle);
  const { data: student, isValidating } = useSWRFetch<AssignmentData>(
    assignmentId &&
      `assignment/student-stat/${assignmentId}?perPage=10&pageNo=${pageNo}` +
        (typeof submittedStudent === "boolean"
          ? `&submitted=${submittedStudent}`
          : "") +
        (searchText ? `&searchTitle=${searchText}` : "") +
        (typeof assignmentReviewed === "boolean"
          ? `&reviewed=${assignmentReviewed}`
          : "") +
        (sortBy ? `&sortBy=${sortBy}` : "")
  );
  return (
    <PrivateLayout title="Admin | Assignment">
      <section className="w-full overflow-hidden p-4 ">
        <AssignmentDetails />
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchTitle}
          filterComp={
            <FilterComp
              submittedStudent={submittedStudent}
              setSubmittedStudent={setSubmittedStudent}
              reviewed={assignmentReviewed}
              setReviewed={setAssignmentReviewed}
            />
          }
          sortComp={<SortFilter sort={sortBy} setSort={setSortBy} />}
        />{" "}
        <div className="w-full grid grid-cols-12 pt-4 gap-4 ">
          {!student || isValidating ? (
            Array(5)
              .fill(0)
              .map((item, index) => <StudentSkeleton key={index} />)
          ) : student?.data?.length ? (
            student?.data?.map((item, index) => (
              <div
                key={item?.student?._id}
                className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              >
                <StudentCard
                  type="ADMIN"
                  fullMark={item?.fullMark}
                  name={item?.student?.user?.displayName}
                  email={item?.student?.user?.email}
                  rollNo={item?.student?.rollNumber}
                  markSecured={item?.answer?.totalMark}
                  submissionDate={item?.answer?.submittedDate}
                  totalAttempted={
                    Number(item?.answer?.totalCorrect || 0) +
                    Number(item?.answer?.totalWrong || 0)
                  }
                  answerSubmitted={item?.answerSubmitted}
                  assignmentId={item?._id}
                  studentId={item?.student?.user?._id}
                  photoUrl={item?.student?.user?.photoUrl}
                  reviewed={item?.reviewed}
                />
              </div>
            ))
          ) : (
            <div className="col-span-12 flex items-center justify-center py-8 ">
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
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(ViewAssignment);
const StudentSkeleton = () => {
  return (
    <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="flex items-center justify-center flex-col shadow-xl rounded-lg hover:scale-105 common-transition cursor-pointer gap-6">
        <div className="h-24 2xl:h-28 w-full relative rounded-t-lg">
          <div className="w-full h-full">
            <Skeleton variant="rounded" height={90} animation="wave" />
            <div className=" justify-center gap-4 absolute top-1/4 z-50 w-full flex h-full items-center p-2">
              <div className="w-fit h-fit bg-gray-100 rounded-full ">
                <Skeleton
                  variant="circular"
                  width={100}
                  height={100}
                  animation="wave"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="p-5 flex flex-col w-full gap-1 items-center justify-center">
          <p className="text-lg font-semibold ">
            <Skeleton variant="text" animation="wave" width={150} />
          </p>
          <p className="text-sm font-semibold text-theme cursor-pointer">
            <Skeleton variant="text" animation="wave" width={200} />
          </p>
          <p className="text-sm font-semibold text-theme cursor-pointer">
            <Skeleton variant="text" animation="wave" width={210} />
          </p>
          <p className="text-sm font-semibold text-theme cursor-pointer">
            <Skeleton variant="text" animation="wave" width={200} />
          </p>
          <span className="text-xs tracking-tight flex gap-1 font-semibold">
            <span className="font-semibold text-theme">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={120}
                height={30}
              />
            </span>
          </span>
        </div>
      </div>
    </div>
  );
};

const FilterComp = ({
  setSubmittedStudent,
  submittedStudent,
  reviewed,
  setReviewed,
}: {
  setSubmittedStudent?: Dispatch<SetStateAction<any>>;
  submittedStudent?: any;
  setReviewed?: Dispatch<SetStateAction<any>>;
  reviewed?: any;
}) => {
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Submission
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={submittedStudent === true}
            onClick={() =>
              setSubmittedStudent?.(submittedStudent === true ? "" : true)
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">
            Submitted Student
          </h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={submittedStudent === false}
            onClick={() =>
              setSubmittedStudent?.(submittedStudent === false ? "" : false)
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">
            Not submitted Student
          </h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Reviewed
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={reviewed === true}
            onClick={() => setReviewed?.(reviewed === true ? "" : true)}
          />
          <h3 className="font-medium  tracking-wide text-sm">Reviewed</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={reviewed === false}
            onClick={() => setReviewed?.(reviewed === false ? "" : false)}
          />
          <h3 className="font-medium  tracking-wide text-sm">Not Reviewed</h3>
        </div>
      </div>
      <Divider />
    </div>
  );
};

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
