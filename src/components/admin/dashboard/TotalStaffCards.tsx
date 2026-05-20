import { Avatar } from "@mui/material";
import { StaffIcon } from "assets/static-icon";
import { useSWRFetch } from "hooks";
import InventoryDashboardCard from "../InventoryDashboardCard";

const TotalStaffCards = () => {
  const {
    data: staffs,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/staff-statistic");

  const data = [
    {
      title: "New Staffs Added",
      iconClassName: "bg-theme",
      content: staffs?.data?.totalNewStaff || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/4727/4727424.png"}
        />
      ),
      // clickableRoute: "/panel/admin/student/dashboard",
    },
    {
      title: "Staffs On Leave",
      iconClassName: "bg-theme",
      content: staffs?.data?.totalAbsent || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/3387/3387188.png"}
        />
      ),
      clickableRoute: "/panel/admin/staff/leave-management",
    },
    {
      title: "Teaching Staffs",
      iconClassName: "bg-theme",
      content: staffs?.data?.totalTeachingStaff || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: (
        <Avatar
          variant="rounded"
          src={"https://cdn-icons-png.flaticon.com/128/906/906175.png"}
        />
      ),
      clickableRoute: "/panel/admin/staff/teaching-staff",
    },
    {
      title: "Non Teaching Staffs",
      iconClassName: "bg-theme",
      content: staffs?.data?.totalNonteachingStaff || 0,
      titleClassName: "text-black font-bold text-base ",
      contentClassName: "text-theme  text-3xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 rounded-3xl md:col-span-6 lg:col-span-3   ",
      icon: <Avatar variant="rounded" src={StaffIcon.src} />,
      clickableRoute: "/panel/admin/staff/non-teaching-staff",
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

export default TotalStaffCards;
