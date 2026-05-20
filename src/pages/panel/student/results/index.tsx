import { PrivateLayout } from "layouts";

import { Avatar, Pagination } from "@mui/material";
import { ResultBg } from "assets/backgrounds";
import { ResultIcon } from "assets/static-icon";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { AssignmentSkeleton } from "components/teachers/assignment/ViewAssignment";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import Link from "next/link";
import { useDeferredValue, useState } from "react";
import ExamType from "types/exam";

type ResultDataArrayType = {
  data: {
    exam: ExamType;
    fullMark: number;
    subjectWise: {
      credit: number;
      creditPoint: number;
      fullMark: number;
      grade: string;
      gradePoint: number;
      mark: number;
      passMark: string;
      remark: string;
      subject: string;
      subjectCode: string;
    }[];
    totalCredit: number;
    totalCreditPoint: number;
    totalGradePoint: number;
    totalMarkSecured: number;
    totalSGPA: number;
    _id: string;
  }[];
  totalCount: number;
  perPage: number;
};

const ResultCards = () => {
  const [pageNo, setPageNo] = useState(1);
  const [search, setSearch] = useState("");

  const searchTitle = useDeferredValue(search);

  const { user } = useAuth();

  const { data, isValidating, error } = useSWRFetch<ResultDataArrayType>(
    (user?.userParent?._id &&
      `exam/result/all/${user?.userParent?._id}?perPage=10&pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")) ||
      (user?._id &&
        `exam/result/all/${user?._id}?perPage=10&pageNo=${pageNo}` +
          (searchTitle ? `&searchTitle=${searchTitle}` : ""))
  );

  return (
    <PrivateLayout title="Result | Student">
      <div className="w-full p-2 md:p-6 overflow-hidden">
        <div className="w-full flex ">
          <SearchBar searchText={search} setSearchText={setSearch} />
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5 py-10">
          {!data || isValidating ? (
            Array(5)
              .fill(0)
              .map((item, index) => (
                <div className="w-full" key={index}>
                  <AssignmentSkeleton />
                </div>
              ))
          ) : data?.data?.length ? (
            data?.data?.map((item) => (
              <Link
                key={item._id}
                href={`/panel/student/results/${item?.exam?._id}`}
              >
                <div className="grid grid-cols-1 w-full cursor-pointer rounded-xl shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px] gap-6 bg-white min-h-96">
                  <div
                    className="h-24 2xl:h-28 w-full relative rounded-t-lg"
                    style={{
                      backgroundImage: `url(${ResultBg.src})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundRepeat: "no-repeat",
                    }}
                  >
                    <div className="bg-[#00000038] rounded-t-lg bg-opacity-20 bg-clip-padding backdrop-blur-xs backdrop-filter w-full h-full">
                      <div className=" justify-center gap-4 absolute top-1/2 z-50 w-full flex h-full items-center p-2">
                        <Avatar
                          className="bg-[#ffffff49] border object-contain p-2"
                          src={ResultIcon.src}
                          sx={{
                            height: "5rem",
                            width: "5rem ",
                            objectFit: "contain",
                          }}
                        ></Avatar>
                      </div>
                    </div>
                  </div>
                  <div className="flex w-full flex-col gap-0.5 p-5 text-center justify-center items-center">
                    <p className="text-base font-semibold">
                      {item.exam?.title}
                    </p>
                    <p className="flex gap-1 text-sm flex-col">
                      Full Marks:{" "}
                      <span className="text-theme font-semibold">
                        {item.fullMark}
                      </span>
                    </p>
                    <p className="flex gap-1 text-base">
                      SGPA:{" "}
                      <span className="text-theme font-semibold">
                        {item.totalSGPA?.toFixed(2)}
                      </span>
                    </p>
                    <p className="flex gap-1 text-base">
                      Secured Marks:{" "}
                      <span className="text-theme font-semibold">
                        {item.totalMarkSecured}
                      </span>
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="w-full flex items-center justify-center col-span-12">
              <Empty title="No Result Found" />
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
    </PrivateLayout>
  );
};

export default withProtectedStudent(ResultCards);
