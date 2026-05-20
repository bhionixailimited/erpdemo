import { SearchBar, StudyMaterial } from "components/common";
import { useState, useEffect } from "react";
import { MaterialSkeleton } from "../skeleton";
import { useAuth, useSWRFetch } from "hooks";
import dayjs from "dayjs";
import { Pagination } from "@mui/material";
import { Empty } from "components/core";
import DocCard from "./DocCard";
import { IDocument } from "types/document";

type dataType = {
  data: IDocument[];
  totalCount: number;
};

const MyDocuments = ({ refetch }: { refetch: boolean }) => {
  const [searchText, setSearchText] = useState("");
  const [pageNo, setPageNo] = useState(1);
  //perPage=20& ---- if necessasry
  const {
    data: docs,
    isValidating,
    mutate,
  } = useSWRFetch<dataType>(
    `document?isSingleUser=true&pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchText}` : "")
  );

  useEffect(() => {
    mutate?.();
  }, [refetch]);

  return (
    <div className="flex flex-col w-full">
      <SearchBar searchText={searchText} setSearchText={setSearchText} />
      <div className="w-full">
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4">
          {!docs || isValidating ? (
            <MaterialSkeleton i={4} />
          ) : docs?.data && docs?.data?.length > 0 ? (
            docs?.data?.map((item) => (
              <DocCard
                url={item?.url}
                _id={item?._id}
                key={item?._id}
                title={item?.title}
                publishedAt={dayjs(item?.createdAt).format(
                  "MMM D, YYYY h:mm A"
                )}
                type={item?.category}
                mutate={mutate}
              />
            ))
          ) : (
            <div className="w-full col-span-12 flex items-center justify-center">
              <Empty title={"No documents found"} />
            </div>
          )}
        </div>
        {/* ----------------------------Pagination----------------------------- */}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(Number(docs?.totalCount || 1) / 20)}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </div>
    </div>
  );
};

export default MyDocuments;
