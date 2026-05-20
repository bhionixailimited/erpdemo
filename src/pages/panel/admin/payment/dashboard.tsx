import { Avatar, Button } from "@mui/material";
import { RevenueIcon } from "assets/static-icon";
import PaymentDashboardCard from "components/admin/dashboard/PaymentDashboardCard";
import dayjs from "dayjs";
import { useSWRFetch, withProtectedAdmin } from "hooks";
// import {
//   // CallOutTable,
//   // InStoreTable,
//   // MailTable,
//   PaymentDashboardCard,
//   // RevenueCardTable,
// } from "components/dashboard";
import { PrivateLayout } from "layouts";
import { DateRangePicker } from "materialui-daterange-picker";
import { useState } from "react";
import { MoneyFormat } from "utils";
const Payment = () => {
  const { data, mutate, isValidating } = useSWRFetch<any>(
    "dashboard/admin/finance-stat"
  );

  const [tabelData] = useState([
    {
      sl: "1",
      productName: "iphone14 pro",
      totalPrice: "£ 54.00",
      email: "vs@tsmart.uk",
      storeName: "VS@tsmart.com",
      displayName: "Alpha Mobile",
      quantity: "2",
      timestamp: new Date(),
      status: "INITIATED",
    },
  ]);
  const [activeTable, setActiveTable] = useState(0);
  // const [dateRange, setDateRange] = useState({
  //   startDate: dayjs().toDate(),
  //   endDate: dayjs().toDate(),
  // });
  const [open, setOpen] = useState(false);
  const toggle = () => setOpen(!open);
  return (
    <PrivateLayout title="Payment">
      <div className="m-5">
        {/* <Button
          variant="contained"
          className=" !text-bold !bg-theme !text-sm"
          onClick={() => setOpen(true)}
        >
          Choose Date Range
        </Button>
        <div className="mt-4">
          <DateRangePicker
            wrapperClassName="date-range-picker-wrapper"
            closeOnClickOutside={true}
            open={open}
            toggle={toggle}
            onChange={(range: any) => setDateRange(range)}
            definedRanges={[
              // {
              //   label: "Today",
              //   startDate: new Date(),
              //   endDate: new Date(),
              // },
              {
                label: "Yesterday",
                startDate: dayjs().subtract(1, "day").toDate(),
                endDate: dayjs().subtract(1, "day").toDate(),
              },
              {
                label: "Last 7 Days",
                startDate: dayjs().subtract(7, "days").toDate(),
                endDate: dayjs().toDate(),
              },
              {
                label: "Last 15 Days",
                startDate: dayjs().subtract(15, "days").toDate(),
                endDate: dayjs().toDate(),
              },
              {
                label: "Last 30 Days",
                startDate: dayjs().subtract(30, "days").toDate(),
                endDate: dayjs().toDate(),
              },
              {
                label: "This Month",
                startDate: dayjs().startOf("month").toDate(),
                endDate: dayjs().endOf("month").toDate(),
              },
              {
                label: "Last Month",
                startDate: dayjs()
                  .subtract(1, "month")
                  .startOf("month")
                  .toDate(),

                endDate: dayjs().subtract(1, "month").endOf("month").toDate(),
              },
              {
                label: "Last 365 Days",
                startDate: dayjs().subtract(365, "days").toDate(),

                endDate: dayjs().toDate(),
              },
            ]}
          />
        </div> */}
        <div className="grid grid-cols-12 content-between gap-6  py-7 ">
          <PaymentDashboardCard
            onClick={() => setActiveTable(0)}
            title="Total Revenue"
            iconClassName="bg-white px-2 py-2"
            content={MoneyFormat(data?.data?.totalRevenue || 0)}
            headingClassName="flex h-full w-2/3 flex-col "
            titleClassName=" !text-white font-bold text-base "
            contentClassName=" !text-white  text-3xl font-bold"
            className=" flex  cursor-pointer flex-row-reverse rounded-3xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-theme  sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover: scale-95 "
            icon={<Avatar variant="rounded" src={RevenueIcon.src} />}
            // clickableRoute="/panel/admin/users/customers"
          />
          {/* <PaymentDashboardCard
            selected={Boolean(activeTable === 1)}
            // onClick={() => setActiveTable(1)}
            title="Fees Revenue"
            iconClassName="bg-theme  px-1 py-1"
            content="₹ 1,45,547"
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName="   font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className=" flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95 "
            icon={
              <Avatar
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/845/845813.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians"
          /> */}
          {/* <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Inventory Revenue"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content="₹ 33,350"
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/4249/4249031.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          /> */}
          {/* <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Grants Revenue"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content="₹ 33,350"
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/2638/2638036.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          /> */}
          {/* <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Donations Revenue"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content="₹ 33,350"
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/3349/3349234.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          /> */}
          {/* <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Others Revenue"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content="₹ 45,350"
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/660/660662.png "
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          /> */}
          <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Total Credited"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content={MoneyFormat(data?.data?.totalCredit || 0)}
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                className="text-white"
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/3522/3522554.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          />
          <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Total Debited"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content={MoneyFormat(data?.data?.totalDebit || 0)}
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName="text-theme  text-3xl font-bold"
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                variant="rounded"
                className="text-white"
                src="https://cdn-icons-png.flaticon.com/128/2424/2424710.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          />
          <PaymentDashboardCard
            // selected={Boolean(activeTable === 2)}
            title="Profit / Loss"
            onClick={() => setActiveTable(2)}
            iconClassName="bg-theme  px-1 py-1 "
            content={MoneyFormat(data?.data?.profitLoss)}
            headingClassName="flex h-full w-2/3 flex-col"
            titleClassName=" font-bold text-base pt-2 text-black"
            contentClassName={`${
              data?.data?.profitLoss > 0 ? `text-green-500` : "text-red-500"
            }  text-3xl font-bold `}
            className="flex  cursor-pointer flex-row shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  items-start justify-between gap-4 p-6 col-span-12  bg-white rounded-lg sm:col-span-12 md:col-span-6 lg:col-span-4 transition-all duration-500 ease-in-out hover:scale-95   "
            icon={
              <Avatar
                variant="rounded"
                src="https://cdn-icons-png.flaticon.com/128/4647/4647712.png"
              />
            }
            // clickableRoute="/panel/admin/users/technicians-request"
          />
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(Payment);
