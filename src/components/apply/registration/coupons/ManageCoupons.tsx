import { useSWRFetch } from "hooks";
import { useState } from "react";
import CouponType from "types/coupon";
import AddCoupons from "./AddCoupons";
import CouponsCard from "./CouponsCard";
import EditCoupons from "./EditCoupons";

type dataType = {
  data: CouponType[];
};
const ManageCoupons = () => {
  const [editCouponDrawer, setEditCouponDrawer] = useState(false);
  const { data, isValidating, error, mutate } =
    useSWRFetch<dataType>("/coupon");
  const [refetch, setRefetch] = useState(false);
  return (
    <div className="w-full">
      <div className="px-4 mt-4">
        <div className="grid 2xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-4 w-full">
          <div className="w-full  shadow-md  bg-theme rounded-xl ">
            <span
              className={`flex flex-col p-2 2xl:p-4 items-center justify-center text-center h-full`}
            >
              <AddCoupons mutate={mutate} />
            </span>
          </div>
          {data?.data?.map((item) => (
            <CouponsCard
              _id={item?._id}
              key={item?._id}
              item={item}
              editCoupon={() => setEditCouponDrawer(item?._id as any)}
              mutate={mutate}
              refetch={refetch}
            />
          ))}
        </div>
        <EditCoupons
          mutate={mutate}
          open={editCouponDrawer}
          editCouponDrawer={editCouponDrawer}
          onClose={() => {
            setEditCouponDrawer(false);
            setRefetch((prev) => !prev);
          }}
        />
      </div>
    </div>
  );
};

export default ManageCoupons;
