import {
  BatchDashboardStat,
  BatchStrength,
  BatchWiseGraph,
  UpcomingClass,
} from "components/teachers";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { PrivateLayout } from "layouts";

const DashboardBatch = () => {
  return (
    <PrivateLayout title="Batch | Dashboard">
      <section className="w-full px-6 ">
        <div className="flex flex-col gap-6 xl:flex-row">
          <div className="w-full  xl:w-2/5 ">
            <BatchDashboardStat />
          </div>
          <div className="w-full">
            <BatchWiseGraph />
          </div>
        </div>
        <div className="flex items-start  flex-col lg:flex-row gap-6 py-6">
          <div className=" w-full">
            <BatchStrength />
          </div>
          <div className="w-full 2xl:w-2/5">
            <UpcomingClass />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withTeacherAdminProtected(DashboardBatch);
