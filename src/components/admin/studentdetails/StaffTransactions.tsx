import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, IconButton, Skeleton } from "@mui/material";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import { PaymentType } from "types/payment";
import { MoneyFormat } from "utils";
import { StaffPaymentDialog } from "../dialog";
type FeeTransactionDataType = {
  data: PaymentType[];
  isLastChunk: boolean;
};
type PaymentOverviewType = {
  data: {
    totalAmountPaidThisYear: number;
    student: {
      displayName: string;
      email: string;
      gender: string;
      isAlumni: boolean;
      isHostler: boolean;
      isUsingTransport: boolean;
      libraryCardNumber: string;
      phoneNumber: string;
      photoUrl: string;
      registrationNumber: string;
      rollNumber: string;
      _id: string;
    };
  };
};
const StaffTransactions = ({ staffId }: { staffId?: string }) => {
  const [pageNo, setPageNo] = useState(1);

  const { data, isValidating, mutate } = useSWRFetch<FeeTransactionDataType>(
    staffId && `staff/payment/${staffId}?perPage=10&pageNo=${pageNo}`
  );

  const handlePrev = () => {
    setPageNo((prev) => (prev <= 1 ? 1 : prev - 1));
  };
  const { data: payment, mutate: overviewMutate } =
    useSWRFetch<PaymentOverviewType>(
      staffId && `staff/payment-overview/${staffId}`
    );
  const recent_payment = [
    {
      id: 1,
      amount: "250000",
      time: "06 Dec, 07:40 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 2,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 3,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 4,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 5,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 6,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 7,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 8,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
    {
      id: 9,
      amount: "150000",
      time: "01 Dec, 06:30 PM",
      sentFrom: "",
      sentTo: "XXX9342498",
    },
  ];

  return (
    <>
      {" "}
      <div className="w-full md:p-6 p-2 rounded-xl gap-8 flex flex-col">
        <div className="w-full gap-8 flex flex-wrap justify-between">
          <h1 className="text-4xl font-semibold tracking-wide text-theme">
            Overview
          </h1>
        </div>
        <div className="flex flex-col gap-1.5">
          <p className="font-semibold text-lg text-theme">
            Total Salary Paid This Year
          </p>
          <p className="text-4xl font-bold text-theme">
            {MoneyFormat(payment?.data?.totalAmountPaidThisYear || 0)}
          </p>
          <div className="flex w-1/2 pt-3 gap-5">
            <StaffPaymentDialog
              staffId={staffId}
              mutate={mutate}
              overviewMutate={overviewMutate}
            />
          </div>
        </div>
      </div>{" "}
      <div className="w-full flex flex-col md:px-6">
        <div className="w-full flex items-center justify-between">
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
          <p className="md:text-sm text-xs text-themeSecondary">
            Recent Payments
          </p>
          <div className="w-full flex flex-col gap-5 h-96 overflow-hidden overflow-y-scroll">
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
                    <Avatar
                      className="!bg-theme md:!w-[3rem] md:!h-[3rem]"
                      // sx={{
                      //   width: "3rem",
                      //   height: "3rem",
                      //   backgroundColor: "#5B50A1",
                      // }}
                    >
                      ₹
                    </Avatar>
                  </div>
                  <div className="flex justify-between w-full">
                    <div className="flex flex-col">
                      <p className=" font-semibold md:text-base text-xs">
                        {" "}
                        XXXXXX
                        {item?._id?.slice(0, Math.floor(item?._id?.length / 2))}
                      </p>
                      <p className="text-xs text-gray-500">
                        {dayjs(item?.createdAt).format("LLL")}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-themeSecondary font-semibold md:text-sm text-xs">
                        {item?.paymentMethod}
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <p className="text-themeSecondary font-semibold text-sm">
                        ₹{item.amount}
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
    </>
  );
};

export default StaffTransactions;
