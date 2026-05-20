import { PlacedStudentCard } from "components/cards";
import { SearchBar } from "components/common";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { PlacedStudentType } from "types/placedstudent";
import { useState, useDeferredValue } from "react";
import { Pagination, Skeleton } from "@mui/material";
import { Empty } from "components/core";

type dataType = {
  data: PlacedStudentType[];
  totalCount: number;
  pageNo: number;
  perPage: number;
};
const PlacementArchiveData = () => {
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [pageNo, setPageNo] = useState(1);
  const { sessionId } = useRouter().query;
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    sessionId &&
      `placement-report?year=${sessionId}&perPage=15&pageNo=${pageNo}` +
        (searchText ? `&searchTitle=${searchText}` : "")
  );
  return (
    <PrivateLayout title="Placement | Archive ">
      <section className="w-full container mx-auto">
        <SearchBar searchText={searchText} setSearchText={setSearchTitle} />
        <div className="w-full grid grid-cols-1 gap-4 py-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {isValidating ? (
            Array(8)
              .fill(0)
              .map((item, index) => (
                <>
                  <div className="w-full bg-white shadow-xl rounded-lg p-4">
                    <div className="flex gap-3">
                      <div className="mt-2">
                        <Skeleton
                          variant="rectangular"
                          height={80}
                          width={70}
                        />
                      </div>
                      <div className="flex flex-col ">
                        <Skeleton variant="text" width={150} />
                        <Skeleton variant="text" width={150} />
                        <Skeleton variant="text" width={150} />
                        <Skeleton variant="text" width={150} />
                      </div>
                    </div>
                  </div>
                </>
              ))
          ) : data?.data && data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <PlacedStudentCard
                key={index}
                studentName={item?.student?.displayName}
                companyName={item?.companyName}
                batch={item?.student?.academicDetails?.batch}
                photoUrl={item?.student?.photoUrl}
                position={item?.position}
              />
            ))
          ) : (
            <div className="col-span-12">
              <Empty title="No Students Found" />
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
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(PlacementArchiveData);
