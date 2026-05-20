import { Pagination } from "@mui/material";
import { BOOK } from "assets/animations";
import { NoticeSkeleton } from "components/admin/skeleton";
import { AnnouncementCard, SearchBar } from "components/common";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";
import { useDeferredValue, useState } from "react";
import Lottie from "components/core/ClientLottie";
import { NoticeType } from "types/notice";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: BOOK,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
type dataType = {
  data: NoticeType[];
  totalCount?: number;
  perPage: number;
};
const NoticeView = () => {
  const [searchTitle, setSearchTitle] = useState("");

  const [pageNo, setPageNo] = useState(1);

  const searchText = useDeferredValue(searchTitle?.trim());

  const { user } = useAuth();
  //perPage=10&  ---- if necessasry
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `notice?pageNo=${pageNo}` + (searchText ? `&searchTitle=${searchText}` : "")
  );
  return (
    <PrivateLayout
      title={`${user?.role
        ?.toLocaleLowerCase()
        ?.split("")
        ?.map((item, i) => (i === 0 ? item?.toLocaleUpperCase() : item))
        ?.join("")} | Notice`}
    >
      <section className="w-full p-4 ">
        <SearchBar setSearchText={setSearchTitle} searchText={searchTitle} />
        <div className="flex items-start">
          <div className="w-full flex flex-col gap-4 py-4">
            {!data || isValidating ? (
              <NoticeSkeleton i={4} />
            ) : data?.data && data?.data?.length >= 1 ? (
              data?.data?.map((item) => (
                <AnnouncementCard
                  // startTime={item?.startTime}
                  // endTime={item?.endTime}
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
              <Empty title={"No Notice Found"} />
            )}
          </div>
          <div className="w-full max-w-md mt-16 hidden xl:flex ">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        </div>
        {/* -----------------------Pagination-------------------------- */}
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
      </section>
    </PrivateLayout>
  );
};

export default withProtectedRoute(NoticeView);
