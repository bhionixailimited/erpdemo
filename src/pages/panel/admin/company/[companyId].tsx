import { Pagination } from "@mui/material";
import { PlacedStudentCards } from "components/cards";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import CompanyType from "types/company";

type dataType = {
  data: CompanyType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const CompanyId = () => {
  const [pageNo, setPageNo] = useState(1);
  const { companyId } = useRouter()?.query;
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `placement/company?companyId=${companyId}&getUserData=true&perPage=8&pageNo=${pageNo}`
  );
  //   console.log(companyId);
  // console.log(data?.data?.[0]?.studentPlaced);
  return (
    <div className="w-full">
      <PrivateLayout title="Company">
        <div className="px-4 mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
            {data?.data?.[0]?.studentPlaced?.length > 0 ? (
              data?.data?.[0]?.studentPlaced?.map((item: any, index: any) => (
                <div key={index}>
                  <PlacedStudentCards
                    key={index}
                    studentName={item?.student?.displayName}
                    branch={item?.student?.batch?.branch}
                    course={item?.student?.batch?.course}
                    session={item?.student?.batch?.session}
                    email={item?.student?.email}
                    gender={item?.student?.gender}
                    rollNumber={item?.student?.rollNumber}
                    placementYear={item?.placementYear}
                  />
                </div>
              ))
            ) : (
              <Empty title="No Student Found" />
            )}
          </div>
          <div className="w-full flex items-center justify-center py-10">
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
    </div>
  );
};

export default withProtectedAdmin(CompanyId);
