import { Empty } from "components/core";
import dayjs from "dayjs";

import { Avatar, Pagination } from "@mui/material";
import { AssignmentBG } from "assets/backgrounds";
import { ProjectManageMentIcon } from "assets/static-icon";
import { Grid } from "@mui/material";
import { AssignmentType } from "types/assignment";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { AssignmentSkeleton } from "components/teachers/assignment/ViewAssignment";
import { useDeferredValue, useState } from "react";
import { SearchBar } from "components/common";

type dataType = {
  statistic: {
    totalAssignment: number;
    completedAssignment: number;
    pendingAssignment: number;
    assignmentNotTaken: number;
  };
  data: AssignmentType[];
  isLastChunk?: boolean;
  pageNo?: number;
  perPage?: number;
  totalCount?: number;
};

const StudentAssignment = () => {
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");

  const searchTitle = useDeferredValue(search);
  const { push, query } = useRouter();
  const { studentID } = query;
  const { data, isValidating } = useSWRFetch<dataType>(
    studentID &&
      `assignment/student/${studentID}?perPage=10&pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );
  const Attendance_Arr = [
    {
      id: 1,
      title: "Total assignments",
      count: data?.statistic?.totalAssignment ?? 0,
    },
    {
      id: 2,
      title: "Completed",
      count: data?.statistic?.completedAssignment ?? 0,
    },
    {
      id: 3,
      title: "Pending",
      count: data?.statistic?.pendingAssignment ?? 0,
    },
    {
      id: 4,
      title: "Assignments Not Taken",
      count: data?.statistic?.assignmentNotTaken ?? 0,
    },
  ];

  return (
    <div>
      <div className="w-full md:p-4  border-[1px] border-gray-300 bg-gray-100 rounded-md">
        <div className="w-full">
          <div className="flex md:w-11/12 md:p-2 py-2 rounded-lg">
            <div className="w-full flex items-center justify-center">
              <div className="md:w-3/4 md:p-6 b  h-full  rounded-xl  flex items-center justify-center">
                <Grid container spacing={2}>
                  {Attendance_Arr.map((item) => (
                    <Grid item key={item.id} xs={6} sm={6} lg={3}>
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="md:text-xl text-sm font-semibold whitespace-nowrap">
                          {item.title}
                        </p>
                        <p className="md:text-3xl text-xl font-bold text-theme">
                          {item.count}
                        </p>
                      </div>
                    </Grid>
                  ))}
                </Grid>
              </div>
            </div>
          </div>
          <div className="md:px-6 ">
            <h2 className="text-theme font-bold text-xl mt-2 mb-1 md:px-5 px-2">
              Recent Assignments
            </h2>
            <div className="flex md:p-6 p-2 w-full flex-col gap-8 overflow-hidden">
              <SearchBar searchText={searchTitle} setSearchText={setSearch} />
              <div className="w-full grid grid-cols-12 pt-4 gap-4 ">
                {!data || isValidating ? (
                  Array(5)
                    .fill(0)
                    .map((item, index) => <AssignmentSkeleton key={index} />)
                ) : data?.data?.length ? (
                  data?.data?.map((item, index) => (
                    <div
                      className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                      key={item?._id}
                    >
                      <div
                        className="flex items-center justify-center flex-col shadow-xl rounded-lg hover:scale-105 common-transition cursor-pointer gap-6"
                        key={item._id}
                      >
                        <div
                          className="h-24 2xl:h-28 w-full relative rounded-t-lg"
                          style={{
                            backgroundImage: `url(${AssignmentBG.src})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            backgroundRepeat: "no-repeat",
                          }}
                        >
                          <div className="bg-[#000] rounded-t-lg bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter w-full h-full">
                            <div className=" justify-center gap-4 absolute top-1/2 z-50 w-full flex h-full items-center p-2">
                              <Avatar
                                className="bg-[#00000028] border object-contain p-2"
                                src={ProjectManageMentIcon.src}
                                sx={{
                                  height: "5rem",
                                  width: "5rem ",
                                  objectFit: "contain",
                                }}
                              ></Avatar>
                            </div>
                          </div>
                        </div>
                        <div className="p-5 flex flex-col w-full gap-1 items-center justify-center">
                          <p className="text-lg font-semibold ">{item?.type}</p>
                          <p className="text-sm font-semibold text-theme cursor-pointer">
                            {item?.title}
                          </p>
                          <span className="text-xs tracking-tight flex gap-1 font-semibold">
                            Submission Date:{" "}
                            <p className="font-semibold text-theme">
                              {dayjs(item?.dueDate).format("ll")}
                            </p>
                          </span>
                          <span className="text-xs tracking-tight flex gap-1 font-semibold">
                            Total Correct Answer:{" "}
                            <p className="font-semibold text-theme">
                              {item?.totalCorrectAnswer ?? 0}
                            </p>
                          </span>
                          <span className="text-xs tracking-tight flex gap-1 font-semibold">
                            Total Mark:{" "}
                            <p className="font-semibold text-theme">
                              {item?.totalMarkSecure ?? 0}/{item?.fullMark ?? 0}
                            </p>
                          </span>
                          <div className="flex flex-col gap-2 w-full">
                            <div className="flex w-full text-end justify-center items-center pt-3">
                              <p
                                className={`${
                                  item?.isSubmitted
                                    ? "bg-green-300/30"
                                    : "bg-red-300/30"
                                }  w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1`}
                              >
                                {item?.isSubmitted
                                  ? "Submitted"
                                  : "Not Submitted"}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="col-span-12 flex items-center justify-center py-8 ">
                    <Empty title="No assignment available" />
                  </div>
                )}
              </div>
              <div className="w-full flex items-center justify-center py-4">
                <Pagination
                  count={Math.ceil(
                    Number(data?.totalCount || 1) / Number(data?.perPage || 1)
                  )}
                  onChange={(e, v: number) => setPageNo(v)}
                  variant="outlined"
                  color="primary"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAssignment;
