import { Pagination } from "@mui/material";
import { NoticeSkeleton } from "components/admin/skeleton";
import { PlacementCard } from "components/cards";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";

type PlacementNoticeDataType = {
  data: {
    _id: string;
    title: string;
    qualification: string;
    session: string;
    companyName: string;
    companyDetails: string;
    jobDescription: string;
    jobBenefits: string;
    howToApply: string;
    lastDateToApply: Date;
    createdBy: string;
    position: string;
    companyId: {
      address: string;
      branch: string;
      description: string;
      industry: string;
      name: string;
      phoneNumber: string;
    };
  }[];
  isLastChunk: boolean;
  perPage: number;
  totalCount: number;
};

const ViewPlacementNotice = () => {
  const { user } = useAuth();

  const [pageNo, setPageNo] = useState(1);

  const { push } = useRouter();
  //perPage=10&   ------- if necessary
  const { data, isValidating, error } = useSWRFetch<PlacementNoticeDataType>(
    `placement/notice?pageNo=${pageNo}`
  );

  return (
    <div className="flex flex-col gap-4 w-full ">
      <div className="flex w-full flex-col gap-4">
        {(!data && !error) || isValidating ? (
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
              onClick={() =>
                user?.role !== "PARENT" &&
                push(`/panel/student/placement/${item?._id}`)
              }
            />
          ))
        ) : (
          <Empty title="No placement posted." />
        )}
      </div>
      {/* --------------------------------Pagination----------------------------- */}
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
    </div>
  );
};

export default ViewPlacementNotice;
