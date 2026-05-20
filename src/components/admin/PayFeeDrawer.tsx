import { Paid } from "@mui/icons-material";
import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Toolbar,
} from "@mui/material";
import { CustomDrawer, Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import { MoneyFormat } from "utils";
import { StudentPaymentDialog } from "./dialog";

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

type StudentPayableFeeType = {
  data: {
    amount: number;
    batch: string;
    createdAt: string;
    day: number;
    endDate: string;
    feeType: string;
    fees: {
      _id: string;
      title: string;
      amount?: number;
    };
    isPaid: false;
    month: number;
    startDate: string;
    startDay: 21;
    startMonth: 4;
    updatedAt: string;
    user: string;
    year: number;
    _id: string;
  }[];
};

const PayFeeDrawer = ({ studentId }: { studentId: string }) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { data: paymentOverview, mutate: reFetchOverView } =
    useSWRFetch<PaymentOverviewType>(
      studentId && `student/payment-overview/${studentId}`
    );

  const {
    data: pendingFees,
    isValidating: loadingFees,
    mutate: refetchFees,
  } = useSWRFetch<StudentPayableFeeType>(
    studentId && `student/student-fee/${studentId}`
  );

  return (
    <>
      <span
        className=" bg-transparent w-full hover:bg-yellow-200/50 transition-all ease-in-out duration-300 cursor-pointer"
        onClick={() => setOpenDrawer(true)}
      >
        <Toolbar title="Assign Institutes">
          <Paid className=" !text-4xl !text-yellow-500" />
        </Toolbar>
      </span>
      <CustomDrawer
        anchor="right"
        maxWidth="md"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="w-full p-4 border-b items-center justify-between flex ">
          <h3 className="font-medium text-theme tracking-wide text-xl">
            Pay Fees
          </h3>
        </div>
        <div className="flex flex-col p-4 gap-4 overflow-hidden pb-8 overflow-y-auto ">
          <div className="flex flex-col gap-1.5">
            <p className="font-semibold text-lg text-theme">Total Fees</p>
            <p className="text-4xl font-bold text-theme">
              {MoneyFormat(paymentOverview?.data?.totalYearlyFee || 0)}
            </p>
            <p className="text-theme ">
              Registration number{" "}
              <span className="font-semibold">
                {paymentOverview?.data?.student?.registrationNumber}
              </span>
            </p>
            <div className="flex flex-col md:flex-ror w-full pt-1 gap-2">
              <div className="w-full">
                <p className="font-semibold text-lg text-theme">Paid Amount</p>
                <p className="font-semibold text-lg text-theme">
                  {MoneyFormat(paymentOverview?.data?.amountPaid || 0)}
                </p>
              </div>{" "}
              <div className="w-full">
                <p className="font-semibold text-lg text-theme">
                  Remaining Amount
                </p>
                <p className="font-semibold text-lg text-theme">
                  {MoneyFormat(paymentOverview?.data?.amountToPaid || 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-start justify-center gap-10 md:p-5 rounded-xl">
          <h1 className="text-3xl text-theme font-semibold tracking-wide">
            Pending Fees
          </h1>
          <div className="w-full flex flex-col gap-2">
            {!pendingFees && loadingFees ? (
              <div className="flex flex-col gap-6">
                {Array(5)
                  .fill(0)
                  .map((_, index) => (
                    <div
                      className="flex w-full items-center justify-between "
                      key={index}
                    >
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={150}
                        height={15}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={150}
                        height={15}
                      />
                      <Skeleton
                        animation="wave"
                        variant="rounded"
                        width={150}
                        height={30}
                      />
                    </div>
                  ))}
              </div>
            ) : pendingFees?.data?.length ? (
              pendingFees?.data?.map((item) => (
                <div key={item._id} className="flex w-full justify-between">
                  <TableContainer>
                    <Table>
                      <TableBody>
                        <TableRow>
                          <TableCell component="th" scope="row">
                            <p
                              className={`font-semibold text-theme whitespace-nowrap
                        `}
                            >
                              {item.fees.title}
                            </p>
                          </TableCell>
                          <TableCell align="right" className="!w-full ">
                            {item?.fees?.amount ? (
                              <p
                                className={`
                            font-bold !text-gray-500 text-themeSecondary line-through mr-7
                        `}
                              >
                                ₹{item?.fees?.amount}
                              </p>
                            ) : null}
                            <p
                              className={`
                            font-normal text-themeSecondary mr-7
                        `}
                            >
                              ₹{item.amount}
                            </p>
                          </TableCell>
                          <TableCell align="right" className="!w-full">
                            <StudentPaymentDialog
                              studentID={studentId}
                              studentFeesId={item?._id}
                              amount={item?.amount}
                              reload={() => {
                                refetchFees?.();
                                reFetchOverView?.();
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </div>
              ))
            ) : (
              <div className="flex items-center justify-center w-full">
                <Empty title="No Pending Fees" />
              </div>
            )}
          </div>
        </div>
      </CustomDrawer>
    </>
  );
};

export default PayFeeDrawer;
