import { Avatar, Divider, Button } from "@mui/material";
import {
  BankIcon,
  HRIcon,
  InventoryIcon,
  LibraryIcon,
  OtherIcon,
  StudentsIcon,
} from "assets/static-icon";
import { useSWRFetch } from "hooks";
import DepartmentStaff from "../DepartmentStaff";
import { Empty } from "components/core";
import { ChevronRight } from "@mui/icons-material";
import { useRouter } from "next/router";

const DepartmentAnalytics = ({
  isSuperAdmin = false,
}: {
  isSuperAdmin?: boolean;
}) => {
  const { data: d, isValidating } = useSWRFetch<any>(
    "dashboard/admin/department-report"
  );
  const { push } = useRouter();

  return (
    <div className=" col-span-12 mt-2 !border-grey-500 !shadow-xl rounded-xl bg-white border   md:col-span-12 lg:col-span-7">
      <h2 className="px-5 mt-3  text-lg font-bold">Department Staffs</h2>
      <div className="grid grid-cols-12 px-4  content-between gap-3  py-6">
        {!d?.data?.length ? (
          <div className="col-span-12 w-full">
            <Empty title={"No Department Found"} />
          </div>
        ) : (
          d?.data
            ?.slice(0, 6)
            ?.map((item: any, i: number) => (
              <DepartmentStaff
                key={i}
                title={`${item?.title}` || ""}
                content={item?.totalUser || 0}
                titleClassName=" text-pink-600"
                contentClassName="text-pink-600"
                className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
                icon={
                  <Avatar
                    className="!h-11 !w-11 p-1"
                    src={item?.iconUrl || StudentsIcon.src}
                  />
                }
                loading={isValidating}
              />
            ))
        )}
        {/* <DepartmentStaff
          title="HR"
          content={"5"}
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
          icon={<Avatar className="!h-11 !w-11 p-1" src={HRIcon.src} />}
        />
        <DepartmentStaff
          title="Library "
          content={"25"}
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
          icon={<Avatar className="!h-11 !w-11 p-1" src={LibraryIcon.src} />}
        />
        <DepartmentStaff
          title="Finance"
          content={"15"}
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
          icon={
            <Avatar
              className="!h-11 !w-11 p-1 !object-contain"
              src={BankIcon.src}
            />
          }
        />{" "}
        <DepartmentStaff
          title="Transport"
          content={"54"}
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
          icon={<Avatar className="!h-11 !w-11 p-1" src={InventoryIcon.src} />}
        />
        <DepartmentStaff
          title="Other Staffs"
          content={"2545"}
          titleClassName="text-pink-600"
          contentClassName="text-pink-600"
          className="col-span-12 w-full  sm:col-span-12 md:col-span-6 lg:col-span-4"
          icon={<Avatar className="!h-11 !w-11 p-1 " src={OtherIcon.src} />}
        /> */}
      </div>
      <Divider />
      {!isSuperAdmin ? (
        <div className="!text-end p-5">
          <Button
            onClick={() => push("/panel/admin/department")}
            size="small"
            className="!font-bold !text-slate-600 !ml-0!text-xs normal-case"
            endIcon={<ChevronRight className=" !text-2xl " />}
          >
            View All
          </Button>
        </div>
      ) : null}
    </div>
  );
};

export default DepartmentAnalytics;
