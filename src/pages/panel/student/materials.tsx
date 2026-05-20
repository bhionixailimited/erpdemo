import { Pagination } from "@mui/material";
import { MaterialSkeleton } from "components/admin/skeleton";
import { SearchBar, StudyMaterial } from "components/common";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useDeferredValue, useEffect, useState } from "react";
import { BatchMaterialType } from "types/material";

type dataType = {
  data: BatchMaterialType[];
  totalCount: number;
};

const MaterialsPage = () => {
  const [pageNo, setPageNo] = useState(1);

  const [searchText, setSearchText] = useState("");

  const searchTitle = useDeferredValue(searchText?.trim());

  const { user, getUserAllDetails } = useAuth();

  useEffect(() => {
    if (!user?._id) return;

    getUserAllDetails(user?._id);
  }, [user?._id]);

  const {
    data: batch,
    isValidating,
    mutate,
  } = useSWRFetch<dataType>(
    user?.academicDetails?.batch?._id &&
      `batch/${user?.academicDetails?.batch?._id}/material?perPage=20&pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );

  return (
    <PrivateLayout title="Materials | Student">
      <section className="w-full container mx-auto p-4">
        <div className="w-full">
          <SearchBar searchText={searchText} setSearchText={setSearchText} />

          <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4">
            {isValidating ? (
              <MaterialSkeleton i={4} />
            ) : batch?.data && batch?.data?.length > 0 ? (
              batch?.data?.map((item) => (
                <StudyMaterial
                  _id={item?._id}
                  key={item?._id}
                  title={item?.title}
                  publishedAt={dayjs(item?.createdAt).format(
                    "MMM D, YYYY h:mm A"
                  )}
                  type={item?.type}
                  mutate={mutate}
                  link={item?.link}
                  url={item?.fileUrl}
                />
              ))
            ) : (
              <div className="w-full  col-span-12 grid grid-cols-1 gap-4 md:grid-cols-2 py-4 lg:grid-cols-3 xl:grid-cols-4">
                <div className="w-full col-span-12 flex items-center justify-center">
                  <Empty title={"No materials found"} />
                </div>
              </div>
            )}
          </div>

          <div className="w-full flex items-center justify-center py-4">
            <Pagination
              count={Math.ceil(Number(batch?.totalCount || 1) / 20)}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(MaterialsPage);
