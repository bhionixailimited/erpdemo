import {
  BatchWiseLms,
  LmsBarGraph,
  LMSDashboardStat,
} from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";

const LMSDashboard = () => {
  return (
    <PrivateLayout title="Teacher | LMS Dashboard ">
      <section className="w-full p-6">
        <LMSDashboardStat />
        <div className="flex gap-4 flex-col lg:flex-row w-full mt-8  ">
          <div className="w-full lg:w-2/5    ">
            <BatchWiseLms />
          </div>
          <div className="w-full lg:w-3/5  ">
            <LmsBarGraph />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(LMSDashboard);
