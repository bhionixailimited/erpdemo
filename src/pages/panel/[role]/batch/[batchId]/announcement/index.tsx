import { Add } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { ANNOUNCEMENT } from "assets/animations";
import { DriverSkeleton } from "components/admin/skeleton";
import { AnnouncementCard, SearchBar } from "components/common";
import { Button, Empty } from "components/core";
import { BatchLayout } from "components/teachers";
import { useAuth, useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import { useDeferredValue, useState } from "react";
import Lottie from "components/core/ClientLottie";
import { NoticeType } from "types/notice";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: ANNOUNCEMENT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
type dataType = {
  data: NoticeType[];
  totalCount: number;
};
const Announcement = () => {
  const { push, query } = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");

  const searchTitle = useDeferredValue(searchText?.trim());
  //perPage=20& ---- if necessary
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    query?.batchId &&
      `batch/${query?.batchId}/announcement?pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );
  const { user } = useAuth();
  return (
    <BatchLayout>
      <div className="w-full">
        <div className="w-full flex flex-col md:flex-row items-center gap-4 justify-between mb-4 bg-white shadow-xl rounded-lg p-4">
          <h3 className="font-medium tracking-wide text-lg">Announcements</h3>
          <Button
            startIcon={<Add />}
            onClick={() =>
              push(
                `/panel/${user?.role?.toLowerCase()}/batch/${
                  query?.batchId
                }/announcement/create`
              )
            }
          >
            Create Announcement
          </Button>
        </div>
        <SearchBar searchText={searchText} setSearchText={setSearchText} />

        <div className="flex items-start">
          <div className="w-full flex flex-col gap-4 py-4">
            {isValidating ? (
              <DriverSkeleton i={6} />
            ) : data?.data && data?.data?.length >= 1 ? (
              data?.data?.map((item) => (
                <AnnouncementCard
                  startTime={item?.createdAt}
                  endTime={item?.expireTime}
                  key={item?._id}
                  _id={item?._id}
                  title={item?.title}
                  desc={item?.description}
                  createdAt={item?.createdAt}
                  createdBy={item?.createdBy?.displayName}
                  forWhom={item?.role || "Not Provided"}
                  mutate={mutate}
                />
              ))
            ) : (
              <Empty title={"No Announcement Found"} />
            )}
          </div>
          <div className="w-full max-w-md mt-16 hidden md:block">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        </div>
        {/* --------------------------Pagination----------------------------- */}
        <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(Number(data?.totalCount || 1) / 20)}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div>
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(Announcement);
