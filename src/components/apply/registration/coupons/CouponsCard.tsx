import { Delete, Edit } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import CouponType from "types/coupon";
import { notify } from "utils";
import CouponsViewDialog from "./CouponsViewDialog";

type Props = {
  _id: string;
  item: CouponType;
  editCoupon: () => void;
  mutate?: KeyedMutator<any>;
  refetch?: boolean;
};

export default function CouponsCard({
  _id,
  item,
  editCoupon,
  mutate,
  refetch,
}: //   onClick,
Props) {
  const router = useRouter();

  const { mutate: Coupon } = useFetch();

  const copyToClipboard = (data: string) => {
    var copyText = data;
    navigator.clipboard.writeText(copyText).then(() => {
      alert("Copied to clipboard");
    });
  };

  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await Coupon({
              path: `/coupon/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className=" w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden shadow-md  rounded-xl">
      <div className="absolute right-0 top-0 h-16 w-16">
        <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
          {item?.discountPercentage || 0}% off
        </div>
      </div>
      <div className="bg-gradient-to-r from-indigo-500 to-violet-500 text-white p-8 rounded-lg shadow-lg w-full mx-auto">
        <div className="text-3xl font-bold mb-4">{item?.name}</div>
        <div className="text-lg mb-4">
          <span className={`${item?.isActive ? "text-yellow-400" : "text-red-500"} font-bold`}>
            {item?.isActive ? "ACTIVE" : "INACTIVE"}
          </span>
        </div>
        <div className="text-base mb-4">Use coupon code:</div>
        <div className="bg-white text-gray-800 rounded-lg px-4 py-2 flex items-center justify-between">
          <span className="text-2xl font-semibold">
            {item?.code || "NOCODE"}
          </span>

          <button
            className="bg-blue-800 text-white px-3 py-1 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => copyToClipboard(item?.code || "")}
          >
            Copy
          </button>
        </div>
        <div className="text-sm mt-4">
          <p>
            Max Discount:{" "}
            <span className="font-semibold">{item?.maxDiscount || 0}</span>
          </p>
          <p>
            Min Amount To Apply:{" "}
            <span className="font-semibold">{item?.minAmountToApply || 0}</span>
          </p>
          <p>
            Valid from{" "}
            <span className="font-semibold">
              {dayjs(item?.applicableDate || "Not Given").format(
                " ddd, MMM D, YYYY "
              )}
            </span>
          </p>
          <p>
            Valid until{" "}
            <span className="font-semibold">
              {dayjs(item?.expiryDate || "Not Given").format(
                " ddd, MMM D, YYYY "
              )}
            </span>
          </p>
        </div>
      </div>

      <div className="absolute bottom-[-86px] group-hover:bottom-0  duration-300 transition-all ease-in-out right-0 h-20 w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
        <div className="w-full grid grid-cols-3 h-full">
          <span className="w-full">
            <CouponsViewDialog couponInfo={_id} refetch={refetch} />
          </span>
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500 w-full  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
            onClick={editCoupon}
          >
            <Tooltip title="Edit Coupon">
              <Edit />
            </Tooltip>
          </span>
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-red-500 w-full text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => handleDelete(_id)}
          >
            <Tooltip title="Delete Coupon">
              <Delete />
            </Tooltip>
          </span>
        </div>
      </div>
    </div>
  );
}
