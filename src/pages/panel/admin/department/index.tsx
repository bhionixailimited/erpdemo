import { useState } from "react";
import { Avatar, Pagination, Skeleton } from "@mui/material";
import { AllDepartmentCard, EditDepartmentDrawer } from "components/admin";
import { PrivateLayout } from "layouts";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import DepartmentType from "types/department";
import { DepartmentSkeleton } from "components/admin/skeleton";
import { useDeferredValue } from "react";
import { SearchBar } from "components/common";
import DepartmentDialog from "components/admin/dialog/DepartmentDialog";

type dataType = {
  data: DepartmentType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const ViewDepartment = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [editDepartmentDrawer, setEditDepartmentDrawer] = useState(false);
  //perPage=15& ---- if necessary
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `department?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "")
  );
  return (
    <div className="w-full">
      <PrivateLayout title="Department | Manage">
        <div className="px-4 mt-4">
          <SearchBar searchText={searchText} setSearchText={setSearchTitle} />
          <div className="grid grid-cols-12 gap-4 w-full mt-5">
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-theme rounded-xl ">
              <span
                className={`flex flex-col p-2 2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-44`}
              >
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/128/2666/2666475.png"
                  variant="rounded"
                  sx={{
                    height: 54,
                    width: 54,
                  }}
                />
                <DepartmentDialog mutate={mutate} />
              </span>
            </div>
            {isValidating ? (
              <DepartmentSkeleton i={7} />
            ) : (
              data?.data?.map((item) => (
                <AllDepartmentCard
                  _id={item._id}
                  key={item?.iconUrl}
                  title={item?.title}
                  description={item?.description}
                  avatarSrc={item?.iconUrl}
                  editDepartment={() =>
                    setEditDepartmentDrawer(item?._id as any)
                  }
                  mutate={mutate}
                />
              ))
            )}
          </div>
          {/* <div className="w-full flex items-center justify-center py-4">
            <Pagination
              count={Math.ceil(
                Number(data?.totalCount || 1) / Number(data?.perPage || 1)
              )}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
          <EditDepartmentDrawer
            mutate={mutate}
            open={editDepartmentDrawer}
            onClose={() => setEditDepartmentDrawer(false)}
          />
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ViewDepartment);
