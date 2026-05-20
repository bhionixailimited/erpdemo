import { AdmissionCards, PlacementCards } from "components/admin";
import {
  ColumnChartUserDashboard,
  StudentDistribution,
} from "components/admin/analytics";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
type dataType = {
  data: {
    _id: string;
    totalBoys: number;
    totalGirls: number;
    totalOthers: number;
  }[];
};
type batchData = {
  data: {
    _id: string;
    totalStudent: number;
    title: string;
  }[];
};
const Dashboard = () => {
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    "dashboard/admin/gender-wise-placement"
  );

  const { data: batchData } = useSWRFetch<batchData>(
    "dashboard/admin/course-wise-placement"
  );

  return (
    <div className="w-full">
      <PrivateLayout title="Placement | Dashboard">
        <>
          <PlacementCards />
          <div className="grid grid-cols-12 content-between gap-4  p-6 ">
            <div className=" col-span-12 gap-2 md:col-span-12 lg:col-span-4">
              {!batchData?.data?.length ? (
                <div className="col-span-12 p-4 rounded-xl border  bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4 h-full">
                  <h2 className="flex flex-col text-left items-start mt-2 font-semibold text-lg ">
                    Batch Wise Placed Students
                  </h2>
                  <Empty title="No data found" />
                </div>
              ) : (
                <StudentDistribution
                  className={
                    "col-span-12 p-6  gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-4"
                  }
                  pieLabel={
                    (batchData?.data &&
                      batchData?.data?.map((data) => data?.title || "Other")) ||
                    []
                  }
                  pieSeries={
                    (batchData?.data &&
                      batchData?.data?.map(
                        (data) => data?.totalStudent || 0
                      )) ||
                    []
                  }
                  title={"Batch Wise Placed Students"}
                />
              )}
            </div>
            <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
              <ColumnChartUserDashboard
                type={"bar"}
                title={"Placement Report"}
                categories={
                  data?.data?.map((data) => data?._id || "other") || []
                }
                series={[
                  {
                    name: "Boys",
                    data: data?.data?.map((data) => data?.totalBoys || 0) || [],
                  },
                  {
                    name: "Girls",
                    data:
                      data?.data?.map((data) => data?.totalGirls || 0) || [],
                  },
                ]}
                className={"col-span-12   gap-10  flex flex-col "}
              />
            </div>
          </div>
        </>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Dashboard);
