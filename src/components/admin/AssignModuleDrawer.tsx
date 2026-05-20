import {
  Add,
  AssignmentTurnedIn,
  Assistant,
  Badge,
  Delete,
  Done,
  Edit,
  ManageAccounts,
  RotateLeft,
  SecurityUpdateWarningTwoTone,
} from "@mui/icons-material";
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
import {
  Button,
  CustomDrawer,
  Empty,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import { useCurrency, useFetch, useSWRFetch } from "hooks";
import React, { useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DepartmentType from "types/department";
import { notify, Permission } from "utils";
import Swal from "sweetalert2";
import PermissionsType from "types/permissions";

const editUserSchema = [
  {
    key: "1",
    name: "departmentName",
    label: "Department Name",
    initialValue: "",
    validationSchema: Yup.string().required("Department name is required."),
    type: "text",
  },
  {
    key: "2",
    name: "description",
    label: "Description",
    initialValue: "",
    validationSchema: Yup.string().required("Description is required."),
    type: "text",
    multiline: true,
    rows: 5,
  },
];
type DepartmentData = {
  data: DepartmentType;
};
type PermissionData = {
  data: any;
};
const AssignModuleDrawer = ({ open, onClose, mutate }: any) => {
  const [value, setValue] = useState<any>("");
  const { data } = useSWRFetch<DepartmentData>(open && `department/${open}`);
  const { data: permissions, mutate: permissionMutate } =
    useSWRFetch<PermissionData>(open && `department/permission/${open}`);

  const upload_picture = useRef<any>();
  const onButtonPress = () => {
    upload_picture?.current && upload_picture?.current?.click();
  };

  const initialValues = editUserSchema?.reduce((accumulator, currentValue) => {
    accumulator[currentValue?.name] = currentValue.initialValue;
    return accumulator;
  }, {} as any);

  const validationSchema = editUserSchema?.reduce(
    (accumulator, currentValue) => {
      accumulator[currentValue?.name] = currentValue.validationSchema;
      return accumulator;
    },
    {} as any
  );

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (values) => {
      // toast.success("User updates successfully");
    },
  });
  const resetFields = () => {
    formik.resetForm();
    setValue("");
  };
  const [openDrawer, setOpenDrawer] = useState(false);
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
              path: `department/assign-module/${open}`,
              method: "POST",
              body: JSON.stringify({
                [moduleName]: true,
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            setOpenDrawer(false);
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
              path: `department/assign-module/${open}`,
              method: "POST",
              body: JSON.stringify({
                [moduleName]: false,
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            setOpenDrawer(false);
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

  return (
    <>
      <CustomDrawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        anchor="right"
        maxWidth="md"
        width="35vw"
      >
        <div className="w-full p-4 mt-16 md:mt-0">
          {Permission?.length ? (
            <>
              <h2 className="px-4 md:text-xl text-theme font-bold">
                <AssignmentTurnedIn className="text-3xl" />
                {`Assign Module (
                ${
                  data?.data?.title &&
                  data?.data?.title?.charAt(0).toUpperCase() +
                    data?.data?.title?.slice(1)
                }
                Department)`}
              </h2>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                {Permission?.map((item) => (
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
                          alt="Remy Sharp"
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
            <Empty title="No Employees Found" />
          )}
        </div>
      </CustomDrawer>
      <span
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-cyan-400  px-8 h-full  flex items-center justify-center rounded-tl-lg"
        onClick={() => setOpenDrawer(true)}
      >
        <Tooltip title={"Assign Module"}>
          <AssignmentTurnedIn className="text-white" />
        </Tooltip>
      </span>
    </>
  );
};

export default AssignModuleDrawer;
