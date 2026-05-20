import { Skeleton } from "@mui/material";
import {
  RadialBarMeter,
  TimetableBarGraph,
  TimetableDashboardGraph,
} from "components/admin/analytics";
import { TimetableDashboard } from "components/teachers";
import { useSWRFetch } from "hooks";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const TimetableDashboardPage = () => {
  return (
    <PrivateLayout title="Teacher | Timetable">
      <section className="w-full py-4 px-4 xl:px-6">
        <div className="flex gap-4 flex-col lg:flex-row w-full">
          <TimetableDashboard />
          <RadioMeter />
        </div>
        <div className="flex gap-4 flex-col lg:flex-row w-full mt-8  ">
          <div className="w-full lg:w-2/5    ">
            <TimetableDashboardGraph />
          </div>
          <div className="w-full lg:w-3/5   ">
            <TimetableBarGraph />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(TimetableDashboardPage);

type ClassStatType = {
  data: {
    onlineClass: number;
    totalClass: number;
  };
};

const RadioMeter = () => {
  const { data, isValidating } = useSWRFetch<ClassStatType>(
    `dashboard/teacher/total-class-stat`
  );
  return (
    <div className="flex w-full flex-col md:flex-row justify-center items-center gap-4 bg-white rounded-2xl border shadow-lg  ">
      <div className="flex w-full flex-col items-center">
        <RadialBarMeter
          type={"radialBar"}
          value={Math.round(
            Number(
              ((Number(data?.data?.totalClass || 0) -
                Number(data?.data?.onlineClass || 0)) /
                Number(data?.data?.totalClass)) *
                100
            ) || 0
          )}
        />
        <h3 className="font-semibold text-lg tracking-wide text-center">
          Offline Classes
        </h3>
        <h3 className="text-4xl font-semibold tracking-wide">
          {isValidating ? (
            <Skeleton width={150} animation="wave" />
          ) : (
            Number(
              (data?.data?.totalClass || 0) - (data?.data?.onlineClass || 0)
            )
          )}
        </h3>
      </div>
      <div className="flex w-full flex-col items-center">
        <RadialBarMeter
          type={"radialBar"}
          value={Math.round(
            Number(
              (Number(data?.data?.onlineClass) /
                Number(data?.data?.totalClass)) *
                100
            ) || 0
          )}
        />
        <h3 className="font-semibold text-lg tracking-wide text-center">
          Online Classes
        </h3>
        <h3 className="text-4xl font-semibold tracking-wide">
          {isValidating ? (
            <Skeleton width={150} animation="wave" />
          ) : (
            data?.data?.onlineClass
          )}
        </h3>
      </div>
    </div>
  );
};
