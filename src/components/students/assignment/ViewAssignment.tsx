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
import { AssignmentSkeleton } from "components/teachers/assignment/ViewAssignment";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import { AssignmentType } from "types/assignment";
import SubjectType from "types/subject";
import { notify } from "utils";
import CustomAssignmentCard from "./CustomAssignmentCard";

type AssignmentDataType = {
  data: AssignmentType[];
  totalCount: number;
  perPage: number;
};

const ViewAssignment = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [subjectId, setSubjectId] = useState("");
  const [assignmentType, setAssignmentType] = useState("");
  const [creationType, setCreationType] = useState("NEW");

  const searchText = useDeferredValue(searchTitle);

  const { data, isValidating } = useSWRFetch<AssignmentDataType>(
    `assignment?perPage=15&pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchText}` : "") +
      (assignmentType ? `&type=${assignmentType}` : "") +
      (creationType ? `&creationType=${creationType}` : "") +
      (subjectId ? `&subject=${subjectId}` : "") +
      (sortBy ? `&sortBy=${sortBy}` : "")
  );

  const { push } = useRouter();

  const handleNavigation = (item: AssignmentType) => {
    if (dayjs(item?.dueDate).isBefore(dayjs())) {
      notify.warning("Can't view assignment due date is passed.");
      return;
    }
    push(`/panel/student/assignment/${item._id}`);
  };

  return (
    <div className="flex p-2 md:p-6 w-full flex-col gap-8 overflow-hidden">
      <SearchBar
        searchText={searchText}
        filterComp={
          <SearchFilter
            subjectId={subjectId}
            setSubjectId={setSubjectId}
            setType={setAssignmentType}
            type={assignmentType}
            creationType={creationType}
            setCreationType={setCreationType}
          />
        }
        setSearchText={setSearchTitle}
        sortComp={<SortFilter setSort={setSortBy} sort={sortBy} />}
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
                onClick={() => handleNavigation(item)}
              />
            </div>
          ))
        ) : (
          <div className="col-span-12 flex items-center justify-center py-8 ">
            <Empty title="No assignment available" />
          </div>
        )}
      </div>
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
    </div>
  );
};

export default ViewAssignment;

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
  subjectId,
  setSubjectId,
  type,
  setType,
  creationType,
  setCreationType,
}: {
  creationType: string;
  setCreationType: Dispatch<SetStateAction<string>>;
  subjectId: string;
  setSubjectId: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
}) => {
  const [pageNo, setPageNo] = useState(1);

  const { user } = useAuth();

  const { data: subject, isValidating: subjectLoading } =
    useSWRFetch<any>(`subject`);

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
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
