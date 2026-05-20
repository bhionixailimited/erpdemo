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
import { useSWRFetch } from "hooks";
import AdmissionDashboardCard from "../AdmissionDashboardCard";

const StudentCards = () => {
  const {
    data: admissions,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/get-all-student-report");
  const data = [
    {
      title: "Students Added",
      iconClassName: "bg-theme px-2 py-2 ",
      content: admissions?.data?.totalStudent || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/1358/1358656.png"}
        />
      ),
      clickableRoute: "/panel/admin/student",
    },
    {
      title: "Total Boys",
      iconClassName: "bg-theme px-2 py-2 ",
      content: admissions?.data?.totalMale || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/3750/3750019.png"}
        />
      ),
      clickableRoute: "/panel/admin/student",
    },
    {
      title: "Total Girls",
      iconClassName: "bg-theme px-2 py-2 ",
      content: admissions?.data?.totalFemale || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/3270/3270918.png"}
        />
      ),
      clickableRoute: "/panel/admin/student",
    },
    {
      title: "Others",
      iconClassName: "bg-theme px-2 py-2 ",
      content: admissions?.data?.totalOther || 0,
      titleClassName: "text-black font-bold text-base pt-2",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-3  transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/3270/3270918.png"}
        />
      ),
      clickableRoute: "/panel/admin/student",
    },
  ];

  return (
    <div className="grid grid-cols-12 content-between gap-6 p-6 ">
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

export default StudentCards;
