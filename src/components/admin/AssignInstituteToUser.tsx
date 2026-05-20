import {
  Add,
  PersonAdd,
  PersonRemove,
  VerifiedUser,
} from "@mui/icons-material";
import { Button, CustomDrawer, IOSSwitch } from "components/core";
import { Avatar, Dialog, Toolbar } from "@mui/material";
import { useState } from "react";
import { InstituteType } from "types/institute";
import { useFetch, useSWRFetch } from "hooks";
import { notify } from "utils";

type DataType = {
  data: InstituteType[];
};

const AssignInstituteToUser = ({
  instituteAssigned,
  userId,
  reValidate,
}: {
  instituteAssigned: InstituteType[];
  userId: string;
  reValidate?: () => void;
}) => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { mutate } = useFetch();
  const {
    data,
    isValidating,
    mutate: reFetch,
  } = useSWRFetch<DataType>(`institute`);

  const handleChangeAssignFromInstitute = async (
    instituteId: string,
    assign: boolean
  ) => {
    try {
      const response = await mutate({
        path: `institute/assign/${instituteId}/${userId}?assign=${assign}`,
        method: "POST",
      });

      if (response?.status !== 200) throw new Error(response?.data?.error);
      reValidate?.();
      reFetch?.();
    } catch (error) {
      if (error instanceof Error) {
        return notify.error(error?.message);
      }
      notify.error("Something went wrong!");
    }
  };

  return (
    <>
      <span
        className=" bg-transparent w-full hover:bg-yellow-200/50 transition-all ease-in-out duration-300 cursor-pointer"
        onClick={() => setOpenDrawer(true)}
      >
        <Toolbar title="Assign Institutes">
          <VerifiedUser className=" !text-4xl !text-yellow-500" />
        </Toolbar>
      </span>
      <CustomDrawer
        anchor="right"
        maxWidth="md"
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
      >
        <div className="w-full p-4 border-b items-center justify-between flex ">
          <h3 className="font-medium text-theme tracking-wide text-xl">
            Assigned Institutes
          </h3>
        </div>
        <div className="flex flex-col gap-4 overflow-hidden pb-8 overflow-y-auto ">
          {instituteAssigned?.map((item) => (
            <div
              className="flex items-center justify-between rounded-full p-4 bg-white shadow-lg gap-4 flex-wrap"
              key={item?._id}
            >
              <div className="flex items-center gap-4">
                <Avatar src={item?.logoUrl}> {item?.instituteName[0]} </Avatar>
                <div className="flex flex-col ">
                  <h3 className="font-medium text-sm tracking-wide">
                    {item?.instituteName}
                  </h3>
                  <small>{item?.email}</small>
                </div>
              </div>
              <Button
                startIcon={<PersonRemove />}
                className="!bg-themeSecondary !ring-themeSecondary"
                onClick={() =>
                  handleChangeAssignFromInstitute(item?._id, false)
                }
              >
                Remove
              </Button>
            </div>
          ))}
          {data?.data
            ?.filter(
              (item) =>
                !instituteAssigned?.some((inner) => inner?._id === item?._id)
            )
            ?.map((item) => (
              <div
                className="flex items-center justify-between rounded-full p-4 bg-white shadow-lg gap-4 flex-wrap"
                key={item?._id}
              >
                <div className="flex items-center gap-4">
                  <Avatar src={item?.logoUrl}>
                    {" "}
                    {item?.instituteName[0]}{" "}
                  </Avatar>
                  <div className="flex flex-col ">
                    <h3 className="font-medium text-sm tracking-wide">
                      {item?.instituteName}
                    </h3>
                    <small>{item?.email}</small>
                  </div>
                </div>
                <Button
                  startIcon={<PersonAdd />}
                  onClick={() =>
                    handleChangeAssignFromInstitute(item?._id, true)
                  }
                >
                  Assign
                </Button>
              </div>
            ))}
        </div>
      </CustomDrawer>
    </>
  );
};

export default AssignInstituteToUser;
