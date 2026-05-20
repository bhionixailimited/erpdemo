import { StudentFeeOverview } from "components/common";
import { useState } from "react";
import StudentFees from "./StudentFees";
import Transactions from "./Transactions";
const PaymentDetails = ({ studentID }: { studentID: string }) => {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };
  return (
    <div>
      <div className="w-full md:p-4  md:border-[1px] md:border-gray-300 bg-gray-100 rounded-md">
        <div className="w-full">
          <div className="flex md:flex-row flex-col gap-3 mt-1 ">
            <div className="md:w-1/2 w-full bg-blue-100 rounded md:p-3 border border-blue-500">
              <div className="w-full p-6 rounded-xl gap-8 flex flex-col">
                <div className="w-full gap-8 flex flex-wrap justify-between">
                  <h1 className="text-4xl font-semibold tracking-wide text-theme">
                    Overview
                  </h1>
                  {/* <FeeStructureDialog /> */}
                </div>
                <StudentFeeOverview
                  handleReload={handleReload}
                  studentId={studentID}
                  reload={reload}
                />
              </div>
              <Transactions studentId={studentID} reload={reload} />
            </div>
            <div className="md:w-1/2 w-full bg-blue-100 rounded p-3 border border-blue-500">
              <StudentFees
                studentId={studentID}
                reload={reload}
                handleReload={handleReload}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
