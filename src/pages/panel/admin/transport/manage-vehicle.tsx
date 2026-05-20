import { Pagination } from "@mui/material";
import { AddVehicleDetailsDialog } from "components/admin/dialog";
import { DepartmentSkeleton } from "components/admin/skeleton";
import { VehicleCard } from "components/cards";
import { SearchBar } from "components/common";
import { Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useDeferredValue, useState } from "react";

const TransportManageVehicle = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  //perPage=12& --- if necessary
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `vehicle?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "")
  );
  return (
    <div className="w-full">
      <PrivateLayout title="Admin | Vehicle">
        <section className="w-full bg-gray-50 p-4 ">
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
            <h2 className="text-theme text-3xl font-bold ">Vehicle Details</h2>
            <div>
              <AddVehicleDetailsDialog mutate={mutate} />
            </div>
          </div>
          <SearchBar searchText={searchText} setSearchText={setSearchTitle} />
          <div className="w-full grid grid-cols-12 mt-4 gap-4">
            {isValidating ? (
              <DepartmentSkeleton i={data?.data?.length || 8} />
            ) : data?.data?.length >= 1 ? (
              data?.data?.map((item: any, i: number) => (
                <VehicleCard
                  vehicle={item}
                  key={item?.key}
                  title={item?.vehicleName}
                  vehicleNumber={item?.vehicleNumber}
                  assigned={item?.assigned}
                  status={item?.status}
                  imgSrc={item?.imageFile}
                  mutate={mutate}
                />
              ))
            ) : (
              <span className="col-span-12">
                <Empty title="No Vehicles Found" />
              </span>
            )}
          </div>
          {/* -----------------------Pagination-------------------------- */}
          {/* <div className="w-full flex items-center justify-center py-4 mt-2">
            <Pagination
              count={Math.ceil(
                Number(data?.totalCount || 1) / Number(data?.perPage || 1)
              )}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(TransportManageVehicle);
