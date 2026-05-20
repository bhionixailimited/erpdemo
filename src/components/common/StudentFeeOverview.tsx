import { StudentPaymentDialog } from "components/admin/dialog";
import { useSWRFetch } from "hooks";
import { useEffect } from "react";
import { MoneyFormat } from "utils";

type PaymentOverviewType = {
  data: {
    amountPaid: number;
    amountToPaid: number;
    totalYearlyFee: number;
    student: {
      displayName: string;
      email: string;
      gender: string;
      isAlumni: boolean;
      isHostler: boolean;
      isUsingTransport: boolean;
      libraryCardNumber: string;
      phoneNumber: string;
      photoUrl: string;
      registrationNumber: string;
      rollNumber: string;
      _id: string;
    };
  };
};

const StudentFeeOverview = ({
  studentId,
  handleReload,
  reload,
  student,
}: {
  studentId?: string;
  handleReload?: () => void;
  reload?: boolean;
  student?: boolean;
}) => {
  const { data, mutate } = useSWRFetch<PaymentOverviewType>(
    studentId && `student/payment-overview/${studentId}`
  );

  useEffect(() => {
    mutate?.();
  }, [reload]);

  return (
    <div className="flex flex-col gap-1.5">
      <p className="font-semibold text-lg text-theme">Total Fees</p>
      <p className="text-4xl font-bold text-theme">
        {MoneyFormat(data?.data?.totalYearlyFee || 0)}
      </p>
      <p className="text-theme ">
        Registration number{" "}
        <span className="font-semibold">
          {data?.data?.student?.registrationNumber}
        </span>
      </p>
      <div className="flex flex-col md:flex-ror w-full pt-1 gap-2">
        <div className="w-full">
          <p className="font-semibold text-lg text-theme">Paid Amount</p>
          <p className="font-semibold text-lg text-theme">
            {MoneyFormat(data?.data?.amountPaid || 0)}
          </p>
        </div>{" "}
        <div className="w-full">
          <p className="font-semibold text-lg text-theme">Remaining Amount</p>
          <p className="font-semibold text-lg text-theme">
            {MoneyFormat(data?.data?.amountToPaid || 0)}
          </p>
        </div>
      </div>
      {!student ? (
        <div className="flex w-1/2 pt-3 gap-5">
          <StudentPaymentDialog studentID={studentId} reload={handleReload} />
        </div>
      ) : null}
    </div>
  );
};

export default StudentFeeOverview;
