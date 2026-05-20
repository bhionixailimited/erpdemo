import { Add } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { MaterialSkeleton } from "components/admin/skeleton";
import { SearchBar, StudyMaterial } from "components/common";
import { Button, Empty } from "components/core";
import { BatchLayout } from "components/teachers";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import { useDeferredValue, useState } from "react";
import { BatchMaterialType } from "types/material";

type dataType = {
  data: BatchMaterialType[];
  totalCount: number;
};
const Materials = () => {
  const [pageNo, setPageNo] = useState(1);

  const [searchText, setSearchText] = useState("");

  const searchTitle = useDeferredValue(searchText?.trim());

  const { push, query } = useRouter();

  const { user } = useAuth();
  //perPage=20& ----- if necessary
  const {
    data: batch,
    isValidating,
    mutate,
  } = useSWRFetch<dataType>(
    query?.batchId &&
      `batch/${query?.batchId}/material?pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );
  return (
    <BatchLayout>
      <div className="w-full">
        <div className="w-full flex flex-col md:flex-row items-center gap-4 justify-between mb-4 bg-white shadow-xl rounded-lg p-4">
          <h3 className="font-medium tracking-wide text-lg">Study Materials</h3>
          <Button
            startIcon={<Add />}
            onClick={() =>
              push(
                `/panel/${user?.role?.toLowerCase()}/batch/${
                  query?.batchId
                }/materials/create`
              )
            }
          >
            Upload Materials
          </Button>
        </div>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4">
          {!batch || isValidating ? (
            <MaterialSkeleton i={4} />
          ) : batch?.data && batch?.data?.length > 0 ? (
            batch?.data?.map((item) => (
              <StudyMaterial
                url={item?.fileUrl}
                _id={item?._id}
                key={item?._id}
                title={item?.title}
                publishedAt={dayjs(item?.createdAt).format(
                  "MMM D, YYYY h:mm A"
                )}
                type={item?.type}
                mutate={mutate}
                link={item?.link}
              />
            ))
          ) : (
            <div className="w-full col-span-12 flex items-center justify-center">
              <Empty title={"No materials found"} />
            </div>
          )}
        </div>
        {/*----------------------- Pagination----------------------------------- */}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(Number(batch?.totalCount || 1) / 20)}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(Materials);
