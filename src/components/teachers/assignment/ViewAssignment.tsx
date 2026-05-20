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
import { CustomAssignmentCard } from "components/students";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import { AssignmentType } from "types/assignment";
import SubjectType from "types/subject";

type Props = {
  type?: string;
};
type dataType = {
  data: AssignmentType[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};
const ViewAssignment = ({ type }: Props) => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [batchId, setBatchId] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [creationType, setCreationType] = useState("");
  const [sortBy, setSortBy] = useState("");
  const searchText = useDeferredValue(searchTitle);

  const { push } = useRouter();
  //perPage=10& --- if necessary
  const { data, isValidating } = useSWRFetch<dataType>(
    `assignment?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (batchId ? `&batch=${batchId}` : "") +
      (assignmentType ? `&type=${assignmentType}` : "") +
      (creationType ? `&creationType=${creationType}` : "") +
      (subjectId ? `&subject=${subjectId}` : "") +
      (sortBy ? `&sortBy=${sortBy}` : "")
  );

  return (
    <>
      <SearchBar
        filterComp={
          <SearchFilter
            batchId={batchId}
            setBatchId={setBatchId}
            subjectId={subjectId}
            setSubjectId={setSubjectId}
            setType={setAssignmentType}
            type={assignmentType}
            creationType={creationType}
            setCreationType={setCreationType}
          />
        }
        sortComp={<SortFilter setSort={setSortBy} sort={sortBy} />}
        searchText={searchTitle}
        setSearchText={setSearchTitle}
      />
      <div className="w-full grid grid-cols-12 pt-4 gap-4 ">
        {!data || isValidating ? (
          Array(5)
            .fill(0)
            .map((item, index) => <AssignmentSkeleton key={index} />)
        ) : data?.data?.length ? (
          data?.data?.map((item, index) => (
            <div
              className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              key={item?._id}
            >
              <CustomAssignmentCard
                key={item?._id}
                data={item}
                onClick={() =>
                  push(`/panel/${type?.toLowerCase()}/assignment/${item._id}`)
                }
              />
            </div>
          ))
        ) : (
          <div className="col-span-12 flex items-center justify-center py-8 ">
            <Empty title="No assignment available" />
          </div>
        )}
      </div>
      {/* ------------------------Pagination------------------------- */}
      {/* <div className="w-full flex items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(data?.totalCount || 1) / Number(data?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div> */}
    </>
  );
};

export default ViewAssignment;

export const AssignmentSkeleton = () => {
  return (
    <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
      <div className="flex items-center justify-center flex-col shadow-xl rounded-lg hover:scale-105 common-transition cursor-pointer gap-6">
        <div className="h-24 2xl:h-28 w-full relative rounded-t-lg">
          <div className="w-full h-full">
            <Skeleton variant="rounded" height={120} animation="wave" />
            <div className=" justify-center gap-4 absolute top-1/2 z-50 w-full flex h-full items-center p-2">
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
            <Skeleton variant="text" animation="wave" width={50} />
          </p>
          <p className="text-sm font-semibold text-theme cursor-pointer">
            <Skeleton variant="text" animation="wave" width={100} />
          </p>
          <span className="text-xs tracking-tight flex gap-1 font-semibold">
            <Skeleton variant="text" animation="wave" width={50} />
            <p className="font-semibold text-theme">
              <Skeleton variant="text" animation="wave" width={100} />
            </p>
          </span>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full text-end justify-between items-center pt-3">
              <Skeleton
                variant="rounded"
                animation="wave"
                width={100}
                height={40}
              />
            </div>
          </div>
        </div>
      </div>
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
          <FormControlLabel
            value="n-o"
            control={<Radio />}
            label="Sort New to Old"
          />
          <FormControlLabel
            value="o-n"
            control={<Radio />}
            label="Sort Old to New"
          />
        </RadioGroup>
      </div>
    </div>
  );
};

const SearchFilter = ({
  setBatchId,
  batchId,
  subjectId,
  setSubjectId,
  type,
  setType,
  creationType,
  setCreationType,
}: {
  batchId: string;
  setBatchId: Dispatch<SetStateAction<string>>;
  creationType: string;
  setCreationType: Dispatch<SetStateAction<string>>;
  subjectId: string;
  setSubjectId: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [subjectPageNo, setSubjectPageNo] = useState(1);

  const { user } = useAuth();

  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    user?.role?.toUpperCase() === "TEACHER"
      ? `batch/teacher?perPage=5&pageNo=${pageNo}`
      : `batch?course=true&branch=true&session=true&perPage=5&pageNo=${pageNo}`
  );
  const { data: subject, isValidating: subjectLoading } = useSWRFetch<any>(
    `subject?perPage=5&pageNo=${subjectPageNo}`
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
            disabled={pageNo === 1}
          >
            Prev
          </button>
          <button
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setPageNo((prev) => prev + 1)}
            disabled={batch?.isLastChunk}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
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
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() =>
              setSubjectPageNo((prev) => (prev > 1 ? prev - 1 : 1))
            }
            disabled={subjectPageNo === 1}
          >
            Prev
          </button>
          <button
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setSubjectPageNo((prev) => prev + 1)}
            disabled={subject?.isLastChunk}
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
            checked={type === "MCQTYPE"}
            onClick={() => setType(type === "MCQTYPE" ? "" : "MCQTYPE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">MCQ</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={type === "LONGTYPE"}
            onClick={() => setType(type === "LONGTYPE" ? "" : "LONGTYPE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Long Type</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={type === "ATTACHMENT"}
            onClick={() => setType(type === "ATTACHMENT" ? "" : "ATTACHMENT")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Attachment</h3>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter Creation Type
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={creationType === "COMPLETE"}
            onClick={() =>
              setCreationType(creationType === "COMPLETE" ? "" : "COMPLETE")
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Complete</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={creationType === "NEW"}
            onClick={() => setCreationType(creationType === "NEW" ? "" : "NEW")}
          />
          <h3 className="font-medium  tracking-wide text-sm">New</h3>
        </div>
      </div>
      <Divider />
    </div>
  );
};
