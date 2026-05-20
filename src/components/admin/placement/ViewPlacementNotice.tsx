import { Pagination } from "@mui/material";
import { PlacementCard } from "components/cards";
import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { PlacementNoticeType } from "types/placementnotice";
import { NoticeSkeleton } from "../skeleton";

type dataType = {
  data: PlacementNoticeType[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};
const ViewPlacementNotice = () => {
  const { push } = useRouter();
  const [pageNo, setPageNo] = useState(1);
  //perPage=10& ------ if necessary
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `placement/notice?pageNo=${pageNo}`
  );
  return (
    <div className="flex flex-col gap-4 w-full ">
      {" "}
      <div className="flex w-full flex-col gap-4">
        {!data || isValidating ? (
          <NoticeSkeleton i={3} />
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <PlacementCard
              key={item?._id}
              date={item?.lastDateToApply}
              title={item?.title}
              description={item?.jobDescription}
              companyName={item?.companyId?.name || item?.companyName}
              companyServe={item?.position}
              // companyRepresentative={item?.companyRepresentative}
              onClick={() => push(`/panel/admin/placement/${item?._id}`)}
            />
          ))
        ) : (
          <Empty title="No placement posted." />
        )}
      </div>
      {/* ---------------------------Pagination----------------------- */}
      {/* <div className="w-full flex flex-col items-center justify-center py-4">
        <Pagination
          count={Math.ceil(
            Number(data?.totalCount || 1) / Number(data?.perPage || 1)
          )}
          onChange={(e, v: number) => setPageNo(v)}
          variant="outlined"
          color="primary"
        />
      </div> */}
    </div>
  );
};

export default ViewPlacementNotice;
