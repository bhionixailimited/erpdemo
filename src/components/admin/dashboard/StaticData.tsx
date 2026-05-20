import {
  CurrencyRupee,
  Group,
  Groups,
  LocalShipping,
  Money,
  Person,
} from "@mui/icons-material";
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
import { useAuth, useSWRFetch } from "hooks";
import { MoneyFormat } from "utils";
import InfoCards from "../InfoCards";
import SessionAdmission from "../SessionAdmission";

const StaticData = () => {
  const { data: cardsData, isValidating } = useSWRFetch<any>(
    "dashboard/admin/dashboard-stat?startDate=124512589636&endDate=124512588636"
  );
  const { user } = useAuth();

  const { data: admission } = useSWRFetch<any>("dashboard/admin/new-admission");
  const data = [
    {
      title: "Total Students",
      iconClassName: "bg-[#f3f8f2] group-hover:bg-theme ",
      content: cardsData?.data?.totalStudent || 0,
      titleClassName: "text-slate-600 font-bold text-base",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          // className="!h-10 !w-11 "
          src={StudentsIcon.src}
        />
        // <Groups className="h-7 w-7 rounded-md group-hover:text-white  text-theme" />
      ),
      clickableRoute: "/panel/admin/student/dashboard",
    },
    {
      title: "Total Staffs",
      iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
      content: cardsData?.data?.totalStaff + cardsData?.data?.totalTeacher || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          // className="!h-10 !w-11 !object-cover "
          src={StaffIcon.src}
        />
      ),
      clickableRoute: "/panel/admin/staff/dashboard",
    },
    {
      title: "Total Stocks",
      iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
      content: cardsData?.data?.totalStock || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: <Avatar variant="rounded" src={StockIcon.src} />,

      clickableRoute: "/panel/admin/inventory/dashboard",
    },
    // {
    //   title: "Monthly Revenue",
    //   iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
    //   content: "₹ 203,74.00",
    //   titleClassName: "text-slate-600 font-bold text-base ",
    //   contentClassName: "text-black font-bold",
    //   className:
    //     "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
    //   icon: (
    //     <CurrencyRupee className="h-7 w-7 rounded-md group-hover:text-white  text-theme" />
    //   ),
    //   clickableRoute: "/panel/admin/payment/dashboard",
    // },
    {
      title: "Total Revenue",
      iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
      content: MoneyFormat(cardsData?.data?.totalRevenue || 0),
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: <Avatar variant="rounded" src={RevenueIcon.src} />,
      clickableRoute: "/panel/admin/payment/dashboard",
    },
    {
      title: "Departments",
      iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
      content: cardsData?.data?.totalDepartments || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: <Avatar variant="rounded" src={DepartmentIcon.src} />,
      clickableRoute: "/panel/admin/department/dashboard",
    },
    {
      title: "Placements",
      iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
      content: cardsData?.data?.totalPlacement || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: <Avatar variant="rounded" src={PlacementIcon.src} />,
      clickableRoute: "/panel/admin/placement/dashboard",
    },
    {
      title: "Active Vehicles",
      iconClassName: "!bg-[#f3f8f2]  group-hover:!bg-theme",
      content: cardsData?.data?.totalActiveVehicle || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: <Avatar variant="rounded" src={VehicleIcon.src} />,
      clickableRoute: "/panel/admin/transport/dashboard",
    },
    {
      title: "New Admissions",
      iconClassName: "!bg-[#f3f8f2]  group-hover:!bg-theme",
      content: admission?.data?.totalNewAdmission || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: <Avatar variant="rounded" src={StudentIcon.src} />,
      clickableRoute: "/panel/admin/admission/dashboard",
    },
    // {
    //   title: "Grievances",
    //   iconClassName: "!bg-[#f3f8f2]  group-hover:!bg-theme",
    //   content: "0",
    //   titleClassName: "text-slate-600 font-bold text-base ",
    //   contentClassName: "text-black font-bold",
    //   className:
    //     "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
    //   icon: <Avatar variant="rounded" src={GrievancesIcon.src} />,
    //   clickableRoute: "/panel/admin/grievance",
    // },
  ];

  return (
    <div className="grid grid-cols-12 content-between gap-6 p-6 ">
      {data?.map((item, index) => (
        <InfoCards
          loading={isValidating}
          key={index}
          title={item?.title}
          iconClassName={item?.iconClassName}
          content={item?.content}
          titleClassName={item?.titleClassName}
          contentClassName={item?.contentClassName}
          className={item?.className}
          icon={item?.icon}
          clickableRoute={
            ["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role))
              ? ""
              : item?.clickableRoute
          }
        />
      ))}
    </div>
  );
};

export default StaticData;
