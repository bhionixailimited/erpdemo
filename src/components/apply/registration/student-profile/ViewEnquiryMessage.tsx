import { Pagination } from "@mui/material";
import { NoticeSkeleton } from "components/admin/skeleton";
import { Empty } from "components/core";
import { useApplyAuth, useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MessageCard from "./MessageCard";

type SupportMessageData = {
  data: {
    createdAt: string;
    isResolved: boolean;
    recentMessage: {
      latest: {
        message: string;
        createdAt: string;
        user: {
          _id: string;
          displayName: string;
        };
      };
    };
    subject: string;
    updatedAt: string;
    _id: string;
  }[];
  totalCount: number;
  perPage: number;
};

const ViewEnquiryMessage = ({ reload }: { reload?: boolean }) => {
  const [pageNo, setPageNo] = useState(1);
  const { user } = useApplyAuth();
  console.log("user", user);

  const { push } = useRouter();

  const { data, isValidating, mutate } = useSWRFetch<SupportMessageData>(
    `register-enquiry/user?perPage=10&pageNo=${pageNo}&resolved=false`
  );

  console.log("data", data);
  useEffect(() => {
    mutate?.();
  }, [reload]);

  return (
    <div className="w-full">
      <h3 className="font-medium tracking-wide text-lg border-b w-fit  ">
        Previous Queries
      </h3>
      <div className="flex flex-col gap-4 py-4 max-w-5xl ">
        {!data || isValidating ? (
          <NoticeSkeleton i={3} />
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <MessageCard
              title={item?.subject}
              desc={item?.recentMessage?.latest?.message}
              key={item?._id}
              lastMessage={item?.createdAt}
              onClick={() => push(`/apply/profile/queries/${item?._id}`)}
            />
          ))
        ) : (
          <Empty title="No enquiry message available" />
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

export default ViewEnquiryMessage;
