import {
  DoneAll,
  Pending,
  Quickreply,
  RemoveCircle,
} from "@mui/icons-material";
import { Avatar, Checkbox, Pagination, Skeleton } from "@mui/material";
import { SendReply } from "components/admin";
import { Button, Empty } from "components/core";
import dayjs from "dayjs";
import {
  useFetch,
  useSWRFetch,
  withProtectedAdmin,
  withProtectedSuperAdmin,
} from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { EnquireType } from "types/enquiry";
import { notify } from "utils";
type dataType = {
  data: EnquireType[];
  totalCount: number;
  perPage: number;
};
const Grievance = () => {
  const [resolved, setResolved] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const { push } = useRouter();
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    `enquiry?toAdmin=true&perPage=10&pageNo=${pageNo}&resolved=${resolved}`
  );
  const { mutate: enquiry } = useFetch();
  const handleResolve = () => {
    setResolved((prev) => !prev);
  };
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, remove it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await enquiry({
              path: `enquiry/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PrivateLayout title="Yard-ERP | Enquiry ">
      <div className="m-auto container  py-4">
        <SendReply
          selectedUsers={selectedUsers}
          handleClose={() => setSelectedUsers(false as any)}
        />
        <div className="w-full flex items-start  gap-4">
          <div className="w-full flex flex-col gap-4">
            <div className="flex justify-end gap-2 ">
              <Button
                disabled={!resolved}
                startIcon={<Pending />}
                onClick={() => handleResolve()}
              >
                Not Resolved
              </Button>
              <Button
                onClick={() => handleResolve()}
                disabled={resolved}
                startIcon={<DoneAll />}
                className="bg-green-500"
              >
                Resolved
              </Button>
            </div>
            {data?.data && data?.data?.length > 0 ? (
              data?.data?.map((item, index) => (
                <div
                  className="w-full bg-white shadow-xl rounded-lg p-4 "
                  key={index}
                >
                  <div className="flex items-center gap-4 pb-4">
                    {isValidating ? (
                      <Skeleton
                        width={60}
                        height={60}
                        animation="wave"
                        variant="circular"
                      />
                    ) : (
                      <Avatar
                        className="!h-12 !w-12"
                        src={item?.user?.photoUrl}
                      />
                    )}
                    <div className="flex flex-col gap-1 ">
                      {isValidating ? (
                        <Skeleton width={250} animation="wave" variant="text" />
                      ) : (
                        <h3 className="font-semibold text-theme tracking-wide text-base">
                          {item?.user?.displayName}
                        </h3>
                      )}

                      <small className="font-medium tracking-wide text-gray-500">
                        {isValidating ? (
                          <Skeleton
                            width={200}
                            animation="wave"
                            variant="text"
                          />
                        ) : (
                          item?.user?.email
                        )}
                      </small>
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 ">
                    {isValidating ? (
                      <Skeleton width={250} animation="wave" variant="text" />
                    ) : (
                      <h3 className="font-semibold text-theme tracking-wide text-lg">
                        {item?.subject}
                      </h3>
                    )}
                  </div>
                  <small className="tracking-wide mb-8 text-gray-700 font-medium">
                    {isValidating ? (
                      <Skeleton
                        width={500}
                        height={70}
                        animation="wave"
                        variant="text"
                      />
                    ) : (
                      item?.recentMessage?.latest?.message &&
                      item?.recentMessage?.latest?.message
                    )}
                  </small>

                  <div className="flex items-center gap-2">
                    {isValidating ? (
                      <Skeleton
                        width={70}
                        height={30}
                        animation="wave"
                        variant="rounded"
                      />
                    ) : (
                      <Button
                        className="!bg-themeSecondary !text-xs "
                        onClick={() => handleDelete(item?._id)}
                        startIcon={<RemoveCircle />}
                      >
                        Remove Query
                      </Button>
                    )}
                    {isValidating ? (
                      <Skeleton
                        width={70}
                        height={30}
                        animation="wave"
                        variant="rounded"
                      />
                    ) : item?.isResolved ? (
                      <span className=" cursor-pointer hover:bg-gray-200 px-2 py-1 rounded-md flex items-center gap-2 text-green-500 pr-4 ">
                        <DoneAll />
                        <h3 className="font-medium tracking-wide text-base">
                          Resolved
                        </h3>
                      </span>
                    ) : (
                      <Button
                        className=" !text-xs "
                        onClick={() =>
                          push(
                            `/panel/superadmin/enquiry/${item?._id}?subject=${item?.subject}`
                          )
                        }
                        startIcon={<Quickreply />}
                      >
                        Reply
                      </Button>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <Empty title={"No Enquiry Found"} />
            )}
          </div>
          {/* <div className=" hidden  lg:flex  flex-col sticky top-0 gap-1 w-full max-w-xs bg-white shadow-xl rounded-lg ">
              <h3 className="font-medium tracking-wide text-lg text-theme p-4 border-b ">
                Filter
              </h3>
              <div className="flex items-center gap-4">
                <Checkbox size="small" />
                <h3 className="font-medium  tracking-wide text-sm">
                  Show Newest
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox size="small" />
                <h3 className="font-medium  tracking-wide text-sm">
                  Show Oldest
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox size="small" />
                <h3 className="font-medium  tracking-wide text-sm">
                  Show Not Replied
                </h3>
              </div>
              <div className="flex items-center gap-4">
                <Checkbox size="small" />
                <h3 className="font-medium  tracking-wide text-sm">
                  Show Replied
                </h3>
              </div>
            </div> */}
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

export default withProtectedSuperAdmin(Grievance);
