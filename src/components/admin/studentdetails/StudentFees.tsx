import { Skeleton, TableRow } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import { Empty } from "components/core";
import { useSWRFetch } from "hooks";
import { useEffect } from "react";
import { StudentPaymentDialog } from "../dialog";
import dayjs from "dayjs";

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
      amount: number;
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

const StudentFees = ({
  studentId,
  reload,
  handleReload,
  student,
}: {
  studentId?: string;
  reload?: boolean;
  handleReload?: () => void;
  student?: boolean;
}) => {
  const { data, isValidating, mutate } = useSWRFetch<StudentPayableFeeType>(
    studentId && `student/student-fee/${studentId}`
  );

  useEffect(() => {
    mutate?.();
  }, [reload]);

  return (
    <div className="w-full flex flex-col items-start justify-center gap-10 md:p-5 rounded-xl">
      <h1 className="text-3xl text-theme font-semibold tracking-wide">
        Pending Fees
      </h1>
      <div className="w-full flex flex-col gap-2">
        {!data || isValidating ? (
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
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <div key={item._id} className="flex w-full justify-between">
              <TableContainer>
                <Table>
                  <TableBody>
                    <TableRow>
                      <TableCell component="th" scope="row">
                        <div className="flex flex-col gap-2">
                          <p
                            className={`font-semibold text-theme whitespace-nowrap
                        `}
                          >
                            {item?.fees?.title}
                          </p>
                          <small
                            className={`font-semibold !text-gray-500 text-themeSecondary whitespace-nowrap `}
                          >
                            Last Payment Date -{" "}
                            {dayjs(item?.endDate).format("LL")}
                          </small>
                        </div>
                      </TableCell>
                      <TableCell align="right" className="!w-full ">
                        {item?.fees?.amount ? (
                          <p
                            className={`
                            font-bold !text-gray-500 text-themeSecondary line-through mr-7
                        `}
                          >
                            ₹{item.fees.amount}
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
                      {!student ? (
                        <TableCell align="right" className="!w-full">
                          <StudentPaymentDialog
                            studentID={studentId}
                            studentFeesId={item?._id}
                            amount={item?.amount}
                            reload={handleReload}
                          />
                        </TableCell>
                      ) : null}
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
  );
};

export default StudentFees;
