import { AdmissionCards } from "components/admin";
import {
  ColumnChartUserDashboard,
  StudentDistribution,
} from "components/admin/analytics";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
type AdmissionType = {
  data: {
    _id: string;
    totalClass: number;
    totalMale: number;
    totalFemale: number;
    totalOther: number;
    courseWiseCount: {
      student: number;
      course: {
        title: string;
      };
    }[];
  }[];
};
const Dashboard = () => {
  const { data, mutate, isValidating } = useSWRFetch<AdmissionType>(
    "dashboard/admin/admission-report"
  );

  return (
    <div className="w-full">
      <PrivateLayout title="Admission | Dashboard">
        <>
          <AdmissionCards />
          <div className="grid grid-cols-12 content-between gap-4  p-6 ">
            <div className=" col-span-12 gap-2 md:col-span-12 lg:col-span-4">
              {!data?.data?.length ? (
                <div className="col-span-12 p-4 rounded-xl border  bg-white shadow-lg flex flex-col gap-5 md:col-span-12 lg:col-span-4 h-full mb-3">
                  <h2 className="flex flex-col text-left items-start mt-2 font-semibold text-lg ">
                    New Admissions
                  </h2>
                  <Empty title="No student found" />
                </div>
              ) : (
                <StudentDistribution
                  className={
                    "col-span-12 p-6  gap-4 rounded-xl border items-center bg-white shadow-lg flex flex-col md:col-span-12 lg:col-span-4"
                  }
                  pieLabel={["Male", "Female", "Others"]}
                  pieSeries={
                    [
                      data?.data
                        ?.filter((d) => d?.totalMale)
                        ?.reduce((acc, d) => acc + d?.totalMale, 0) || 0,
                      data?.data
                        ?.filter((d) => d?.totalMale)
                        ?.reduce((acc, d) => acc + d?.totalFemale, 0) || 0,
                      data?.data
                        ?.filter((d) => d?.totalMale)
                        ?.reduce((acc, d) => acc + d?.totalOther, 0) || 0,
                    ] || []
                  }
                  title={`Student Admissions`}
                />
              )}
            </div>
            <div className="col-span-12 bg-white border  p-4 w-full flex flex-col  gap-5 md:col-span-12 lg:col-span-8 !border-grey-500 rounded-xl !shadow-xl">
              <ColumnChartUserDashboard
                type={"bar"}
                title={"Admissions Report"}
                categories={data?.data?.map((id: any) => id?._id) || []}
                series={[
                  {
                    name: "Boys",
                    data: data?.data?.map((id: any) => id?.totalMale) || [],
                  },
                  {
                    name: "Girls",
                    data: data?.data?.map((id: any) => id?.totalFemale) || [],
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
