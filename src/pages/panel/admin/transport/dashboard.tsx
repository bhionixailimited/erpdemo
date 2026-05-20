import {
  InventoryCards,
  TotalStaffCards,
  TransportCards,
} from "components/admin";
import {
  ColumnChartUserDashboard,
  StudentDistribution,
  StudentDonutChart,
} from "components/admin/analytics";
import DashboardRadialBar from "components/admin/analytics/DashboardRadialBar";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";

const Dashboard = () => {
  const {
    data: transport,
    mutate,
    isValidating,
  } = useSWRFetch<any>("dashboard/admin/transport-stat");
  return (
    <div className="w-full">
      <PrivateLayout title="Transport | Dashboard">
        <>
          <TransportCards />
          <div className="grid grid-cols-12 content-between gap-4  p-6 ">
            {!transport?.data ? (
              <div
                className={
                  "col-span-12  gap-4 rounded-xl border items-center bg-white shadow-lg  md:col-span-12 lg:col-span-5 h-full"
                }
              >
                <h2 className="flex flex-col text-left mt-3 font-semibold text-lg px-4 ">
                  Vehicles Overview
                </h2>
                <Empty title={"No data found"} />
              </div>
            ) : (
              <StudentDonutChart
                pieLabel={["Active", "In Active"]}
                pieSeries={
                  [
                    transport?.data?.activeVehicle || 0,
                    transport?.data?.inactive || 0,
                  ] || []
                }
                title={"Vehicles Overview"}
                className={
                  "col-span-12 p-6 mt-3 gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-5"
                }
              />
            )}

            {/* <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
              <ColumnChartUserDashboard
                type={"bar"}
                categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]}
                series={[
                  {
                    name: "Active",
                    data: [44, 55, 57, 56, 61, 58],
                  },
                  {
                    name: "In Active",
                    data: [14, 20, 25, 19, 22, 25],
                  },
                ]}
                title={"Vehicles Report"}
                className={"col-span-12   gap-10  flex flex-col "}
              />
            </div> */}
            {/* <div className="col-span-12 gap-2 md:col-span-12 lg:col-span-4 rounded-xl border shadow-xl bg-white">
          <DashboardRadialBar type="radialBar" radialLabel={["Teaching Staffs", "Non Teaching Staffs"]} radialSeries={[75,65]} totalReturn={557} title={"Staffs Overview"} />  
          </div> */}
          </div>
        </>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Dashboard);
