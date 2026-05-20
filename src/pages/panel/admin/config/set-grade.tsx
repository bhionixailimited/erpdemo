import { useState } from "react";
import { Avatar, Paper } from "@mui/material";
import {
  AllCourseCard,
  AllDepartmentCard,
  EditCourseDrawer,
  EditDepartmentDrawer,
} from "components/admin";
import {
  AddFeeDialog,
  AddFinanceDialog,
  AddGradeDialog,
  CourseDialog,
  DepartmentDialog,
} from "components/admin/dialog";
import { PrivateLayout } from "layouts";
import { Delete, DesignServices } from "@mui/icons-material";
import dayjs from "dayjs";
import { MoneyFormat, MuiTblOptions, notify } from "utils";
import MaterialTable from "@material-table/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { GradeType } from "types/grade";
import Swal from "sweetalert2";
const stockData = [
  {
    _id: "1",
    slNo: "1",
    from: 0,
    to: 30,
    productImage:
      "https://www.pixelwibes.com/template/ebazar/html/dist/assets/images/product/product-1.jpg",
    category: "Admission Fee",
    stock: 150000,
    status: "Available",
    used: 455,
    grade: "E",
    createdAt: new Date(),
  },
  {
    _id: "2",
    slNo: "2",
    productName: "Tuition Fee",
    productImage:
      "https://www.pixelwibes.com/template/ebazar/html/dist/assets/images/product/product-2.jpg",
    category: "Clock",
    stock: 55000,
    status: "Available",
    used: 5,
    createdAt: new Date(),
    grade: "D",
    from: 0,
    to: 30,
  },
  {
    _id: "3",
    slNo: "3",
    productName: "Registration Fee",
    productImage:
      "https://www.pixelwibes.com/template/ebazar/html/dist/assets/images/product/product-5.jpg",
    category: "Bags",
    stock: 20000,
    status: "Available",
    used: 1455,
    grade: "C",
    from: 30,
    to: 50,
  },
  {
    _id: "4",
    slNo: "4",
    productName: "Grade Card",
    productImage:
      "https://www.pixelwibes.com/template/ebazar/html/dist/assets/images/product/product-5.jpg",
    category: "Bags",
    stock: 20000,
    status: "Available",
    used: 1455,
    grade: "B",
    from: 50,
    to: 60,
  },
  {
    _id: "5",
    slNo: "5",
    productName: "Institution Security Fee",
    productImage:
      "https://www.pixelwibes.com/template/ebazar/html/dist/assets/images/product/product-5.jpg",
    category: "Bags",
    stock: 20000,
    status: "Available",
    used: 1455,
    grade: "A",
    from: 60,
    to: 90,
  },
];
type dataType = {
  data: GradeType[];
};
const SetGrade = () => {
  const { mutate: fee } = useFetch();
  const { data, mutate, isValidating } = useSWRFetch<dataType>("grade");

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
            const response = await fee({
              path: `grade/delete/${id}`,
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
      <PrivateLayout title="Set Grade | Manage">
        <div className="px-4 mt-4">
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between">
            <h2 className="text-theme text-3xl font-bold ">Grades</h2>

            <div className="">
              <AddGradeDialog feeName="Add" Dmutate={mutate} />
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
                percent: `${item?.lowPercent}% - ${item?.highPercent}%`,
                timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
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
                title: "Marks(%)",
                field: "percent",
                searchable: true,
                render: ({ lowPercent, highPercent }) =>
                  `${lowPercent}% - ${highPercent}%`,
              },
              {
                title: "Grade",
                field: "grade",
                searchable: true,
              },
              // {
              //   title: "Stock Used",
              //   field: "used",
              //   searchable: true,
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
                field: "timestamp",
                render: ({ createdAt }: any) =>
                  dayjs(createdAt).format("MMM D, YYYY h:mm A"),
              },
              {
                title: "Action",
                export: false,
                render: (rowData) => (
                  <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
                    {/* <AddGradeDialog feeName="Edit" /> */}

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
                onClick: () => mutate(),
              },
            ]}
          />
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(SetGrade);
