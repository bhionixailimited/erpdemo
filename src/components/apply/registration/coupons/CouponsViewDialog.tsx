import { Info } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { CustomDialog } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useEffect, useState } from "react";
import CouponType from "types/coupon";

type dataType = {
  data: CouponType;
};
const CouponsViewDialog = ({ couponInfo, refetch }: any) => {
  const copyToClipboard = (data: string) => {
    var copyText = data;
    navigator.clipboard.writeText(copyText).then(() => {
      alert("Copied to clipboard");
    });
  };

  const {
    data: coupon,
    mutate: couponMutate,
    isValidating,
  } = useSWRFetch<dataType>(`/coupon/${couponInfo}`);

  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    couponMutate();
  }, [refetch]);
  return (
    <>
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
      >
        <div className=" w-full cursor-pointer relative group  overflow-hidden shadow-md  rounded-xl">
          <div className="absolute right-0 top-0 h-16 w-16">
            <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
              {coupon?.data?.discountPercentage || 0}% off
            </div>
          </div>
          <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-8 rounded-lg shadow-lg w-full mx-auto">
            <div className="text-3xl font-bold mb-4">{coupon?.data?.name}</div>
            <div className="text-lg mb-4">
              <span className={`${coupon?.data?.isActive ? "text-yellow-400" : "text-red-500"} font-bold`}>
                {coupon?.data?.isActive ? "ACTIVE" : "INACTIVE"}
              </span>
            </div>
            <div className="text-base mb-4">Use coupon code:</div>
            <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
              <span className="text-2xl font-semibold">
                {coupon?.data?.code || "NOCODE"}
              </span>
              <button
                className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => copyToClipboard(coupon?.data?.code || "")}
              >
                Copy
              </button>
            </div>
            <div className="text-sm mt-4">
              <p>
                Max Discount:{" "}
                <span className="font-semibold">
                  {coupon?.data?.maxDiscount || 0}
                </span>
              </p>
              <p>
                Min Amount To Apply:{" "}
                <span className="font-semibold">
                  {coupon?.data?.minAmountToApply || 0}
                </span>
              </p>
              <p>
                Valid from{" "}
                <span className="font-semibold">
                  {dayjs(coupon?.data?.applicableDate || "Not Given").format(
                    " ddd, MMM D, YYYY "
                  )}
                </span>
              </p>
              <p>
                Valid until{" "}
                <span className="font-semibold">
                  {dayjs(coupon?.data?.expiryDate || "Not Given").format(
                    " ddd, MMM D, YYYY "
                  )}
                </span>
              </p>
            </div>
          </div>
        </div>
      </CustomDialog>
      <span
        onClick={() => setOpenDialog(true)}
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-orange-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
      >
        <Tooltip title="View Coupon Info">
          <Info />
        </Tooltip>
      </span>
    </>
  );
};

export default CouponsViewDialog;
