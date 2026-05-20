import { Avatar, Pagination } from "@mui/material";
import { AddCompanyDrawer, CompanyCard } from "components/admin";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useState } from "react";
import CompanyType from "types/company";

type dataType = {
  data: CompanyType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const Company = () => {
  const [pageNo, setPageNo] = useState(1);
  const [editDepartmentDrawer, setEditDepartmentDrawer] = useState(false);
  //perPage=8&   -----if needed
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `placement/company?pageNo=${pageNo}`
  );
  return (
    <div className="w-full">
      <PrivateLayout title="Company">
        <div className="px-4 mt-6">
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-theme rounded-xl ">
              <span
                className={`flex flex-col p-2 2xl:p-4 items-center justify-center mt-5  h-52 xl:h-52 2xl:h-52`}
              >
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/128/11794/11794850.png"
                  variant="rounded"
                  sx={{
                    height: 80,
                    width: 80,
                  }}
                />
                <AddCompanyDrawer feeName="Add" Dmutate={mutate} />
              </span>
            </div>
            {data?.data?.map((item: CompanyType) => (
              <CompanyCard
                _id={item?._id}
                key={item?._id}
                name={item?.name}
                phoneNumber={item?.phoneNumber}
                industry={item?.industry}
                branch={item?.branch}
                address={item?.address}
                description={item?.description}
                // companyRepresentative={item?.companyRepresentative}
                iconUrl={item?.iconUrl}
                mutate={mutate}
                // instituteId={item?.instituteId}
              />
            ))}
          </div>
          {/* ------------------------Pagination--------------------------- */}
          {/* <div className="w-full flex items-center justify-center py-10">
            <Pagination
              count={Math.ceil(
                Number(data?.totalCount || 1) / Number(data?.perPage || 1)
              )}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Company);
