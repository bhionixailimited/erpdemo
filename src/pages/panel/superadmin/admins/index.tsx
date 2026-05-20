import { Email, PhoneTwoTone } from "@mui/icons-material";
import { Pagination } from "@mui/material";
import { AdminCard } from "components/cards";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React, { useDeferredValue, useState } from "react";
import UserType from "types/user";
type dataType = {
  data: UserType[];
  totalCount?: number;
  perPage?: number;
};
const Admins = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchTitle = useDeferredValue(searchText);
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `user?role=ADMIN&perPage=15&pageNo=${pageNo}` +
      (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );

  return (
    <PrivateLayout>
      <div className="w-full md:p-4">
        <SearchBar searchText={searchTitle} setSearchText={setSearchText} />
        <div className="grid grid-cols-12 gap-3 mt-5 w-full">
          {
            // data?.data && isValidating ? (
            //   Array(8)
            //     .fill(0)
            //     .map((i) => (
            //       <div
            //         className="xl:col-span-3 md:col-span-6 col-span-12 lg:col-span-4 bg-gray-400 h-44 w-full rounded-2xl"
            //         key={i}
            //       ></div>
            //     ))
            // ) :

            data?.data?.length ? (
              data?.data?.map((item) => (
                <AdminCard
                  key={item?._id}
                  name={item?.displayName}
                  photoUrl={item?.photoUrl}
                  email={item?.email}
                  phoneNumber={item?.phoneNumber}
                  countryCode={item?.countryCode}
                  gender={item?.gender}
                  institutes={item?.institute as any}
                  // dob={item?.dateOfBirth}
                  caste={item?.caste}
                  _id={item?._id}
                  mutate={mutate}
                  role={item?.role}
                  joinedAt={item?.createdAt}
                />
              ))
            ) : (
              <div className="col-span-12">
                <Empty title={"No Admin Found"} />
              </div>
            )
          }
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

export default withProtectedSuperAdmin(Admins);
