import { TabContext, TabList, TabPanel } from "@mui/lab";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Skeleton,
  Pagination,
  Box,
  Tab,
} from "@mui/material";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import { MoneyFormat } from "utils";

const data = [
  {
    key: "1",
    student: "John Doe",
    bookName: "Wings Of Fire",
    issueDate: "12-01-2022",
    returnDate: "24-05-2023",
    returned: "Yes",
    fine: 355,
  },
  {
    key: "2",
    student: "Bruce Banner",
    bookName: "The hulk show",
    issueDate: "17-10-2022",
    returnDate: "04-12-2023",
    returned: "No",
    fine: 0,
  },
  {
    key: "3",
    student: "Bruce Wayne",
    bookName: "The Detective",
    issueDate: "07-08-2012",
    returnDate: "15-07-2022",
    returned: "Yes",
    fine: 355,
  },
  {
    key: "4",
    student: "Chris Patt",
    bookName: "Who am i",
    issueDate: "17-10-2022",
    returnDate: "04-12-2023",
    returned: "Yes",
    fine: 0,
  },
  {
    key: "5",
    student: "Clerk Kent",
    bookName: "The Kryptonian",
    issueDate: "12-01-2020",
    returnDate: "14-02-2021",
    returned: "Yes",
    fine: 552,
  },
  {
    key: "6",
    student: "Mr Stark",
    bookName: "The Gentleman",
    issueDate: "17-10-2022",
    returnDate: "04-12-2023",
    returned: "No",
    fine: 0,
  },
  {
    key: "7",
    student: "Bruce Banner",
    bookName: "The hulk show",
    issueDate: "17-10-2022",
    returnDate: "04-12-2023",
    returned: "No",
    fine: 0,
  },
  {
    key: "8",
    student: "Bruce Wayne",
    bookName: "The Detective",
    issueDate: "07-08-2012",
    returnDate: "15-07-2022",
    returned: "Yes",
    fine: 355,
  },
  {
    key: "9",
    student: "Chris Patt",
    bookName: "Who am i",
    issueDate: "17-10-2022",
    returnDate: "04-12-2023",
    returned: "Yes",
    fine: 0,
  },
  {
    key: "10",
    student: "Clerk Kent",
    bookName: "The Kryptonian",
    issueDate: "12-01-2020",
    returnDate: "14-02-2021",
    returned: "Yes",
    fine: 552,
  },
  {
    key: "11",
    student: "Mr Stark",
    bookName: "The Gentleman",
    issueDate: "17-10-2022",
    returnDate: "04-12-2023",
    returned: "No",
    fine: 0,
  },
];

const BookIssueDetails = ({
  issueBook,
  isValidating,
  totalCount,
  perPage,
  onChange,
}: any) => {
  // console.log("dd", issueBook?.data?.length);
  const [pageNo, setPageNo] = useState(1);
  const [value, setValue] = useState<any>("1");
  const { data: returnedBook, isValidating: loading } = useSWRFetch<any>(
    `library/all-issue?type=RETURNED&perPage=12&pageNo=${pageNo}`
  );
  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };
  return (
    <div className="w-full flex flex-col">
      <div className="pt-4 mt-5 border-2 rounded-lg shadow-md">
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box sx={{ borderBottom: 1, borderColor: "ButtonFace" }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Recently Issued Book" value="1" />
                <Tab label="Recently Returned Book" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <div className="w-full mt-2  bg-white shadow-xl rounded-lg border-2">
                <h3 className="font-medium tracking-wide p-4 border-b text-theme">
                  Recently Issued Book
                </h3>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Session</TableCell>
                        <TableCell align="right">Book Name</TableCell>
                        <TableCell align="right">Accession No</TableCell>
                        <TableCell align="right">Issue Date</TableCell>
                        <TableCell align="right">Return Date</TableCell>
                        <TableCell align="right">Returned</TableCell>
                      </TableRow>
                    </TableHead>
                    {issueBook?.data?.length > 0 ? (
                      <TableBody>
                        {issueBook?.data?.map((row: any) => (
                          <TableRow
                            key={row._id}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            {isValidating ? (
                              <Skeleton width={150} variant="text" />
                            ) : (
                              <TableCell component="th" scope="row">
                                {row?.user?.displayName || "--"}
                              </TableCell>
                            )}
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.academicDetails?.batch?.branch
                                  ?.title || "--"
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.academicDetails?.batch?.course
                                  ?.title || "--"
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.academicDetails?.batch?.session
                                  ?.title || "--"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {isValidating ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.book?.title || "--"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {isValidating ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.book?.accessionNumber || "--"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {isValidating ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                dayjs(row?.createdAt).format("DD/MM/YYYY")
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {isValidating ? (
                                <Skeleton width={150} variant="text" />
                              ) : row?.returnDate ? (
                                dayjs(row?.returnDate).format("DD/MM/YYYY")
                              ) : (
                                "--"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {isValidating ? (
                                <Skeleton width={150} variant="text" />
                              ) : row?.actualReturnDate ? (
                                dayjs(row?.actualReturnDate).format(
                                  "DD/MM/YYYY"
                                )
                              ) : (
                                "--"
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    ) : (
                      <TableRow
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="right"></TableCell>

                        <TableCell align="right"></TableCell>
                        <div className="w-full flex items-center justify-center ">
                          <Empty title="No data found" />
                        </div>

                        <TableCell component="th" scope="row"></TableCell>

                        <TableCell align="right"></TableCell>
                      </TableRow>
                    )}
                  </Table>
                  <div className="w-full flex items-center justify-center py-4">
                    <Pagination
                      count={Math.ceil(
                        Number(totalCount || 1) / Number(perPage || 1)
                      )}
                      onChange={onChange}
                      variant="outlined"
                      color="primary"
                    />
                  </div>
                  {/* <div className="w-full flex items-center justify-center py-4">
                    <Pagination
                      count={Math.ceil(
                        Number(issueBook?.totalCount || 1) /
                          Number(issueBook?.perPage || 1)
                      )}
                      onChange={(e, v: number) => setPageNo(v)}
                      variant="outlined"
                      color="primary"
                    />
                  </div> */}
                </TableContainer>
              </div>
            </TabPanel>
            {/* -----------------------------------Recently Returned Book Panel -----------------------------------------------------------*/}
            <TabPanel value="2">
              <div className="w-full mt-2  bg-white shadow-xl rounded-lg border-2">
                <h3 className="font-medium tracking-wide p-4 border-b text-theme">
                  Recently Returned Book
                </h3>
                <TableContainer>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Student</TableCell>
                        <TableCell>Branch</TableCell>
                        <TableCell>Course</TableCell>
                        <TableCell>Session</TableCell>
                        <TableCell align="right">Book Name</TableCell>
                        <TableCell align="right">Accession No</TableCell>
                        <TableCell align="right">Issue Date</TableCell>
                        <TableCell align="right">Return Date</TableCell>
                        {/* <TableCell align="right">Returned</TableCell> */}
                        <TableCell align="right">Fined</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {returnedBook?.data?.length > 0 ? (
                        returnedBook?.data?.map((row: any) => (
                          <TableRow
                            key={row.key}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.displayName || "--"
                              )}
                            </TableCell>
                            {/* llL */}
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.academicDetails?.batch?.branch
                                  ?.title || "--"
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.academicDetails?.batch?.course
                                  ?.title || "--"
                              )}
                            </TableCell>
                            <TableCell component="th" scope="row">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.user?.academicDetails?.batch?.session
                                  ?.title || "--"
                              )}
                            </TableCell>
                            {/* llL */}
                            <TableCell align="right">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.book?.title || "--"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {isValidating ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                row?.book?.accessionNumber || "--"
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : (
                                dayjs(row?.createdAt).format("DD/MM/YYYY")
                              )}
                            </TableCell>
                            <TableCell align="right">
                              {" "}
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : row?.actualReturnDate ? (
                                dayjs(row?.actualReturnDate).format(
                                  "DD/MM/YYYY"
                                )
                              ) : (
                                "--"
                              )}
                            </TableCell>
                            {/* <TableCell align="right">{row.returned}</TableCell> */}
                            <TableCell align="right">
                              {loading ? (
                                <Skeleton width={150} variant="text" />
                              ) : row?.finePaid ? (
                                MoneyFormat(row?.finePaid)
                              ) : (
                                MoneyFormat(0)
                              )}
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell align="right"></TableCell>

                          <TableCell align="right"></TableCell>
                          <div className="w-full flex items-center justify-center ">
                            <Empty title="No data found" />
                          </div>

                          <TableCell component="th" scope="row"></TableCell>

                          <TableCell align="right"></TableCell>
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>

                  <div className="w-full flex items-center justify-center py-4">
                    <Pagination
                      count={Math.ceil(
                        Number(returnedBook?.totalCount || 1) /
                          Number(returnedBook?.perPage || 1)
                      )}
                      onChange={(e, v: number) => setPageNo(v)}
                      variant="outlined"
                      color="primary"
                    />
                  </div>
                </TableContainer>
              </div>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
      {/* <div className="w-full flex flex-col lg:flex-col gap-4 items-start">
        <div className="w-full mt-8  bg-white shadow-xl rounded-lg">
          <h3 className="font-medium tracking-wide p-4 border-b text-theme">
            Recently Issued Book
          </h3>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell align="right">Book Name</TableCell>
                  <TableCell align="right">Issue Date</TableCell>
                  <TableCell align="right">Return Date</TableCell>
                  <TableCell align="right">Returned</TableCell>
                </TableRow>
              </TableHead>
              {issueBook?.data?.length > 0 ? (
                <TableBody>
                  {issueBook?.data?.map((row: any) => (
                    <TableRow
                      key={row._id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      {isValidating ? (
                        <Skeleton width={150} variant="text" />
                      ) : (
                        <TableCell component="th" scope="row">
                          {row?.user?.displayName || "--"}
                        </TableCell>
                      )}
                      <TableCell align="right">
                        {isValidating ? (
                          <Skeleton width={150} variant="text" />
                        ) : (
                          row?.book?.title || "--"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {isValidating ? (
                          <Skeleton width={150} variant="text" />
                        ) : (
                          dayjs(row?.createdAt).format("DD/MM/YYYY")
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {isValidating ? (
                          <Skeleton width={150} variant="text" />
                        ) : row?.returnDate ? (
                          dayjs(row?.returnDate).format("DD/MM/YYYY")
                        ) : (
                          "--"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {isValidating ? (
                          <Skeleton width={150} variant="text" />
                        ) : row?.actualReturnDate ? (
                          dayjs(row?.actualReturnDate).format("DD/MM/YYYY")
                        ) : (
                          "--"
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              ) : (
                <TableRow
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="right"></TableCell>

                  <TableCell align="right"></TableCell>
                  <div className="w-full flex items-center justify-center ">
                    <Empty title="No data found" />
                  </div>

                  <TableCell component="th" scope="row"></TableCell>

                  <TableCell align="right"></TableCell>
                </TableRow>
              )}
            </Table>
            <div className="w-full flex items-center justify-center py-4">
              <Pagination
                count={Math.ceil(
                  Number(totalCount || 1) / Number(perPage || 1)
                )}
                onChange={onChange}
                variant="outlined"
                color="primary"
              />
            </div>
          </TableContainer>
        </div>
        <div className="w-full mt-8  bg-white shadow-xl rounded-lg">
          <h3 className="font-medium tracking-wide p-4 border-b text-theme">
            Recently Returned Book
          </h3>
          <TableContainer>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Student</TableCell>
                  <TableCell align="right">Book Name</TableCell>
                  <TableCell align="right">Issue Date</TableCell>
                  <TableCell align="right">Return Date</TableCell>
                  <TableCell align="right">Fined</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {returnedBook?.data?.length > 0 ? (
                  returnedBook?.data?.map((row: any) => (
                    <TableRow
                      key={row.key}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {loading ? (
                          <Skeleton width={150} variant="text" />
                        ) : (
                          row?.user?.displayName || "--"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {loading ? (
                          <Skeleton width={150} variant="text" />
                        ) : (
                          row?.book?.title || "--"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {loading ? (
                          <Skeleton width={150} variant="text" />
                        ) : (
                          dayjs(row?.createdAt).format("DD/MM/YYYY")
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {" "}
                        {loading ? (
                          <Skeleton width={150} variant="text" />
                        ) : row?.actualReturnDate ? (
                          dayjs(row?.actualReturnDate).format("DD/MM/YYYY")
                        ) : (
                          "--"
                        )}
                      </TableCell>
                      <TableCell align="right">
                        {loading ? (
                          <Skeleton width={150} variant="text" />
                        ) : row?.finePaid ? (
                          MoneyFormat(row?.finePaid)
                        ) : (
                          MoneyFormat(0)
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell align="right"></TableCell>

                    <TableCell align="right"></TableCell>
                    <div className="w-full flex items-center justify-center ">
                      <Empty title="No data found" />
                    </div>

                    <TableCell component="th" scope="row"></TableCell>

                    <TableCell align="right"></TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>

            <div className="w-full flex items-center justify-center py-4">
              <Pagination
                count={Math.ceil(
                  Number(returnedBook?.totalCount || 1) /
                    Number(returnedBook?.perPage || 1)
                )}
                onChange={(e, v: number) => setPageNo(v)}
                variant="outlined"
                color="primary"
              />
            </div>
          </TableContainer>
        </div>
      </div> */}
    </div>
  );
};

export default BookIssueDetails;
