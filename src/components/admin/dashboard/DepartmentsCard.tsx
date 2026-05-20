import { Avatar } from "@mui/material";
import { ClassIcon, DepartmentIcon, StudentsIcon } from "assets/static-icon";
import { TimetableDashboardCard } from "components/core";
import { useSWRFetch } from "hooks";

const DepartmentsCard = () => {
  const {
    data: departments,
    isValidating,
    error,
    mutate,
  } = useSWRFetch<any>("dashboard/admin/department-stat");
  const data = [
    {
      title: "Total Departments",
      iconClassName: "bg-[#f3f8f2] group-hover:bg-theme",
      content: departments?.data[0]?.totalDepartment || 0,
      titleClassName: "text-slate-600 font-bold text-base",
      contentClassName: "text-black  text-xl font-bold",
      className:
        "col-span-12 w-full bg-white sm:col-span-12 md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          src={DepartmentIcon.src}
          alt="Classes"
          sx={{
            objectFit: "contain",
            borderRadius: "1px !important",
          }}
          className="!h-24 !w-24"
        />
      ),
      pathName: "/panel/admin/department",
    },
    {
      title: "Total Department Employees",
      iconClassName: "bg-[#f3f8f2]  group-hover:bg-theme",
      content: departments?.data[0]?.totalEmployee || 0,
      titleClassName: "text-slate-600 font-bold text-base ",
      contentClassName: "text-black text-xl font-bold",
      className:
        "col-span-12 bg-white md:col-span-6 lg:col-span-3 transition-all duration-500 ease-in-out hover:scale-95",
      icon: (
        <Avatar
          src={"https://cdn-icons-png.flaticon.com/128/1642/1642256.png"}
          alt="Batches"
          sx={{
            objectFit: "contain",
            borderRadius: "1px !important",
          }}
          className="!h-24 !w-24"
        />
      ),
      pathName: "/panel/admin/department",
    },
  ];

  return (
    <div className="flex flex-col gap-4 w-full">
      {data?.map((item, index) => (
        <div className="w-full" key={index}>
          <TimetableDashboardCard
            title={item?.title}
            icon={item?.icon}
            content={item?.content}
            contentClassName={item?.contentClassName}
            clickableRoute={item?.pathName}
            className={item?.className}
          />
        </div>
      ))}
    </div>
  );
};

export default DepartmentsCard;
