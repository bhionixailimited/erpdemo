import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useRef } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Paper, Skeleton } from "@mui/material";
import { Download } from "@mui/icons-material";
import { useAuth, useSWRFetch, withProtectedAdmin } from "hooks";
import ExamType from "types/exam";
import dayjs from "dayjs";
import { useReactToPrint } from "react-to-print";

const tableHead_arr = [
  {
    id: 1,
    title: "S No.",
  },
  {
    id: 3,
    title: "Subject",
  },

  {
    id: 5,
    title: "Credit",
  },
  {
    id: 6,
    title: "Grade",
  },
  {
    id: 7,
    title: "Grade Point",
  },
  {
    id: 4,
    title: "T/P",
  },
];

type StudentMarkDataType = {
  data: {
    allExams: {
      credit: number;
      creditPoint: number;
      fullMark: number;
      grade: string;
      gradePoint: number;
      obtainMark: number;
      passMark: number;
      startTime: string;
      subject: string;
      _id: string;
    }[];
    exam: ExamType;
    testGpa: number;
    totalCredit: number;
    totalGradePoint: number;
  };
};

const ReportDetails = () => {
  const { user, getUserAllDetails } = useAuth();
  const { query } = useRouter();
  useEffect(() => {
    getUserAllDetails(`${query?.studentId}`);
  }, [getUserAllDetails, query?.studentId]);

  //student mark details

  const { data: studentMarkDetails, isValidating: markLoading } =
    useSWRFetch<StudentMarkDataType>(
      query?.studentId &&
        query?.examId &&
        `exam/result/${query?.examId}/${query?.studentId}`
    );

  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  return (
    <PrivateLayout title={`Exam Report `}>
      <>
        {" "}
        <div
          className="p-5 flex items-center justify-center w-full flex-col max-w-5xl mx-auto "
          ref={componentRef}
        >
          <p className="uppercase text-xl font-semibold text-theme border-b border-theme w-full text-center pb-1">
            Student result summary
          </p>

          {markLoading ? (
            <>
              <div className="w-full flex justify-evenly gap-10 items-center  py-5">
                <div className="flex gap-1 flex-col">
                  <Skeleton height={45} width={150} animation="wave" />
                  <Skeleton height={45} width={200} animation="wave" />
                  <Skeleton height={45} width={200} animation="wave" />
                </div>
                <div className="flex flex-col gap-1">
                  <Skeleton height={45} width={150} animation="wave" />
                  <Skeleton height={45} width={200} animation="wave" />
                  <Skeleton height={45} width={200} animation="wave" />
                </div>
              </div>
              <div className="w-full ">
                <Skeleton height={50} animation="wave" />
                <Skeleton height={50} animation="wave" />
                <Skeleton height={50} animation="wave" />
                <Skeleton height={40} width={50} animation="wave" />
              </div>
              <div className="flex w-full pt-5 justify-end  ">
                <Skeleton height={40} width={50} animation="wave" />
              </div>
            </>
          ) : (
            <>
              <div className="w-full flex justify-evenly gap-10 items-center py-5">
                <div className="flex gap-1 flex-col">
                  <p className="font-semibold text-gray-600">
                    Examination:
                    <span className="text-theme font-semibold">
                      {studentMarkDetails?.data?.exam?.title}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-600">
                    Reg No:{" "}
                    <span className="text-theme font-semibold">
                      {user?.academicDetails?.registrationNumber || "NA"}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-600">
                    Roll No:{" "}
                    <span className="text-theme font-semibold">
                      {user?.academicDetails?.rollNumber || "NA"}
                    </span>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="font-semibold text-gray-600">
                    Result Type:{" "}
                    <span className="text-theme font-semibold">
                      {studentMarkDetails?.data?.exam?.type}
                    </span>
                  </p>
                  <p className="font-semibold text-gray-600">
                    Student Name:{" "}
                    <span className="text-theme font-semibold">
                      {user?.displayName}
                    </span>
                  </p>{" "}
                  <p className="font-semibold text-gray-600">
                    Exam Date:{" "}
                    <span className="text-theme font-semibold">
                      {dayjs(studentMarkDetails?.data?.exam?.startDate).format(
                        "LLL"
                      )}
                    </span>
                  </p>
                </div>
              </div>
              <div className="w-full">
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow
                        sx={{
                          background: "#5B50A1",
                          color: "white !important",
                        }}
                      >
                        {tableHead_arr.map((item) => (
                          <TableCell key={item.id}>
                            <div className="text-white">{item.title}</div>
                          </TableCell>
                        ))}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {studentMarkDetails?.data?.allExams?.map((row, index) => (
                        <TableRow
                          key={row._id}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row">
                            {index + 1}
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex text-center">
                              {row?.subject}
                            </div>
                          </TableCell>
                          <TableCell align="right">
                            <div className="flex text-center">{row.credit}</div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex text-center">{row.grade}</div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex text-center">
                              {row.gradePoint}
                            </div>
                          </TableCell>
                          <TableCell align="center">
                            <div className="flex text-center">
                              {row.obtainMark > row?.passMark ? "P" : "RA"}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row"></TableCell>
                        <TableCell align="center">
                          <div className="flex text-center"></div>
                        </TableCell>
                        <TableCell align="right">
                          <div className="flex text-center"></div>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex text-center">
                            Total Credit :{" "}
                            {studentMarkDetails?.data?.totalCredit}{" "}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex text-center">
                            Total Grade Point :{" "}
                            {studentMarkDetails?.data?.totalGradePoint}
                          </div>
                        </TableCell>
                        <TableCell align="center">
                          <div className="flex text-center">
                            SGPA : {studentMarkDetails?.data?.testGpa}
                          </div>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            </>
          )}
        </div>
        <div className="flex w-full py-5 max-w-5xl mx-auto justify-end">
          <button className="btn-primary flex gap-1" onClick={handlePrint}>
            <Download />
            Download
          </button>
        </div>
      </>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(ReportDetails);
