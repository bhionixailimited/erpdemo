import { useState } from "react";
import { Avatar, Paper } from "@mui/material";
import {
  AllCourseCard,
  AllDepartmentCard,
  EditCourseDrawer,
  EditDepartmentDrawer,
} from "components/admin";
import {
  AddBulkUploadDialogSubject,
  AddDesignationDialog,
  AddFeeDialog,
  AddFinanceDialog,
  AddGradeDialog,
  AddSubjectDialog,
  CourseDialog,
  DepartmentDialog,
} from "components/admin/dialog";
import { PrivateLayout } from "layouts";
import { Delete, DesignServices } from "@mui/icons-material";
import dayjs from "dayjs";
import { MoneyFormat, MuiTblOptions, notify } from "utils";
import MaterialTable from "@material-table/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import DesignationType from "types/designation";
import Swal from "sweetalert2";
import SubjectType from "types/subject";

type dataType = {
  data: SubjectType[];
};
const SetSubject = () => {
  const { mutate: designation } = useFetch();
  const { data, isValidating, error, mutate } =
    useSWRFetch<dataType>("subject");
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
            const response = await designation({
              path: `subject/delete/${id}`,
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
    <div className="w-full">
      <PrivateLayout title="Set Subject | Manage">
        <div className="px-4 mt-4">
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between">
            <h2 className="text-theme text-3xl font-bold ">Subjects</h2>
            <div className="flex gap-4">
              <div>
                <AddBulkUploadDialogSubject />
              </div>
              <div className="">
                <AddSubjectDialog feeName="Add" Dmutate={mutate} />
              </div>
            </div>
          </div>
          <MaterialTable
            components={{
              Container: (props) => (
                <Paper {...props} className="!bg-indigo-50" />
              ),
            }}
            title={""}
            isLoading={isValidating}
            data={
              data?.data?.map((item, i) => ({
                ...item,
                slNo: i + 1,
                timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
                isTheory: item?.isTheory,
              })) || []
            }
            options={{ ...MuiTblOptions() }}
            columns={[
              {
                title: "#",
                field: "slNo",
                editable: "never",
                width: "2%",
              },
              // {
              //   export: true,
              //   title: "Product Details",
              //   tooltip: "Product Details",
              //   searchable: true,
              //   field: "productName",
              //   render: ({ productName, productImage }) => (
              //     <>
              //       <ListItem sx={{ paddingLeft: "0px" }}>
              //         <ListItemAvatar>
              //           <Avatar
              //             src={productImage}
              //             alt={"img"}
              //             className="!h-24  !w-20 !rounded-md !mr-4"
              //           />
              //         </ListItemAvatar>
              //         <ListItemText
              //           primary={
              //             <Typography
              //               className="!font-semibold"
              //               component="span"
              //               variant="body2"
              //             >
              //               {productName}
              //             </Typography>
              //           }
              //         ></ListItemText>
              //       </ListItem>
              //     </>
              //   ),
              // },
              // {
              //   title: "Product Image",
              //   field: "productImage",
              //   searchable: true,
              //   export: true,
              //   hidden: true,
              // },

              {
                title: "Subject",
                field: "title",
                searchable: true,
              },
              {
                title: "Subject Code",
                field: "subjectCode",
                searchable: true,
              },
              // {
              //   title: "Theory/Lab",
              //   field: "isTheory",
              //   searchable: true,
              //   render: ({ isTheory }) => (isTheory ? "Theory" : "Lab"),
              // },

              // {
              //   title: "Status",
              //   field: "status",
              //   render: ({ status }: any) => (
              //     <small className="bg-theme text-white px-2 py-1 rounded-md">
              //       {status}
              //     </small>
              //   ),
              // },
              {
                title: "Created At",
                field: "createdAt",
                export: false,
                render: ({ createdAt }: any) =>
                  dayjs(createdAt).format("MMM D, YYYY h:mm A"),
              },
              {
                title: "Created At",
                field: "timestamp",
                export: true,
                hidden: true,
              },
              {
                title: "Action",
                export: false,
                render: (rowData) => (
                  <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
                    <AddSubjectDialog
                      designation={rowData}
                      Dmutate={mutate}
                      feeName="Edit"
                    />

                    <span
                      onClick={() => handleDelete(rowData?._id)}
                      className=" px-3 py-2 bg-transparent hover:bg-red-200/50 transition-all ease-in-out duration-300 cursor-pointer"
                    >
                      <Delete className="text-red-500" />
                    </span>
                  </div>
                ),
              },
            ]}
            actions={[
              {
                icon: "refresh",
                tooltip: "Refresh Data",
                isFreeAction: true,
                onClick() {
                  mutate();
                },
              },
            ]}
          />
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(SetSubject);
