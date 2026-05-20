import { Avatar, Pagination } from "@mui/material";
import { AssignmentBG } from "assets/backgrounds";
import { ProjectManageMentIcon } from "assets/static-icon";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { AssignmentSkeleton } from "components/teachers/assignment/ViewAssignment";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useDeferredValue, useState } from "react";

type AssignmentDataType = {
  data: {
    dateOfAssignment: string;
    dueDate: string;
    fullMark: number;
    introduction: string;
    isSubmitted: boolean;
    title: string;
    totalCorrectAnswer: number;
    totalMarkSecure: number;
    type: string;
    _id: string;
  }[];
  totalCount: number;
  perPage: number;
};

const StudentResult = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");

  const searchText = useDeferredValue(searchTitle);

  const { push } = useRouter();

  const { user } = useAuth();

  const { data, isValidating, error } = useSWRFetch<AssignmentDataType>(
    (user?.userParent?._id &&
      `assignment/student/${user?.userParent?._id}?perPage=15&pageNo=${pageNo}` +
        (searchText ? `&searchTitle=${searchText}` : "")) ||
      (user?._id &&
        `assignment/student/${user?._id}?perPage=15&pageNo=${pageNo}` +
          (searchText ? `&searchTitle=${searchText}` : ""))
  );

  return (
    <PrivateLayout title="Result | Assignment">
      <section className="w-full container mx-auto p-4">
        <div className="flex  md:p-6 w-full flex-col gap-8 overflow-hidden">
          <SearchBar searchText={searchText} setSearchText={setSearchTitle} />
          <div className="w-full grid grid-cols-12 pt-4 gap-4 ">
            {(!error && !data) || isValidating ? (
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
                    onClick={() =>
                      item?.isSubmitted &&
                      push(`/panel/student/assignment/result/${item?._id}`)
                    }
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
                            {item?.isSubmitted ? "Submitted" : "Not Submitted"}
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
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentResult);
