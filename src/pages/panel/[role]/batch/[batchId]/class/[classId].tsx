import { Checkbox, Divider, Skeleton } from "@mui/material";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";

import { BatchLayout, StudentAttendanceCard } from "components/teachers";
import { StudentBatchAttendanceCard } from "components/admin";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";

type AttendanceReportData = {
  data: {
    isAbsent: boolean;
    isOnLeave: boolean;
    isPresent: boolean;
    student: {
      displayName: string;
      email: string;
      gender: string;
      rollNumber: string;
      _id: string;
      photoUrl: string;
    };
  }[];
  totalCount?: number;
  perPage?: number;
};

const ViewClass = () => {
  const [searchText, setSearchText] = useState("");
  const [sortAlphabetically, setSortAlphabetically] = useState("");
  const [sortRollNo, setSortRollNo] = useState("");
  const [gender, setGender] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const searchTitle = useDeferredValue(searchText?.trim());

  const { query } = useRouter();

  const { classId } = query;

  const { data, isValidating, mutate } = useSWRFetch<AttendanceReportData>(
    classId &&
      `attendance/${classId}?perPage=30&pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "") +
        (sortAlphabetically
          ? `&sortAlphabetically=${sortAlphabetically}`
          : "") +
        (sortRollNo ? `&sortRollNo=${sortRollNo}` : "") +
        (gender ? `&gender=${gender}` : "")
  );

  return (
    <BatchLayout>
      <div className="w-full">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          sortComp={
            <SortComp
              gender={gender}
              setGender={setGender}
              sortRollNo={sortRollNo}
              setSortRollNo={setSortRollNo}
              sortAlphabetically={sortAlphabetically}
              setSortAlphabetically={setSortAlphabetically}
            />
          }
        />
        <div className="grid grid-cols-1 w-full gap-4 xl:gap-8 py-4 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {!data || isValidating ? (
            Array(15)
              .fill(0)
              .map((i, index) => (
                <div
                  className="w-full flex flex-col gap-2 items-center bg-white shadow-lg rounded-lg p-4 "
                  key={index}
                >
                  <Skeleton
                    variant="circular"
                    height={80}
                    width={80}
                    animation="wave"
                  />

                  <div className="flex flex-col items-center justify-center">
                    <Skeleton
                      variant="rounded"
                      height={25}
                      width={80}
                      animation="wave"
                    />
                    <Skeleton variant="text" width={180} animation="wave" />
                  </div>

                  <div className="flex items-center gap-3 justify-center ">
                    <Skeleton
                      variant="circular"
                      height={50}
                      width={50}
                      animation="wave"
                    />
                    <Skeleton
                      variant="circular"
                      height={50}
                      width={50}
                      animation="wave"
                    />
                    <Skeleton
                      variant="circular"
                      height={50}
                      width={50}
                      animation="wave"
                    />
                  </div>
                </div>
              ))
          ) : data?.data?.length > 0 ? (
            data?.data?.map((item) => (
              <StudentBatchAttendanceCard
                student={item?.student}
                isAbsent={item?.isAbsent}
                isOnLeave={item?.isOnLeave}
                isPresent={item?.isPresent}
                key={item?.student?._id}
                classId={classId?.toString()}
                reload={mutate}
              />
            ))
          ) : (
            <div className="w-full col-span-12 flex items-center justify-center">
              <Empty title="No student assign" />
            </div>
          )}
        </div>
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(ViewClass);

const SortComp = ({
  gender,
  setGender,
  setSortRollNo,
  sortRollNo,
  setSortAlphabetically,
  sortAlphabetically,
}: {
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  setSortRollNo: Dispatch<SetStateAction<string>>;
  setSortAlphabetically: Dispatch<SetStateAction<string>>;
  sortRollNo: string;
  sortAlphabetically: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="font-medium tracking-wide text-white bg-theme p-4 border-b text-xl">
        Sort & Filter
      </h3>
      <div className="flex flex-col gap-1 ">
        <h3 className="font-medium tracking-wide p-4 border-b text-theme text-md">
          Filter Gender
        </h3>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "MALE"}
            onClick={() => setGender(gender === "MALE" ? "" : "MALE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Male</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "FEMALE"}
            onClick={() => setGender(gender === "FEMALE" ? "" : "FEMALE")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Female</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "OTHER"}
            onClick={() => setGender(gender === "OTHER" ? "" : "OTHER")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Other</h3>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 ">
        <h3 className="font-medium tracking-wide p-4 border-b text-theme text-md">
          Sort By Roll Number
        </h3>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={sortRollNo === "asc"}
            onClick={() => setSortRollNo(sortRollNo === "asc" ? "" : "asc")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Acceding</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={sortRollNo === "des"}
            onClick={() => setSortRollNo(sortRollNo === "des" ? "" : "des")}
          />
          <h3 className="font-medium  tracking-wide text-sm">Descending</h3>
        </div>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 ">
        <h3 className="font-medium tracking-wide p-4 border-b text-theme text-md">
          Sort By Alphabets
        </h3>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={sortAlphabetically === "A-Z"}
            onClick={() =>
              setSortAlphabetically(sortAlphabetically === "A-Z" ? "" : "A-Z")
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">A-Z</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={sortAlphabetically === "Z-A"}
            onClick={() =>
              setSortAlphabetically(sortAlphabetically === "Z-A" ? "" : "Z-A")
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Z-A</h3>
        </div>
      </div>
      <Divider />
    </div>
  );
};
