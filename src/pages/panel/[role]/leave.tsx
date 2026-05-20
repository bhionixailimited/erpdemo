import MaterialTable from "@material-table/core";
import { Cancel, Delete, Verified } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { EditLeaveManagementDrawer } from "components/admin";
import { AddLeaveDialog, LeaveDetailsDialog } from "components/admin/dialog";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, withProtectedAdmin } from "hooks";
import withTeacherAdminProtected from "hooks/withTeacherAdminProtected";
import { PrivateLayout } from "layouts";
import { useRef } from "react";
import Swal from "sweetalert2";
import { StaffLeaveType } from "types/staffleavetype";
import { MuiTblOptions, notify } from "utils";

type dataType = {
  data: StaffLeaveType[];
};
const LeaveManagement = () => {
  const tableRef = useRef<any>();
  const { mutate: leave } = useFetch();
  const { mutate: fetchData, loading } = useFetch();
  const { user } = useAuth();

  const handleDeleteLeave = (row: any, table: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      })
        .then(async (result) => {
          if (result.isConfirmed)
            new Promise(async (resolve, reject) => {
              const response = await leave({
                path: `staff/leave/delete/${row?._id}`,
                method: "DELETE",
              });

              if (response?.data?.error) {
                notify.error(response?.data?.error);
                reject(response?.data?.error);
              }

              notify.success(response?.data?.message);
              resolve(response?.data?.message);
            });
        })
        .then(() => tableRef.current && tableRef.current.onQueryChange());
    } catch (err) {
      console.log(err);
    }
  };

  let leaveType = {
    SICK_LEAVE: "Medical Leave",
    CASUAL_LEAVE: "Casual Leave",
    OTHER: "Other",
  };

  return (
    <div className="w-full">
      <PrivateLayout title="Staff | Leave">
        <div className="m-auto px-5 py-4">
          <div className="mb-4 flex flex-col md:flex-row gap-2 bg-indigo-50 p-4 rounded-md shadow-md justify-between">
            <h2 className="text-theme text-3xl font-bold ">Leave Details</h2>
            <div>
              <AddLeaveDialog mutate={tableRef} byStaff={true} />
            </div>
          </div>
          <MaterialTable
            components={{
              Container: (props) => (
                <Paper {...props} className="!bg-indigo-50" />
              ),
            }}
            title={""}
            tableRef={tableRef}
            isLoading={loading}
            data={async (query) =>
              new Promise(async (resolve, reject) => {
                const result = fetchData({
                  method: "GET",
                  path: `staff/leave?perPage=${query.pageSize}&pageNo=${
                    query.page + 1
                  }&${query.search ? `searchTitle=${query.search}` : ""}`,
                });
                const data = await result;
                console.log("data:", data);
                resolve({
                  data:
                    data?.data?.data?.data?.map(
                      (item: StaffLeaveType, index: number) => {
                        return {
                          ...query,
                          ...item,
                          sl: index + 1,
                          timestamp: dayjs(item?.createdAt).format(
                            "MMM D, YYYY h:mm A"
                          ),
                          leaveCode: leaveType?.[item?.leaveCode],
                        };
                      }
                    ) || [],
                  page: data?.data?.data?.pageNo
                    ? data?.data?.data?.pageNo - 1
                    : 0,
                  totalCount: data?.data?.data?.totalCount || 0,
                });
              }) || []
            }
            // data={
            //   data?.data?.map((item, i) => ({
            //     ...item,
            //     sl: i + 1,
            //     timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
            //   })) || []
            // }
            options={{ ...MuiTblOptions(), pageSize: 10, exportMenu: [] }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                export: true,
                title: "Employee Profile",
                tooltip: "profile",
                searchable: true,
                field: "staff",
                render: (row: any) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar src={row?.staff?.photoUrl} alt={"img"} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            className="!font-semibold"
                            component="span"
                            variant="body2"
                          >
                            {row?.staff?.displayName || ""}
                          </Typography>
                        }
                        secondaryTypographyProps={{
                          fontWeight: "500",
                        }}
                        secondary={row?.staff?.email || ""}
                        //   secondary={phoneNumber}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Name",
                field: "name",
                searchable: true,
                export: false,
                hidden: true,
              },
              {
                title: "Phone Number",
                field: "phoneNumber",
                searchable: true,
                export: false,
                hidden: true,
              },
              {
                title: "Email",
                field: "email",
                searchable: true,
                hidden: true,
                export: true,
              },
              {
                title: "Leave Code",
                field: "leaveCode",
                searchable: true,
              },
              {
                title: "Leave Type",
                field: "leaveType",
                searchable: true,
              },

              // {
              //   title: "Message",
              //   field: "message",
              //   searchable: true,
              //   render: ({ message }) =>
              //     message?.length > 10 ? message?.slice(0, 7) + "..." : message,
              // },
              {
                title: "From",
                field: "leaveDate",
                emptyValue: "Not Provided",
                render: ({ leaveDate }: any) =>
                  dayjs(new Date(leaveDate)).format("ll"),
              },
              {
                title: "To",
                field: "expectedJoiningDate",
                emptyValue: "Not Provided",
                render: ({ expectedJoiningDate }: any) =>
                  dayjs(new Date(expectedJoiningDate)).format("ll"),
              },
              {
                title: "Timestamp",
                field: "createdAt",
                render: ({ createdAt }: any) =>
                  dayjs(new Date(createdAt)).format("MMM D, YYYY h:mm A"),
              },
              {
                title: "Status",
                field: "status",
                render: (row) => (
                  <div className="flex flex-row gap-3 items-center">
                    <p className="text-center">{row?.status}</p>
                  </div>
                ),
              },

              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                width: "18%",
                // field: "pick",
                render: (row: any) => (
                  <>
                    <div className="flex">
                      {" "}
                      <EditLeaveManagementDrawer open={row} mutate={tableRef} />
                      <LeaveDetailsDialog leaveDetails={row} />
                      {/* <Tooltip title="Delete Leave">
                        <Avatar
                          variant="rounded"
                          onClick={() =>
                            handleDeleteLeave(row as any, tableRef)
                          }
                          className=" !mr-1 !cursor-pointer !bg-red-700 text-white"
                        >
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip> */}
                    </div>
                  </>
                ),
              },
            ]}
            // detailPanel={({ rowData }) => {
            //   return (
            //     <div className="bg-eef5f9 m-auto p-[20px]">
            //       <Card
            //         sx={{
            //           minWidth: 275,
            //           maxWidth: 700,
            //           transition: "0.3s",
            //           margin: "auto",
            //           borderRadius: "10px",
            //           fontWeight: "bolder",
            //           wordWrap: "break-word",
            //           padding: "20px",
            //           boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
            //           "&:hover": {
            //             boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
            //           },
            //         }}
            //       >
            //         <CardContent>
            //           <h1 className="mb-[5px] text-lg text-indigo-900">
            //             Message
            //           </h1>
            //           <p className="break-words text-base font-bold">
            //             {rowData?.message}
            //           </p>
            //         </CardContent>
            //       </Card>
            //     </div>
            //   );
            // }}
            // actions={[
            //   {
            //     icon: 'delete',
            //     tooltip: 'Delete',
            //     onClick: (event, rowData) => {
            //       console.log(rowData)
            //     },
            //   },

            // ]}
            actions={[
              {
                icon: "refresh",
                tooltip: "Refresh Data",
                isFreeAction: true,
                onClick: () =>
                  tableRef.current && tableRef.current.onQueryChange(),
              },
            ]}
          />
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withTeacherAdminProtected(LeaveManagement);
