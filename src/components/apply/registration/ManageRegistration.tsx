import MaterialTable from "@material-table/core";
import PaymentsIcon from "@mui/icons-material/Payments";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFetch } from "hooks";
import { MuiTblOptions, notify } from "utils";
// import AssignInstituteToUser from "./AssignInstituteToUser";
import { Delete, Paid, Visibility } from "@mui/icons-material";
import Link from "next/link";
import { useRef, useState } from "react";
import { Button, IOSSwitch } from "components/core";
import PaymentForm from "./PaymentForm";
// import AcceptForm from "./AcceptForm";
import Swal from "sweetalert2";
import AcceptForm from "./AcceptForm";

const ManageRegistration = () => {
  const { mutate, loading } = useFetch();
  const [singleStudentData, setSingleStudentData] = useState(null);
  const [singleStudentDetailData, setSingleStudentDetailData] = useState(null);
  const [AcceptData, setAcceptData] = useState<string | null>(null);
  const tableRef = useRef<any>(null);
  const handleBlock = async (e: any, rowData: any) => {
    Swal.fire({
      title: "Are You Sure?",
      text: `${
        rowData?.isBlocked === true ? "Unblock" : "Block"
      } ${"This Student"}`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: `${rowData?.isBlocked === true ? "Unblock" : "Block"}`,
      cancelButtonText: "No",
      reverseButtons: true,
    }).then(async (result) => {
      if (result.isConfirmed) {
        // setLoading(true);
        try {
          const response = await mutate({
            path: `registration/admin/${rowData?._id}`,
            method: "PUT",
            body: JSON.stringify({
              isBlocked: !e.target?.checked,
            }),
            isFormData: false,
          });

          tableRef.current?.onQueryChange();
        } catch (error) {
        } finally {
        }
      }
    });
  };

  return (
    <div className="w-full">
      <div></div>
      <MaterialTable
        tableRef={tableRef}
        components={{
          Container: (props) => <Paper {...props} className="!bg-indigo-50" />,
        }}
        title={""}
        isLoading={loading}
        data={async (query) =>
          new Promise((resolve, reject) => {
            mutate({
              path:
                `registration/admin?perPage=${query.pageSize}&pageNo=${
                  query.page + 1
                }` +
                (query?.search?.length ? `&searchTitle=${query?.search}` : ""),
              method: "GET",
              isFormData: false,
            }).then((result) => {
              console.log(result);
              resolve({
                data:
                  result?.data?.data?.data?.map(
                    (item: { _id: string }, index: number) => {
                      return {
                        ...item,
                        slNo: index + 1 + query?.page * query.pageSize,
                        id: item?._id,
                      };
                    }
                  ) || [],
                page: result?.data?.data?.pageNo
                  ? result?.data?.data?.pageNo - 1
                  : 0,
                totalCount: result?.data?.data?.totalCount || 0,
              });
            });
          })
        }
        options={{ ...MuiTblOptions(), debounceInterval: 500 }}
        columns={[
          {
            title: "#",
            field: "slNo",
            editable: "never",
            width: "2%",
          },
          {
            export: false,
            title: "Student Profile",
            tooltip: "profile",
            searchable: true,
            field: "",
            render: (row) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemText
                    primary={
                      <Typography
                        className="!font-semibold"
                        component="span"
                        variant="body2"
                      >
                        {row?.studentFirstName} {row?.studentMiddleName}{" "}
                        {row?.studentLastName}
                      </Typography>
                    }
                    secondaryTypographyProps={{
                      fontWeight: "500",
                    }}
                    secondary={
                      <div>
                        <p>{row?.studentPhoneNumber}</p>
                        <p>{row?.email}</p>
                      </div>
                    }
                    // secondary={row?.email || ""}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Programme",
            field: "",
            searchable: true,
            render: ({ programme }) => (
              <h3 className="font-medium lowercase first-letter:uppercase">
                {programme?.title}
              </h3>
            ),
          },
          {
            title: "Payment Status",
            field: "",
            searchable: true,
            render: ({ isPaymentDone }) => (
              <h3 className="font-medium lowercase first-letter:uppercase">
                {isPaymentDone ? "Paid" : "Not Paid"}
              </h3>
            ),
          },
          {
            title: "Application Status",
            field: "",
            searchable: true,
            render: ({ isApplicationSubmitted }) => (
              <h3 className="font-medium lowercase first-letter:uppercase">
                {isApplicationSubmitted ? "Submitted" : "Not Submitted"}
              </h3>
            ),
          },
          {
            title: "Block/UnBlock",
            field: "",
            searchable: true,
            render: (row) => (
              <div className="flex items-center justify-center">
                <IOSSwitch
                  checked={row?.isBlocked === true}
                  onChange={(e) => {
                    handleBlock(e, row);
                  }}
                />
              </div>
            ),
          },
          {
            title: "View Details",
            field: "",
            searchable: true,
            render: (row) => (
              <div className="flex items-center justify-center">
                <Button>
                  <Link
                    href={`/panel/superadmin/registations/details/${row?._id}`}
                  >
                    <Tooltip title="View Details">
                      <div className="flex gap-2">
                        <Visibility className="text-white" />
                        <p>DETAILS</p>
                      </div>
                    </Tooltip>
                  </Link>
                </Button>
              </div>
            ),
          },
          {
            title: "Accept / Reject",
            field: "",
            searchable: true,
            render: (row) => (
              <div className="flex gap-2 items-center justify-center">
                {row?.isMovedToStudent ? (
                  <Button
                    className="!bg-green-500 hover:!ring-green-500"
                    disabled
                  >
                    <Tooltip title="Already accepted">
                      <div className="flex gap-2">
                        <ThumbUpAltIcon className="text-white" />
                        <p>ACCEPTED</p>
                      </div>
                    </Tooltip>
                  </Button>
                ) : row?.isRejected ? (
                  <Button className="!bg-red-500 hover:!ring-red-500" disabled>
                    <Tooltip title="Already rejected">
                      <div className="flex gap-2">
                        <ThumbDownAltIcon className="text-white" />
                        <p>REJECTED</p>
                      </div>
                    </Tooltip>
                  </Button>
                ) : (
                  <>
                    <AcceptRejectButton data={row} />
                  </>
                )}
              </div>
            ),
          },

          {
            title: "Change Payment Status",
            field: "",
            searchable: true,
            render: (row) => (
              <div className="flex items-center justify-center">
                {row?.isPaymentDone ? (
                  <Button
                    className="!bg-green-500 hover:!ring-green-500"
                    disabled
                  >
                    <Tooltip title="Already paid">
                      <div className="flex gap-2">
                        <Paid className="text-white" />
                        <p>PAID</p>
                      </div>
                    </Tooltip>
                  </Button>
                ) : row?.isRejected ? (
                  <Button className="!bg-red-300 hover:!ring-red-300" disabled>
                    <Tooltip title="Not paid">
                      <div className="flex gap-2">
                        <Paid className="text-white" />
                        <p>NOT PAID</p>
                      </div>
                    </Tooltip>
                  </Button>
                ) : row?.isMovedStudent ? (
                  <Button className="!bg-red-300 hover:!ring-red-300" disabled>
                    <Tooltip title="Not paid">
                      <div className="flex gap-2">
                        <Paid className="text-white" />
                        <p>NOT PAID</p>
                      </div>
                    </Tooltip>
                  </Button>
                ) : (
                  <ChangeStatusBtn data={row} />
                )}
              </div>
            ),
          },
          // {
          //   title: "Delete",
          //   field: "",
          //   searchable: true,
          //   render: ({ deleteStudent }) => (
          //     <div className="flex items-center justify-center">
          //       <Button className="!bg-red-500 hover:!ring-red-500">
          //         <Tooltip title="Delete Student">
          //           <div className="flex gap-2">
          //             <Delete className="text-white" />
          //             <p>DELETE</p>
          //           </div>
          //         </Tooltip>
          //       </Button>
          //     </div>
          //   ),
          // },
        ]}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => tableRef?.current?.onQueryChange(),
          },
        ]}
      />
    </div>
  );
};

export default ManageRegistration;
export const ChangeStatusBtn = ({ data }: any) => {
  // console.log("payment:-->", data);
  const [openMethodDrawer, setOpenMethodDrawer] = useState(false);
  return (
    <>
      <PaymentForm
        data={data}
        open={openMethodDrawer}
        onClose={() => {
          setOpenMethodDrawer(false);
        }}
      />
      <Button
        onClick={() => setOpenMethodDrawer(true)}
        className="!bg-blue-500 hover:!ring-blue-500"
      >
        <Tooltip title="Change Payment Status">
          <div className="flex gap-2">
            <p>CHANGE</p>
            <PaymentsIcon className="text-white" />
            <p>STATUS</p>
          </div>
        </Tooltip>
      </Button>
    </>
  );
};
export const AcceptRejectButton = (data: any) => {
  const [openDetailDrawer, setOpenDetailDrawer] = useState<boolean>(false);
  // console.log("data reject-->", data);
  const { mutate } = useFetch();
  const handleReject = () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        // text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, reject it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await mutate({
              path: `/registration/admin/${data?.data?._id}`,
              method: "PUT",
              body: JSON.stringify({
                isRejected: true,
              }),
              isFormData: false,
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            // mutate && mutate();
            notify.success("Rejected successfully");
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
    // notify.success("Rejected successfully");
  };
  return (
    <>
      <AcceptForm
        data={data}
        open={openDetailDrawer}
        onClose={() => {
          setOpenDetailDrawer(false);
        }}
      />
      <Button
        className="!bg-green-500 hover:!ring-green-500"
        onClick={() => setOpenDetailDrawer(true)}
      >
        <Tooltip title="Accept Student">
          <div className="flex gap-2">
            <ThumbUpAltIcon className="text-white" />
            <p>ACCEPT</p>
          </div>
        </Tooltip>
      </Button>

      <Button
        className="!bg-red-500 hover:!ring-red-500"
        // onClick={() => setAcceptData("Rejected")}
        onClick={() => handleReject()}
      >
        <Tooltip title="Reject Student">
          <div className="flex gap-2">
            <ThumbDownAltIcon className="text-white" />
            <p>REJECT</p>
          </div>
        </Tooltip>
      </Button>
    </>
  );
};
