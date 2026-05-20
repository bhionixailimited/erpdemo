import MaterialTable from "@material-table/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import {
  EmployeeFilterDrawer,
  PaymentDrawer,
  PaymentHistoryDrawer,
  Title,
} from "components/admin";
import dayjs from "dayjs";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import React, { useState } from "react";
import UserType from "types/user";
import { MuiTblOptions } from "utils";
type dataType = {
  data: UserType[];
};
const StaffPayment = () => {
  const tableRef = React.createRef<any>();
  const {
    data: Employee,
    isValidating,
    mutate,
  } = useSWRFetch<dataType>("user?role=TEACHER&role=STAFF");

  const [openDrawer, setOpenDrawer] = useState(false);
  const { mutate: fetchData } = useFetch();
  return (
    <div className="w-full">
      <PrivateLayout title="Staff | Payment">
        <div className="m-auto px-5 py-4">
          <EmployeeFilterDrawer
            open={openDrawer}
            onClose={() => setOpenDrawer(false)}
          />
          <MaterialTable
            components={{
              Container: (props) => (
                <Paper {...props} className="!bg-indigo-50" />
              ),
            }}
            tableRef={tableRef}
            title={<Title name="Manage Staff Payments" />}
            isLoading={isValidating}
            data={async (query) =>
              new Promise(async (resolve, reject) => {
                const result = fetchData({
                  method: "GET",
                  path: `user?role=TEACHER&role=STAFF&perPage=${
                    query.pageSize
                  }&pageNo=${query.page + 1}&${
                    query.search ? `searchTitle=${query.search}` : ""
                  }`,
                });
                const data = await result;

                resolve({
                  data:
                    data?.data?.data?.data?.map((item: any, index: number) => {
                      return {
                        ...query,
                        ...item,
                        sl: index + 1,
                        empId: item?.employmentDetails?.employmentCode as any,
                        timestamp: dayjs(item?.createdAt).format(
                          "MMM D, YYYY h:mm A"
                        ),
                        position: item?.employmentDetails?.designation?.title,
                        name: item?.displayName,
                        email: item?.email,
                      };
                    }) || [],
                  page: data?.data?.data?.pageNo
                    ? data?.data?.data?.pageNo - 1
                    : 0,
                  totalCount: data?.data?.data?.totalCount || 0,
                });
              }) || []
            }
            options={{
              ...MuiTblOptions(),
              exportMenu: [],
              search: true,
              pageSize: 10,
              debounceInterval: 500,
            }}
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
                field: "name",
                render: ({ displayName, email, photoUrl }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar src={photoUrl} alt={"img"} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            className="!font-semibold"
                            component="span"
                            variant="body2"
                          >
                            {displayName}
                          </Typography>
                        }
                        secondaryTypographyProps={{
                          fontWeight: "500",
                        }}
                        secondary={email}
                        //   secondary={phoneNumber}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Email",
                field: "email",
                searchable: true,
                hidden: true,
              },
              {
                title: "Phone",
                field: "phoneNumber",
                searchable: true,
                render: ({ countryCode, phoneNumber }) =>
                  `+${countryCode ? countryCode : ""}${phoneNumber}`,
              },
              {
                title: "Emp Id",
                field: "empId",
                searchable: true,
                emptyValue: "--",
                render: ({ employmentDetails }: any) =>
                  employmentDetails?.employmentCode === "null"
                    ? "--"
                    : employmentDetails?.employmentCode,
              },
              {
                title: "Type",
                field: "role",
                searchable: true,
              },
              {
                title: "Designation",
                field: "position",
                searchable: true,
                emptyValue: "--",
              },
              // {
              //   title: "Status",
              //   field: "status",
              //   searchable: true,
              //   render: ({ status }) =>
              //     status === "Paid" ? (
              //       <Chip
              //         className="!bg-green-500 !text-white"
              //         label={status}
              //       />
              //     ) : (
              //       <Chip className="!bg-red-500 !text-white" label={status} />
              //     ),
              // },
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
              // {
              //   title: "Leave Code",
              //   field: "leaveCode",
              //   searchable: true,
              // },
              // {
              //   title: "Leave Type",
              //   field: "leaveType",
              //   searchable: true,
              // },

              // {
              //   title: "Message",
              //   field: "message",
              //   searchable: true,
              //   render: ({ message }) =>
              //     message?.length > 10 ? message?.slice(0, 7) + "..." : message,
              // },
              // {
              //   title: "From",
              //   field: "timestamp",
              //   render: ({ createdAt }: any) => dayjs(new Date()).format("ll"),
              // },
              // {
              //   title: "To",
              //   field: "timestamp",
              //   render: ({ createdAt }: any) => dayjs(new Date()).format("ll"),
              // },
              {
                title: "Timestamp",
                field: "timestamp",
                render: ({ createdAt }: any) =>
                  dayjs(new Date(createdAt)).format("MMM D, YYYY h:mm A"),
              },

              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,

                // field: "pick",
                render: (row: any) => (
                  <>
                    <div className="flex">
                      {" "}
                      {/* <Tooltip title="Edit Transport Details">
                        <EditTransportDrawer />
                      </Tooltip>
                      <Tooltip title="View More Info">
                        <DriverDetailsDialog />
                      </Tooltip> */}
                      <PaymentDrawer _id={row?._id} mutate={mutate} />
                      <PaymentHistoryDrawer user={row} />
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
              // {
              //   icon: "filter_alt",
              //   tooltip: "Refresh Data",
              //   isFreeAction: true,
              //   onClick: () => setOpenDrawer(true),
              // },
            ]}
          />
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(StaffPayment);
