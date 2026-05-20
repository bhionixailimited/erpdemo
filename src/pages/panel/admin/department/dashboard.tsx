import { DepartmentsCard } from "components/admin";
import {
  DepartmentBarGraph,
  RadialBarMeter,
  StudentDonutChart,
  TimetableBarGraph,
  TimetableDashboardGraph,
} from "components/admin/analytics";
import { TimetableDashboard } from "components/teachers";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Skeleton } from "@mui/material";
import { Empty } from "components/core";

const Timetable = () => {
  const { data } = useSWRFetch<any>("dashboard/admin/department-stat");
  const { data: staffData, isValidating } = useSWRFetch<any>(
    "dashboard/admin/staff-statistic"
  );

  return (
    <PrivateLayout title="Department | Admin">
      <section className="w-full px-6 py-6">
        <div className="flex gap-4 flex-col lg:flex-row w-full">
          <DepartmentsCard />
          <div className="flex flex-col md:flex-row w-full justify-center items-center gap-4 bg-white rounded-xl border shadow-lg  ">
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
        </div>
        <div className="flex gap-4 flex-col lg:flex-row w-full mt-8  ">
          <div className="w-full md:w-2/5    ">
            {!data?.data[0]?.department.length ? (
              <div
                className={
                  "col-span-12  gap-4 rounded-xl border items-center bg-white shadow-lg  md:col-span-12 lg:col-span-5 h-full"
                }
              >
                <h2 className="flex flex-col text-left mt-3 font-semibold text-lg px-4 ">
                  Staffs Overview
                </h2>
                <Empty title={"No data found"} />
              </div>
            ) : (
              <StudentDonutChart
                pieLabel={
                  data?.data[0]?.department?.map(
                    (department: any) => department?.title
                  ) || []
                }
                pieSeries={
                  data?.data[0]?.department?.map(
                    (department: any) => department?.employees
                  ) || [0]
                }
                title={"Staffs Overview"}
                className={
                  "col-span-12 p-6 mt-3 gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-5"
                }
              />
            )}
          </div>
          <div className="w-full md:w-3/5  ">
            <DepartmentBarGraph />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(Timetable);
