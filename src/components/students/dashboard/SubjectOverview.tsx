import DashboardRadialBar from "components/admin/analytics/DashboardRadialBar";
import { useSWRFetch } from "hooks";

type SubjectDataType = {
  data: {
    _id: string;
    subjectCode: string;
    title: string;
    totalClass: number;
  }[];
};

const SubjectOverview = () => {
  const { data } = useSWRFetch<SubjectDataType>(
    `dashboard/student/get-subject-progress`
  );

  return (
    <div className=" rounded-xl border h-fit shadow-xl bg-white w-full">
      <div className="sm:col-span-12 md:col-span-12 lg:col-span-12">
        <DashboardRadialBar
          className="w-full "
          type="radialBar"
          radialLabel={data?.data?.map((item) => item?.title || "Other") || []}
          radialSeries={
            data?.data?.map(
              (item) =>
                Math.round(
                  Number(
                    item?.totalClass /
                      Number(
                        data?.data?.reduce(
                          (acc, inner) => acc + inner?.totalClass,
                          0
                        )
                      )
                  ) * 100
                ) || 0
            ) || []
          }
          totalReturn={
            data?.data?.reduce((acc, item) => acc + item?.totalClass, 0) || 0
          }
          title={"Subject Progress"}
        />
      </div>
    </div>
  );
};

export default SubjectOverview;
