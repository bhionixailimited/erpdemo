import { AnnouncementCreateForm } from "components/form/teacher";
import { BatchLayout } from "components/teachers";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";

const BatchDetails = () => {
  return (
    <BatchLayout>
      <AnnouncementCreateForm />
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(BatchDetails);
