import {
  Badge,
  Delete,
  DeleteForever,
  DoneAll,
  Info,
  Notifications,
} from "@mui/icons-material";
import { Tooltip, Skeleton, Pagination } from "@mui/material";
import { NotificationDialog } from "components/admin/dialog";
import { Button, Empty } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import Swal from "sweetalert2";
import { NotificationType } from "types/notification";
import { notify } from "utils";
import { useState } from "react";
import useAppContext from "contexts/AppContextProvider";

type dataType = {
  data: NotificationType[];
  totalCount: number;
  perPage: number;
};
const NotificationBox = () => {
  const [pageNo, setPageNo] = useState(1);
  const { reloadNotificationCount } = useAppContext();

  const { mutate: deleteN } = useFetch();
  //perPage=15&   ----- if needed
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `notification?pageNo=${pageNo}`
  );
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await deleteN({
              path: `notification`,
              method: "DELETE",
              body: JSON.stringify({
                notificationId: id,
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            reloadNotificationCount();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteAll = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await deleteN({
              path: `notification/all`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            reloadNotificationCount();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRead = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, read all!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await deleteN({
              path: `notification/all`,
              method: "PUT",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            reloadNotificationCount();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex flex-col items-center justify-center">
      {!data ? (
        <div className="flex flex-col gap-4 w-full">
          {Array(5)
            .fill(0)
            .map((_, index) => (
              <div className="flex flex-col w-full" key={index}>
                <Skeleton variant="text" width={200} animation="wave" />
                <Skeleton variant="rounded" height={50} animation="wave" />
              </div>
            ))}
        </div>
      ) : (
        <div className="w-full flex justify-between flex-col gap-4">
          {data?.data && data?.data?.length > 0 ? (
            <>
              <div className="flex gap-2 justify-end">
                <Button startIcon={<DoneAll />} onClick={() => handleRead()}>
                  Read All
                </Button>
                <Button
                  startIcon={<DeleteForever />}
                  className="bg-red-500"
                  onClick={() => handleDeleteAll()}
                >
                  {" "}
                  Delete All
                </Button>
              </div>
              {data?.data?.map((item) => (
                <div
                  key={item?._id}
                  className={`${
                    !item?.readStatus && "bg-blue-200"
                  } w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 rounded-lg flex flex-col md:flex-row justify-between md:px-3 items-center`}
                >
                  <div className="flex gap-2 justify-between w-full md:w-4/5">
                    <div className="gap-2 flex">
                      <div className="w-12 h-12 flex items-center justify-center text-theme rounded-full md:bg-gray-100">
                        <Notifications className="text-3xl" />
                      </div>
                      <div className="flex flex-col">
                        <p className="font-semibold text-sm md:text-md">
                          {item?.title}
                        </p>
                        <p className="text-sm break-words ">
                          {item?.description?.length > 25
                            ? item?.description?.slice(0, 25) + "..."
                            : item?.description}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm font-semibold text-theme hidden md:flex items-center">
                      {dayjs(item?.createdAt).format("MMM D, YYYY h:mm A")}
                    </div>
                  </div>
                  <div className="w-full md:w-1/5 flex justify-center md:justify-end text-sm">
                    <p className=" pr-2 !text-theme md:hidden">
                      {" "}
                      {dayjs(item?.createdAt).format("MMM D, YYYY h:mm A")}
                    </p>
                    <Tooltip title="Details">
                      <p className="border-r-2 pr-2 !text-theme">
                        <NotificationDialog Dmutate={mutate} fee={item} />
                      </p>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <p
                        className="pl-2 !text-themeSecondary"
                        onClick={() => handleDelete(item?._id)}
                      >
                        <Delete className="cursor-pointer" />
                      </p>
                    </Tooltip>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <Empty title={"No Notification Found"} />
          )}
        </div>
      )}
      {/* ----------------------Pagination--------------------- */}
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
  );
};

export default NotificationBox;
