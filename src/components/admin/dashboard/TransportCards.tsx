import { Avatar } from "@mui/material";
import { StaffIcon, VehicleIcon } from "assets/static-icon";
import { useSWRFetch } from "hooks";
import InventoryDashboardCard from "../InventoryDashboardCard";

const TransportCards = () => {
  const {
    data: transport,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/transport-stat");

  const data = [
    {
      title: "Total Vehicles",
      iconClassName: "bg-theme",
      content: transport?.data?.totalVehicle || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: <Avatar variant="rounded" src={VehicleIcon.src} />,
      clickableRoute: "/panel/admin/transport/manage-vehicle",
    },
    {
      title: "Active Vehicles",
      iconClassName: "bg-theme",
      content: transport?.data?.activeVehicle || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/1023/1023464.png"}
        />
      ),
      clickableRoute: "/panel/admin/transport/manage-vehicle",
    },
    {
      title: "Total Drivers",
      iconClassName: "bg-theme",
      content: transport?.data?.totalDriver || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/3410/3410154.png"}
        />
      ),
      clickableRoute: "/panel/admin/transport/manage-drivers",
    },
    // {
    //   title: "Others",
    //   iconClassName: "bg-theme",
    //   content: "35",
    //   titleClassName: "text-black font-bold text-base ",
    //   contentClassName: "text-theme  text-3xl font-bold",
    //   className:
    //     "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
    //   icon: <Avatar variant="rounded" src={StaffIcon.src} />,
    //   clickableRoute: "/panel/admin/student/dashboard",
    // },
  ];

  return (
    //   <div className="grid grid-cols-12 content-between gap-6 px-6 pt-5 py-2  ">
    <div className="grid grid-cols-1 md:grid-cols-3 content-between gap-6 px-6 pt-5 py-2">
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

export default TransportCards;
