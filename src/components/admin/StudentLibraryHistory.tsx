import { StudentLibraryHistoryCard } from "components/cards";
import { SearchBar } from "components/common";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import { BookIssueType } from "types/bookissue";
import { useState, useDeferredValue } from "react";
import { Pagination, Skeleton } from "@mui/material";
import { Empty } from "components/core";
import { notify } from "utils";

type dataType = {
  data: BookIssueType[];
  totalCount: number;
  perPage: number;
};
const StudentLibraryHistory = ({
  studentId,
  type,
}: {
  studentId?: string;
  type?: string;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");

  const searchText = useDeferredValue(searchTitle);

  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    studentId &&
      `library/student/${studentId}/book-issued?perPage=15&pageNo=${pageNo}` +
        (searchText ? `&searchTitle=${searchTitle}` : "")
  );

  return (
    <div className="w-full bg-white mt-4 shadow-xl rounded-lg ">
      <h3 className="font-semibold p-4 text-2xl tracking-wide text-theme ">
        Library History
      </h3>
      <SearchBar searchText={searchText} setSearchText={setSearchTitle} />
      <div className="flex flex-col w-full gap-2 p-4 ">
        {!data || isValidating ? (
          Array(3)
            .fill(0)
            .map((_, index) => (
              <div className="flex items-start gap-2" key={index}>
                <div className="w-fit">
                  <Skeleton
                    variant="rounded"
                    height={100}
                    width={100}
                    animation="wave"
                  />
                </div>
                <div className="w-full">
                  <Skeleton variant="rounded" height={100} animation="wave" />
                </div>
              </div>
            ))
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <StudentLibraryHistoryCard
              key={item?._id}
              issueId={item?._id}
              mutate={mutate}
              img={item?.book?.imageUrl}
              bookTitle={item?.book?.title}
              author={item?.book?.author?.name}
              bookIssueDate={
                item?.createdAt
                  ? dayjs(item?.createdAt).format("LL")
                  : "Not Provided"
              }
              returnDate={
                item?.returnDate
                  ? dayjs(item?.returnDate).format("LL")
                  : "Not Provided"
              }
              daysPass={
                !item?.returned &&
                item?.returnDate &&
                dayjs(item?.returnDate).isBefore(dayjs()) &&
                dayjs().diff(dayjs(item?.returnDate), "days")
              }
              returned={item?.returned}
              payable={item?.pendingAmount}
              type={type}
            />
          ))
        ) : (
          <div className="w-full flex items-center justify-center">
            <Empty title="No Data Available" />
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

export default StudentLibraryHistory;
