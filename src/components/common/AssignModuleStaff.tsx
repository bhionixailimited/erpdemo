import { Add, AssignmentTurnedIn, Delete } from "@mui/icons-material";
import {
  IconButton,
  Tooltip,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  ListItemButton,
} from "@mui/material";
import { CustomDrawer, Empty } from "components/core";
import { useFetch, useSWRFetch } from "hooks";
import { notify, Permission } from "utils";
import Swal from "sweetalert2";

type PermissionData = {
  data: any;
};

type Props = {
  open: boolean;
  onClose: () => void;
  mutate: () => void;
  currentUser: string;
};

const AssignModuleStaff = ({ open, onClose, mutate, currentUser }: Props) => {
  const { data: permissions, mutate: permissionMutate } =
    useSWRFetch<PermissionData>(
      open ? `staff/permissions/${currentUser}` : undefined
    );

  const { mutate: department } = useFetch();
  const handleAssignModule = async (moduleName: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Assign it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await department({
              path: `staff/permissions/${currentUser}`,
              method: "POST",
              body: JSON.stringify({
                [moduleName]: true,
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }

            permissionMutate();
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleRemoveModule = async (moduleName: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Remove it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await department({
              path: `staff/permissions/${currentUser}`,
              method: "POST",
              body: JSON.stringify({
                [moduleName]: false,
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }

            permissionMutate();
            mutate && mutate();
            notify.success("Module remove successfully");
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <CustomDrawer
        open={open}
        onClose={onClose}
        anchor="right"
        maxWidth="md"
        width="35vw"
      >
        <div className="w-full p-4 mt-16 md:mt-0">
          {Permission?.length ? (
            <>
              <h2 className="px-4 md:text-xl text-theme font-bold">
                <AssignmentTurnedIn className="!text-3xl !mr-3" />
                Assign Module
              </h2>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                {[
                  ...Permission,
                  // {
                  //   sl: 90,
                  //   label: "Institute",
                  //   value: "manageInstitute",
                  // },
                ]?.map((item) => (
                  <ListItem
                    className="!bg-pink-100 !my-2 !rounded-xl"
                    key={item?.sl}
                    alignItems="flex-start"
                    secondaryAction={
                      <>
                        {permissions?.data && permissions?.data[item?.value] ? (
                          <Tooltip title="Delete Module">
                            <IconButton
                              onClick={() => handleRemoveModule(item?.value)}
                            >
                              <Delete className="text-red-500" />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Assign Module">
                            <IconButton
                              onClick={() => handleAssignModule(item?.value)}
                            >
                              <Add className="text-theme" />
                            </IconButton>
                          </Tooltip>
                        )}
                      </>
                    }
                  >
                    <ListItemButton className="cursor-auto hover:bg-transparent">
                      <ListItemAvatar>
                        <Avatar
                          variant="rounded"
                          alt="Choose image"
                          src={`https://cdn-icons-png.flaticon.com/128/7156/7156218.png`}
                        ></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <>
                            <Typography className="!text-theme font-semibold text-lg">
                              {item?.label} Module
                            </Typography>
                          </>
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </>
          ) : (
            <Empty title="No Permission Found" />
          )}
        </div>
      </CustomDrawer>
    </>
  );
};

export default AssignModuleStaff;
