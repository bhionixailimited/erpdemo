import { Avatar } from "@mui/material";
import { useSWRFetch } from "hooks";
import InventoryDashboardCard from "../InventoryDashboardCard";

const AdmissionCards = () => {
  const {
    data: inventory,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/inventory-stat");

  const data = [
    {
      title: "Total Sales",
      iconClassName: "bg-theme",
      content: inventory?.data?.totalSold || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/1389/1389181.png"}
        />
      ),
      clickableRoute: "/panel/admin/inventory/manage-stock",
    },
    {
      title: "Today Sales",
      iconClassName: "bg-theme",
      content: inventory?.data?.todaySold || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/512/1831/1831655.png"}
        />
      ),
      clickableRoute: "/panel/admin/inventory/manage-stock",
    },
    {
      title: "Out Of Stock",
      iconClassName: "bg-theme",
      content: inventory?.data?.outOfStock || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/5229/5229341.png"}
        />
      ),
      clickableRoute: "/panel/admin/inventory/manage-stock",
    },
    {
      title: "Remaining Stock",
      iconClassName: "bg-theme",
      content: inventory?.data?.inStock || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/7444/7444292.png"}
        />
      ),
      clickableRoute: "/panel/admin/inventory/manage-stock",
    },
  ];

  return (
    //   <div className="grid grid-cols-12 content-between gap-6 px-6 pt-5 py-2  ">
    <div className="grid grid-cols-1 md:grid-cols-4 content-between gap-6 px-6 pt-5 py-2">
      {data?.map((item, index) => (
        <InventoryDashboardCard
          key={index}
          title={item?.title}
          iconClassName={item?.iconClassName}
          content={item?.content}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={item?.className}
          icon={item?.icon}
          clickableRoute={item?.clickableRoute}
        />
      ))}
    </div>
    //   </div>
  );
};

export default AdmissionCards;
