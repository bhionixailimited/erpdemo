import { Avatar } from "@mui/material";
import {
  AndroidIcon,
  IosIcon,
  LinuxIcon,
  OtherVisitorIcon,
  VisitorsIcon,
  WindowsIcon,
} from "assets/static-icon";
import { useSWRFetch } from "hooks";
import { VisitorsCount } from "..";
type Analytics = {
  data: {
    _id: string;
    totalUser: number;
  }[];
};
const VisitorAnalytics = () => {
  const { data: v } = useSWRFetch<Analytics>(
    "dashboard/admin/page-view-status"
  );

  return (
    <div className=" col-span-12  !border-grey-500 !shadow-xl rounded-xl bg-white border   md:col-span-12 lg:col-span-7">
      <h2 className="px-5 mt-3  text-lg font-bold">Page View Status</h2>
      <div className="grid grid-cols-12 px-4  content-between gap-3  py-6">
        <VisitorsCount
          title="Total Visitors"
          content={
            v?.data?.reduce(
              (acc, currentValue) => acc + currentValue?.totalUser,
              0
            ) || 0
          }
          // iconClassName="bg-sky-200"
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-6"
          // icon={<People className="  text-pink-600 !text-3xl" />}
          icon={<Avatar className="!h-11 !w-11 p-1" src={VisitorsIcon.src} />}
        />
        <VisitorsCount
          title="From Android"
          content={
            v?.data
              ?.map((item) => {
                return {
                  name: item?._id?.toLowerCase(),
                  totalUser: item?.totalUser,
                };
              })
              ?.filter((item) => item?.name === "android")
              ?.reduce(
                (acc, currentValue) => acc + currentValue?.totalUser,
                0
              ) || 0
          }
          // iconClassName="bg-sky-200"
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-6"
          // icon={<People className="  text-pink-600 !text-3xl" />}
          icon={<Avatar className="!h-11 !w-11 p-1" src={AndroidIcon.src} />}
        />
        <VisitorsCount
          title="From IOS"
          content={
            v?.data
              ?.map((item) => {
                return {
                  name: item?._id?.toLowerCase(),
                  totalUser: item?.totalUser,
                };
              })
              ?.filter((item) => item?.name === "ios")
              ?.reduce(
                (acc, currentValue) => acc + currentValue?.totalUser,
                0
              ) || 0
          }
          // iconClassName="bg-sky-200"
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-6"
          // icon={<People className="  text-pink-600 !text-3xl" />}
          icon={<Avatar className="!h-11 !w-11 p-1" src={IosIcon.src} />}
        />
        <VisitorsCount
          title="From Windows"
          content={
            v?.data
              ?.map((item) => {
                return {
                  name: item?._id?.toLowerCase(),
                  totalUser: item?.totalUser,
                };
              })
              ?.filter((item) => item?.name === "windows")
              ?.reduce(
                (acc, currentValue) => acc + currentValue?.totalUser,
                0
              ) || 0
          }
          // iconClassName="bg-sky-200"
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-6"
          // icon={<People className="  text-pink-600 !text-3xl" />}
          icon={
            <Avatar
              className="!h-11 !w-11 p-1 !object-contain"
              src={WindowsIcon.src}
            />
          }
        />{" "}
        <VisitorsCount
          title="From Linux"
          content={
            v?.data
              ?.map((item) => {
                return {
                  name: item?._id?.toLowerCase(),
                  totalUser: item?.totalUser,
                };
              })
              ?.filter((item) => item?.name === "linux")
              ?.reduce(
                (acc, currentValue) => acc + currentValue?.totalUser,
                0
              ) || 0
          }
          // iconClassName="bg-sky-200"
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-6"
          // icon={<People className="  text-pink-600 !text-3xl" />}
          icon={<Avatar className="!h-11 !w-11 p-1" src={LinuxIcon.src} />}
        />
        <VisitorsCount
          title="Other Visitors"
          content={
            v?.data
              ?.map((item) => {
                return {
                  name: item?._id?.toLowerCase(),
                  totalUser: item?.totalUser,
                };
              })
              ?.filter(
                (item) =>
                  !["linux", "windows", "android", "ios"]?.includes(item?.name)
              )
              ?.reduce(
                (acc, currentValue) => acc + currentValue?.totalUser,
                0
              ) || 0
          }
          // iconClassName="bg-sky-200"
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-6"
          // icon={<People className="  text-pink-600 !text-3xl" />}
          icon={
            <Avatar className="!h-11 !w-11 p-1 " src={OtherVisitorIcon.src} />
          }
        />
      </div>
    </div>
  );
};

export default VisitorAnalytics;
