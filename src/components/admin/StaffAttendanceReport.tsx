import { Empty } from "components/core";
import { Checkbox, Divider, Pagination, Skeleton } from "@mui/material";
import {
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import StaffCard from "./StaffCard";
import { useFetch } from "hooks";
import { SearchBar } from "components/common";

const StaffAttendance = () => {
  const [pageNo, setPageNo] = useState(1);
  const [load, setReload] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [sortAlphabetically, setSortAlphabetically] = useState("");
  const [gender, setGender] = useState("");
  const { mutate, loading } = useFetch();
  const [allStaff, setAllStaff] = useState<any>();
  const searchTitle = useDeferredValue(searchText?.trim());

  useEffect(() => {
    (async () => {
      const response = await mutate({
        path: `staff/attendance-by-date`,
        method: "POST",
        body: JSON.stringify({
          date: new Date().toISOString(),
          searchTitle: searchTitle,
          sortByName: sortAlphabetically,
          sortByGender: gender,
          // perPage: 30,
          pageNo: pageNo,
        }),
      });
      response?.status === 200 && setAllStaff(response?.data?.data);
    })();
  }, [searchTitle, sortAlphabetically, load, pageNo]);

  return (
    <>
      {" "}
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        sortComp={
          <SortComp
            gender={gender}
            setGender={setGender}
            // sortRollNo={sortRollNo}
            // setSortRollNo={setSortRollNo}
            sortAlphabetically={sortAlphabetically}
            setSortAlphabetically={setSortAlphabetically}
          />
        }
      />{" "}
      <div className="flex flex-col my-4  p-4  rounded-lg ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-4 xl:grid-cols-6   ">
          {load ? (
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
          ) : allStaff?.data?.length > 0 ? (
            allStaff?.data?.map((staff: any) => (
              <StaffCard
                photoUrl={staff?.photoUrl}
                name={staff?.displayName}
                employeeId={`${staff?._id}`}
                key={staff?._id}
                role={staff?.role}
                email={staff?.email}
                isAbsent={staff?.isAbsent}
                isOnLeave={staff?.isOnLeave}
                isPresent={staff?.isPresent}
                reload={() => setReload((prev) => !prev)}
                loading={loading}
              />
            ))
          ) : (
            <div className="w-full col-span-12 flex items-center justify-center">
              <Empty title="No staff found" />
            </div>
          )}
        </div>
        {/*-------------------------- Pagination ---------------------------------*/}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(
              Number(allStaff?.totalCount || 1) / Number(allStaff?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </div>
    </>
  );
};

export default StaffAttendance;
const SortComp = ({
  gender,
  setGender,
  setSortRollNo,
  sortRollNo,
  setSortAlphabetically,
  sortAlphabetically,
}: {
  gender?: string;
  setGender?: Dispatch<SetStateAction<string>>;
  setSortRollNo?: Dispatch<SetStateAction<string>>;
  setSortAlphabetically: Dispatch<SetStateAction<string>>;
  sortRollNo?: string;
  sortAlphabetically: string;
}) => {
  return (
    <div className="w-full flex flex-col">
      <h3 className="font-medium tracking-wide text-white bg-theme p-4 border-b text-xl">
        Sort & Filter
      </h3>
      {/* <div className="flex flex-col gap-1 ">
        <h3 className="font-medium tracking-wide p-4 border-b text-theme text-md">
          Filter Gender
        </h3>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "MALE"}
            onClick={() =>
              setGender && setGender(gender === "MALE" ? "" : "MALE")
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Male</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "FEMALE"}
            onClick={() =>
              setGender && setGender(gender === "FEMALE" ? "" : "FEMALE")
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Female</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={gender === "OTHER"}
            onClick={() =>
              setGender && setGender(gender === "OTHER" ? "" : "OTHER")
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Other</h3>
        </div>
      </div> */}
      <Divider />
      {/* <div className="flex flex-col gap-1 ">
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
      </div> */}
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
