import { Avatar } from "@mui/material";
import {
  DepartmentIcon,
  GrievancesIcon,
  PlacementIcon,
  RevenueIcon,
  StaffIcon,
  StockIcon,
  StudentIcon,
  StudentsIcon,
  VehicleIcon,
} from "assets/static-icon";
import { useSWRFetch } from "hooks";
import AdmissionDashboardCard from "../AdmissionDashboardCard";

const AdmissionCards = () => {
  const {
    data: transport,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/placement-stat");

  const data = [
    {
      title: "Placed Students",
      iconClassName: "bg-theme px-2 py-2 ",
      content: transport?.data?.totalPlacedStudent || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/4336/4336928.png"}
        />
      ),
      clickableRoute: "/panel/admin/student/dashboard",
    },
    {
      title: "Boys Placed",
      iconClassName: "bg-theme px-2 py-2 ",
      content: transport?.data?.totalBoysPlaced || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/2990/2990662.png"}
        />
      ),
      clickableRoute: "/panel/admin/student/dashboard",
    },
    {
      title: "Girls Placed",
      iconClassName: "bg-theme px-2 py-2 ",
      content: transport?.data?.totalGirlPlaced || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/4329/4329447.png"}
        />
      ),
      clickableRoute: "/panel/admin/student/dashboard",
    },
  ];

  return (
    <div className="grid grid-cols-12 content-between gap-6 px-6 pt-5 py-2  ">
      {data?.map((item, index) => (
        <AdmissionDashboardCard
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
  );
};

export default AdmissionCards;
