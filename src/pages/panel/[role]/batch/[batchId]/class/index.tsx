import { Pagination } from "@mui/material";
import { StudentSkeleton } from "components/admin/skeleton";
import { LmsCard, SearchBar } from "components/common";
import { Empty } from "components/core";
import { BatchLayout } from "components/teachers";
import { useAuth, useSWRFetch } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { useRouter } from "next/router";
import { useDeferredValue, useState } from "react";
import BatchType from "types/batch";
import SubjectType from "types/subject";
import UserType from "types/user";

type ClassDataType = {
  data: {
    batch: BatchType;
    cancelled: boolean;
    credits: number;
    isHoliday: boolean;
    startTime: string;
    subject: SubjectType;
    endTime: string;
    _id: string;
    teacher: UserType;
    type: string;
  }[];
  isLastChunk: boolean;
  pageNo: number;
  perPage: number;
  totalCount: number;
};

const ClassList = () => {
  const { push, query } = useRouter();
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");

  const searchTitle = useDeferredValue(searchText?.trim());

  const { user } = useAuth();
  //perPage=20& --- if necessary
  const { data: batchClass, isValidating } = useSWRFetch<ClassDataType>(
    query?.batchId &&
      `batch/${query?.batchId}/previous-class?pageNo=${pageNo}` +
        (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );
  return (
    <BatchLayout>
      <div className="w-full">
        {/* <SearchBar searchText={searchText} setSearchText={setSearchText} /> */}
        <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {!batchClass || isValidating ? (
            <StudentSkeleton i={7} />
          ) : batchClass?.data?.length ? (
            batchClass?.data?.map((item) => (
              <LmsCard
                key={item._id}
                data={item}
                type={user?.role as any}
                onClick={() =>
                  push(
                    `/panel/${
                      user?.role === "TEACHER" ? "teacher" : "admin"
                    }/batch/${query?.batchId}/class/${item?._id}`
                  )
                }
              />
            ))
          ) : (
            <div className="w-full flex items-center justify-center col-span-12 ">
              <Empty title="No class available" />{" "}
            </div>
          )}
        </div>
        {/* Pagination */}
        {/* <div className="w-full flex items-center justify-center py-4">
          <Pagination
            count={Math.ceil(Number(batchClass?.totalCount || 1) / 20)}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </div>
    </BatchLayout>
  );
};

export default withTeacherAdminProtected(ClassList);
