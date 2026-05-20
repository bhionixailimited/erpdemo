import { Pagination } from "@mui/material";
import { AdminCard } from "components/cards";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useDeferredValue, useState } from "react";
import UserType from "types/user";
type dataType = {
  data: UserType[];
  totalCount?: number;
  perPage?: number;
};
const Managers = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchTitle = useDeferredValue(searchText);
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `user?role=MANAGER&perPage=15&pageNo=${pageNo}` +
      (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );
  return (
    <PrivateLayout>
      <div className="w-full md:p-4">
        <div className="grid grid-cols-12 gap-3">
          {data?.data?.length ? (
            data?.data?.map((item) => (
              <AdminCard
                key={item?._id}
                name={item?.displayName}
                photoUrl={item?.photoUrl}
                email={item?.email}
                phoneNumber={item?.phoneNumber}
                countryCode={item?.countryCode}
                gender={item?.gender}
                dob={item?.dateOfBirth}
                caste={item?.caste}
                _id={item?._id}
                mutate={mutate}
                role={"MANAGER"}
              />
            ))
          ) : (
            <div className="col-span-12">
              <Empty title={"No Manager Found"} />
            </div>
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
  );
};

export default withProtectedSuperAdmin(Managers);
