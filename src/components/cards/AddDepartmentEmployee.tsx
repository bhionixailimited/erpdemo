import { Avatar } from "@mui/material";
import { CustomDialog, CustomAutocomplete, Button } from "components/core";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import React, { useState } from "react";
import UserType from "types/user";
import { notify } from "utils";

type OtherUserDataType = {
  data: UserType[];
};

const AddDepartmentEmployee = ({
  open,
  setOpen,
  departmentId,
  reload,
  allEmployee,
}: {
  open: boolean;
  setOpen: any;
  departmentId: string;
  reload: any;
  allEmployee: {
    user: UserType;
  }[];
}) => {
  const [selectedUser, setSelectedUser] = useState<UserType | undefined>();
  const [searchTitle, setSearchTitle] = useState("");

  const { data: otherUsers } = useSWRFetch<OtherUserDataType>(
    `user?role=STAFF&role=TEACHER&perPage=10&pageNo=1${
      searchTitle ? `&searchTitle=${searchTitle}` : ""
    }`
  );

  const { mutate } = useFetch();
  const handleAddUser = async () => {
    try {
      if (!selectedUser) return notify.error("Please select a user");
      if (allEmployee?.some((item) => item?.user?._id === selectedUser?._id))
        return;

      const response = await mutate({
        method: "PUT",
        path: "department/assign-staff",
        body: JSON.stringify({
          departmentId: departmentId,
          staffId: selectedUser?._id,
        }),
      });

      if (response?.data?.error) throw new Error(response.data.error);

      notify.success("User added successfully");
      reload?.();
      setOpen(false);
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Something went wrong");
      }
    }
  };

  return (
    <CustomDialog open={open} onClose={() => setOpen(false)} maxWidth="md">
      <h3 className="font-medium tracking-wide text-base text-center p-4 bg-theme text-white ">
        Add New Employee
      </h3>
      <div className="flex flex-col gap-4 items-center p-4 ">
        <div className="w-full bg-white shadow-xl rounded-lg p-4 scale-100 hover:scale-95 duration-300 ease-in-out transition-all cursor-pointer select-none ">
          <div className="w-full flex gap-4 items-start">
            <div className="flex items-center justify-center w-fit">
              <Avatar
                src={selectedUser?.photoUrl}
                sx={{
                  height: "5rem",
                  width: "5rem",
                  borderRadius: "5px",
                }}
                className="!bg-gray-100 !shadow-lg"
              >
                {selectedUser?.displayName[0]}
              </Avatar>
            </div>

            <div className="flex flex-col gap-1 items-start">
              <h3 className="font-semibold tracking-wide text-xl break-words break-all">
                {selectedUser?.displayName}
              </h3>
              <div className="flex items-center w-full gap-4 justify-between">
                <small className="tracking-wide bg-theme px-2 py-1 text-white rounded-md !shadow-lg break-words break-all">
                  {selectedUser?.email}
                </small>
                {allEmployee?.some(
                  (item) => item?.user?._id === selectedUser?._id
                ) && (
                  <small className="tracking-wide bg-green-500 px-2 py-1 text-white rounded-md !shadow-lg break-words break-all">
                    Assigned
                  </small>
                )}
              </div>
              <small className="tracking-wide text-gray-500 break-words break-all">
                {selectedUser?.phoneNumber}
              </small>
            </div>
          </div>
        </div>

        <CustomAutocomplete
          onSearchTextChange={(e) => setSearchTitle(e?.target?.value)}
          options={otherUsers?.data?.map((item) => {
            return {
              key: item?._id,
              label: item?.displayName,
              value: item?._id,
            };
          })}
          onChange={(event, value) => {
            setSelectedUser(
              otherUsers?.data?.find((item) => item?._id === value?.value)
            );
          }}
        />

        <Button
          disabled={allEmployee?.some(
            (item) => item?.user?._id === selectedUser?._id
          )}
          onClick={handleAddUser}
        >
          Add To Department
        </Button>
      </div>
    </CustomDialog>
  );
};

export default AddDepartmentEmployee;
