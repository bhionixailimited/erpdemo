import { ArrowBack, ArrowForward } from "@mui/icons-material";
import { Avatar, IconButton, Pagination } from "@mui/material";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { StaffPaymentType } from "types/staffpayment";
import { PaymentSkeleton } from "./skeleton";
import { useState } from "react";
type dataType = {
  data: StaffPaymentType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const PaymentTransactions = ({ _id }: any) => {
  const [pageNo, setPageNo] = useState(1);
  const { data, error, isValidating, mutate } = useSWRFetch<dataType>(
    `staff/payment/${_id}?perPage=15&pageNo=${pageNo}`
  );

  return (
    <div className="w-full flex flex-col px-6">
      {/* <div className="w-full flex items-center justify-between">
        <p className="text-xl font-semibold">All transaction</p>
        <div className="flex gap-8">
          <IconButton className="bg-themeSecondary/10 py-1.5 px-2 cursor-pointer rounded-lg !text-theme">
            <ArrowBack />
          </IconButton>
          <IconButton className="bg-themeSecondary/10 py-1.5 px-2 cursor-pointer  rounded-lg !text-theme">
            <ArrowForward />
          </IconButton>
        </div>
      </div> */}
      <div className="flex flex-col w-full gap-4 mt-2">
        {/* <p className="text-md text-themeSecondary font-semibold">
          Recent Payments
        </p> */}
        <div className="w-full flex flex-col gap-5 ">
          {isValidating ? (
            <PaymentSkeleton i={10} />
          ) : data?.data && data?.data?.length > 0 ? (
            data?.data?.map((item) => (
              <div
                className="px-4 py-2 rounded-lg w-full flex gap-2  justify-start items-center "
                key={item?._id}
              >
                <div className="w-fit">
                  <Avatar
                    sx={{
                      width: "3rem",
                      height: "3rem",
                      backgroundColor: "#5B50A1",
                    }}
                  >
                    {item && "X"}
                  </Avatar>
                </div>
                <div className="flex justify-between w-full">
                  <div className="flex flex-col">
                    <p className=" font-semibold text-base">{item?._id}</p>
                    <p className="text-xs text-gray-500">
                      {dayjs(item?.createdAt).format("MMM D, YYYY h:mm A")}
                    </p>
                  </div>
                  {/* <div className="flex items-center justify-center">
                    <p className="text-theme font-bold text-sm">
                      {item?.paymentMonth
                        ? dayjs(item?.paymentMonth).format("l")
                        : ""}
                    </p>
                  </div> */}
                  <div className="flex items-center justify-center">
                    <p className="text-theme font-bold text-sm">
                      {item?.paymentMethod}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-theme font-bold text-sm">
                      {item?.paymentType}
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
            <Empty title={"No Payment History Found"} />
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
    </div>
  );
};

export default PaymentTransactions;
