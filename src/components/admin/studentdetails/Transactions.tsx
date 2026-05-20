import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useEffect, useState } from "react";
import { PaymentType } from "types/payment";

type FeeTransactionDataType = {
  data: PaymentType[];
  isLastChunk: boolean;
};

const Transactions = ({
  studentId,
  reload,
}: {
  studentId?: String;
  reload?: boolean;
}) => {
  const [pageNo, setPageNo] = useState(1);

  const { data, isValidating, mutate } = useSWRFetch<FeeTransactionDataType>(
    studentId && `student/transaction/${studentId}?perPage=10&pageNo=${pageNo}`
  );

  const handlePrev = () => {
    setPageNo((prev) => (prev <= 1 ? 1 : prev - 1));
  };

  useEffect(() => {
    mutate?.();
  }, [reload]);

  return (
    <div className="w-full flex flex-col px-2 md:px-6">
      <div className="w-full flex items-center flex-col md:flex-row justify-center md:justify-between">
        <p className="md:text-xl text-lg font-semibold">All transaction</p>
        <div className="flex gap-8">
          <IconButton
            className="bg-themeSecondary/10 py-1.5 px-2 cursor-pointer rounded-lg !text-theme"
            onClick={handlePrev}
          >
            <ArrowBack />
          </IconButton>
          <span className="font-medium tracking-wide flex items-center justify-center text-sm border border-theme text-theme h-10 w-10 text-center rounded-full">
            <p>{pageNo}</p>
          </span>
          <IconButton
            className="bg-themeSecondary/10 py-1.5 px-2 cursor-pointer  rounded-lg !text-theme"
            onClick={() =>
              setPageNo((prev) => (data?.isLastChunk ? prev : prev + 1))
            }
          >
            <ArrowForward />
          </IconButton>
        </div>
      </div>
      <div className="flex flex-col w-full gap-4">
        <p className="text-sm text-center md:text-left text-themeSecondary">
          Recent Payments
        </p>
        <div className="w-full flex flex-col gap-5  ">
          {!data || isValidating ? (
            Array(5)
              .fill(0)
              .map((_, index) => (
                <div className="flex gap-4 items-center" key={index}>
                  <Skeleton
                    variant="circular"
                    height={50}
                    width={50}
                    animation="wave"
                  />
                  <div className="flex flex-col gap-1 w-full">
                    <div className="w-full flex items-center justify-between">
                      <Skeleton variant="text" width={200} animation="wave" />
                      <Skeleton variant="text" width={150} animation="wave" />
                    </div>
                    <Skeleton variant="text" width={150} animation="wave" />
                  </div>
                </div>
              ))
          ) : data?.data?.length ? (
            data?.data?.map((item) => (
              <div
                className="md:px-4 py-2 rounded-lg w-full flex gap-2  justify-start items-center "
                key={item._id}
              >
                <div className="w-fit">
                  {item?.paymentStatus === "SUCCESS" && !item?.isRefundable ? (
                    <Avatar className="!bg-theme md:!w-[3rem] md:!h-[3rem]">
                      ₹
                    </Avatar>
                  ) : item?.paymentStatus === "SUCCESS" &&
                    item?.isRefundable ? (
                    <Avatar className="!bg-gray-500 md:!w-[3rem] md:!h-[3rem]">
                      -
                    </Avatar>
                  ) : (
                    <Avatar className="!bg-themeSecondary md:!w-[3rem] md:!h-[3rem]">
                      X
                    </Avatar>
                  )}
                </div>
                <div className="flex flex-wrap gap-2 justify-between w-full">
                  <div className="flex flex-col">
                    <p className=" font-semibold text-sm md:text-base">
                      {" "}
                      XXXXXX
                      {item?._id?.slice(0, Math.floor(item?._id?.length / 2))}
                    </p>
                    <p className="text-xs text-gray-500">
                      {dayjs(item?.createdAt).format("LLL")}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-themeSecondary font-semibold text-xs md:text-sm">
                      {item?.paymentType}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-themeSecondary font-semibold text-sm">
                      ₹{item.amount}{" "}
                      {item?.paymentStatus === "SUCCESS" && item?.isRefundable
                        ? item?.refunded
                          ? "(Refunded)"
                          : "(Refundable)"
                        : null}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="w-full flex items-center justify-center">
              <Empty title="No transaction found" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Transactions;
