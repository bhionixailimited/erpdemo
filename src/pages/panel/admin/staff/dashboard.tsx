import { InventoryCards, TotalStaffCards } from "components/admin";
import {
  ColumnChartUserDashboard,
  RadialBarMeter,
  StudentDistribution,
} from "components/admin/analytics";
import DashboardRadialBar from "components/admin/analytics/DashboardRadialBar";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Skeleton } from "@mui/material";
const Dashboard = () => {
  const { data: attendance } = useSWRFetch<any>(
    "dashboard/admin/staff-attendance"
  );
  const { data: staffData, isValidating } = useSWRFetch<any>(
    "dashboard/admin/staff-statistic"
  );
  // const { data: teacher, isValidating } = useSWRFetch<any>(`user?role=TEACHER`);
  // const { data: staff, isValidating: v } = useSWRFetch<any>(`user?role=STAFF`);

  return (
    <div className="w-full">
      <PrivateLayout title="Staff | Dashboard">
        <>
          <TotalStaffCards />
          <div className="grid grid-cols-12 content-between gap-4  p-6 ">
            <div className="col-span-12 gap-2 md:col-span-12 lg:col-span-4 rounded-xl border shadow-xl bg-white">
              <div className="flex flex-col items-center">
                <RadialBarMeter
                  type={"radialBar"}
                  value={Math.round(
                    Number(
                      (Number(staffData?.data?.totalTeachingStaff) /
                        (Number(staffData?.data?.totalTeachingStaff) +
                          Number(staffData?.data?.totalNonteachingStaff))) *
                        100
                    ) || 0
                  )}
                />
                <h3 className="font-semibold text-lg tracking-wide text-center">
                  {isValidating ? (
                    <Skeleton variant="text" width={200} />
                  ) : (
                    "Teaching Department Staffs"
                  )}
                </h3>
                <h3 className="text-4xl font-semibold tracking-wide">
                  {isValidating ? (
                    <Skeleton variant="text" width={80} />
                  ) : (
                    staffData?.data?.totalTeachingStaff || 0
                  )}
                </h3>
              </div>
              <div className="flex flex-col items-center">
                <RadialBarMeter
                  type={"radialBar"}
                  value={Math.round(
                    Number(
                      (Number(staffData?.data?.totalNonteachingStaff) /
                        (Number(staffData?.data?.totalTeachingStaff) +
                          Number(staffData?.data?.totalNonteachingStaff))) *
                        100
                    ) || 0
                  )}
                />
                <h3 className="font-semibold tracking-wide text-center">
                  {isValidating ? (
                    <Skeleton variant="text" width={200} />
                  ) : (
                    "Non-Teaching Department Staffs"
                  )}
                </h3>
                <h3 className="text-4xl font-semibold tracking-wide">
                  {isValidating ? (
                    <Skeleton variant="text" width={80} />
                  ) : (
                    staffData?.data?.totalNonteachingStaff || 0
                  )}
                </h3>
              </div>
            </div>
            <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
              <ColumnChartUserDashboard
                type={"bar"}
                categories={
                  (attendance?.data &&
                    attendance?.data?.map((id: any) => id?._id)) ||
                  []
                }
                series={[
                  {
                    name: "Present",
                    data:
                      (attendance?.data &&
                        attendance?.data?.map((id: any) => id?.totalPresent)) ||
                      [],
                  },
                  {
                    name: "Absent",
                    data:
                      (attendance?.data &&
                        attendance?.data?.map((id: any) => id?.totalAbsent)) ||
                      [],
                  },
                ]}
                title={"Staffs Attendance Report"}
                className={"col-span-12   gap-10  flex flex-col "}
              />
            </div>
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
