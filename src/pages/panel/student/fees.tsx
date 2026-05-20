import { StudentFees, Transactions } from "components/admin/studentdetails";
import { StudentFeeOverview } from "components/common";
import { useAuth } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useState } from "react";

const FeesPage = () => {
  const { user } = useAuth();

  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <PrivateLayout title="Fees | Student">
      <div className="w-full p-4  border-[1px] border-gray-300 bg-gray-100 rounded-md">
        <div className="w-full">
          <div className="flex md:flex-row flex-col gap-3 mt-1 ">
            <div className="md:w-1/2 w-full bg-blue-100 rounded p-3 border border-blue-500">
              <div className="w-full md:p-6 rounded-xl gap-8 flex flex-col">
                <div className="w-full gap-8 flex flex-wrap justify-between">
                  <h1 className="text-4xl font-semibold tracking-wide text-theme">
                    Overview
                  </h1>
                  {/* <FeeStructureDialog /> */}
                </div>
                <StudentFeeOverview
                  handleReload={handleReload}
                  studentId={user?.userParent?._id || user?._id}
                  reload={reload}
                  student={true}
                />
              </div>
              <Transactions
                reload={reload}
                studentId={user?.userParent?._id || user?._id}
              />
            </div>
            <div className="md:w-1/2 w-full bg-blue-100 rounded p-3 border border-blue-500">
              <StudentFees
                reload={reload}
                handleReload={handleReload}
                studentId={user?.userParent?._id || user?._id}
                student={true}
              />
            </div>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedStudent(FeesPage);
