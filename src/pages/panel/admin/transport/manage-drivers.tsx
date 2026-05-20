import MaterialTable from "@material-table/core";
import { Add, Delete } from "@mui/icons-material";
import {
  AddDriverDialog,
  AddTransportDialog,
  DriverDetailsDialog,
  LeaveDetailsDialog,
} from "components/admin/dialog";
import { Button, Empty } from "components/core";
import { PrivateLayout } from "layouts";
import { MuiTblOptions } from "utils";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
  Pagination,
} from "@mui/material";
import dayjs from "dayjs";
import {
  EditLeaveManagementDrawer,
  EditTransportDrawer,
} from "components/admin";
import { SearchBar } from "components/common";
import { DriverCard } from "components/cards";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { DepartmentSkeleton, DriverSkeleton } from "components/admin/skeleton";
import { useDeferredValue, useState } from "react";
const drivers = [
  {
    key: 1,
    imgSrc: "https://cdn-icons-png.flaticon.com/128/9365/9365931.png",
    phoneNumber: "5654176877",
    name: "John Doe",
    assigned: true,
    licenseNo: "RJ-997453255",
  },
  {
    key: 2,
    imgSrc: "https://cdn-icons-png.flaticon.com/128/9365/9365919.png",
    phoneNumber: "5654776877",
    name: "John Doe",
    assigned: true,
    licenseNo: "RJ-997453255",
  },
  {
    key: 3,
    imgSrc: "https://cdn-icons-png.flaticon.com/128/9365/9365931.png",
    phoneNumber: "5654176877",
    name: "John Doe",
    assigned: true,
    licenseNo: "RJ-997453255",
  },
  {
    key: 4,
    imgSrc: "https://cdn-icons-png.flaticon.com/128/9365/9365919.png",
    phoneNumber: "5654776877",
    name: "John Doe",
    assigned: true,
    licenseNo: "RJ-997453255",
  },
  {
    key: 5,
    imgSrc: "https://cdn-icons-png.flaticon.com/128/9365/9365931.png",
    phoneNumber: "5654176877",
    name: "John Doe",
    assigned: true,
    licenseNo: "RJ-997453255",
  },
  {
    key: 6,
    imgSrc: "https://cdn-icons-png.flaticon.com/128/9365/9365919.png",
    phoneNumber: "5654776877",
    name: "John Doe",
    assigned: true,
    licenseNo: "RJ-997453255",
  },
];
const ManageDrivers = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  //perPage=15& --- if necessary
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `driver?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "")
  );

  return (
    <div className="w-full">
      <PrivateLayout title="Transport | Manage">
        <div className="m-auto px-5 py-4 md:py-2">
          <div className="mb-4 flex flex-col md:flex-row bg-indigo-50 p-4 rounded-md shadow-md gap-2 justify-between">
            <h2 className="text-theme text-3xl font-bold  ">Driver Details</h2>
            <div>
              <AddDriverDialog mutate={mutate} />
            </div>
          </div>
          <SearchBar searchText={searchText} setSearchText={setSearchTitle} />
          <div className="w-full grid grid-cols-12 mt-4 gap-4">
            {isValidating ? (
              <DriverSkeleton i={data?.data?.length || 8} />
            ) : data?.data?.length >= 1 ? (
              data?.data?.map((item: any, i: number) => (
                <DriverCard
                  data={item}
                  mutate={mutate}
                  key={item?.key}
                  name={item?.name}
                  phoneNumber={item?.phoneNumber}
                  assigned={item?.assigned}
                  expiry={item?.licenseExpiryDate}
                  imgSrc={item?.photoUrl}
                  licenseNo={item?.drivingLicenseNumber}
                />
              ))
            ) : (
              <div className="col-span-12">
                <Empty title="No Driver Found" />
              </div>
            )}
          </div>
          {/* -----------------------Pagination-------------------------- */}
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
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ManageDrivers);
