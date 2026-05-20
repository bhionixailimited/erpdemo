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
} from "@mui/material";
import {
  Button,
  CustomAutocomplete,
  CustomDialog,
  CustomDrawer,
  Empty,
  ImageField,
  InputField,
  TextInput,
  UploadFile,
} from "components/core";
import { useCurrency, useFetch, useSWRFetch } from "hooks";
import React, { useEffect, useRef, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import DepartmentType from "types/department";
import Swal from "sweetalert2";
import { notify } from "utils";
import UserType from "types/user";
import { AddDepartmentEmployee, PlacedStudentCard } from "components/cards";
const Employee = [
  {
    sl: 1,
    name: "Alexa Smith",
    email: "employee1@gmail.com",
  },
  {
    sl: 2,
    name: "Kylee Arroyo",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Randall Forbes",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Matthew Frazier",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Nyasia Hubbard",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Damaris Hooper",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Anastasia Hobbs",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Allison Carney",
    email: "employee1@gmail.com",
  },
  {
    sl: 1,
    name: "Maxim Hampton",
    email: "employee1@gmail.com",
  },
];
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

const ViewEmployeeDrawer = ({ open, onClose }: any) => {
  const [openDialog, setOpenDialog] = useState(false);

  const { mutate: department } = useFetch();
  const { data, mutate } = useSWRFetch<DepartmentData>(
    open && `department/${open}`
  );
  const { data: employees, mutate: permissionMutate } = useSWRFetch<any>(
    open && `department/staff/${open}`
  );

  const [openDrawer, setOpenDrawer] = useState(false);
  const handleRemoveEmployee = async (id: string) => {
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
            const response = await department({
              path: `department/remove-staff/${id}`,
              method: "PUT",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            permissionMutate && permissionMutate();
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
        <AddDepartmentEmployee
          open={openDialog}
          setOpen={setOpenDialog}
          departmentId={open}
          reload={permissionMutate}
          allEmployee={employees?.data}
        />

        <div className="w-full p-4">
          <div className="flex flex-col md:flex-row gap-4 justify-between mt-4">
            <h2 className="px-4 text-xl text-theme font-bold">
              <Assistant className="text-4xl" />
              {` ${data?.data?.title} Department
                Employees`}
            </h2>
            <Button
              className="!text-xs"
              startIcon={<Add />}
              onClick={() => setOpenDialog(true)}
            >
              Add Employee
            </Button>
          </div>
          {employees?.data?.length > 0 ? (
            <>
              <List
              // sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              >
                {employees?.data?.map((item: any) => (
                  <ListItem
                    className="!bg-indigo-100 !my-2 !rounded-xl"
                    key={item?._id}
                    alignItems="flex-start"
                    secondaryAction={
                      <Tooltip title="Remove Employees">
                        <IconButton
                          onClick={() => handleRemoveEmployee(item?.user?._id)}
                        >
                          <Delete className="text-red-500" />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar
                        alt="Remy Sharp"
                        // src={`https://avatars.dicebear.com/api/avataaars/${item?.name}.svg`}
                        src={`${item?.user?.photoUrl}`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <>
                          <Typography className="!text-theme font-semibold text-lg break-all">
                            {item?.user?.displayName}
                          </Typography>
                        </>
                      }
                      secondary={
                        <>
                          <Typography
                            sx={{ display: "inline" }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                            className="!text-theme font-semibold !break-all"
                          >
                            {item?.user?.email}
                          </Typography>
                        </>
                      }
                    />
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
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-orange-400  px-8 h-full  flex items-center justify-center rounded-tl-lg"
        onClick={() => setOpenDrawer(true)}
      >
        <Tooltip title={"View Employees"}>
          <Badge className="text-white" />
        </Tooltip>
      </span>
    </>
  );
};

export default ViewEmployeeDrawer;
