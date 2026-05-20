import MaterialTable from "@material-table/core";
import {
  Paper,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Toolbar,
} from "@mui/material";
import { useFetch } from "hooks";
import { MuiTblOptions, notify } from "utils";
import dayjs from "dayjs";
import { IOSSwitch } from "components/core";
import AssignInstituteToUser from "./AssignInstituteToUser";
import { useRef } from "react";

const ViewAllStaff = () => {
  const { mutate, loading } = useFetch();

  const tableRef = useRef<any>(null);

  const handleBlockUser = async (id: string, status: string) => {
    try {
      const response = await mutate({
        path: `user/block/${id}`,
        method: "PUT",
        body: JSON.stringify({
          blockStatus: status,
        }),
        isFormData: false,
      });

      if (response?.status !== 200) throw new Error(response?.data?.error);

      notify.success(`User ${status?.toLowerCase()}  successfully.`);

      tableRef?.current?.onQueryChange();
    } catch (error) {
      notify.success(
        error instanceof Error ? error?.message : "Something went wrong!"
      );
    }
  };

  return (
    <div className="w-full">
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
                `user?role=TEACHER&role=ADMIN&role=STAFF&perPage=${
                  query.pageSize
                }&pageNo=${query?.page + 1}` +
                (query?.search?.length ? `&searchTitle=${query?.search}` : ""),
              method: "GET",
              isFormData: false,
            }).then((result) => {
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
            title: "User",
            tooltip: "profile",
            searchable: true,
            field: "staff",
            render: (row) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar src={row?.photoUrl} alt={row?.displayName[0]}>
                      {row?.displayName[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        className="!font-semibold"
                        component="span"
                        variant="body2"
                      >
                        {row?.displayName || ""}
                      </Typography>
                    }
                    secondaryTypographyProps={{
                      fontWeight: "500",
                    }}
                    secondary={row?.email || ""}
                    //   secondary={phoneNumber}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Name",
            field: "displayName",
            searchable: true,
            export: false,
            hidden: true,
          },
          {
            title: "Phone Number",
            field: "phoneNumber",
            searchable: true,
            export: false,
          },
          {
            title: "Email",
            field: "email",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Role",
            field: "role",
            searchable: true,
            render: ({ role }) => (
              <h3 className="font-medium lowercase first-letter:uppercase">
                {role}
              </h3>
            ),
          },
          {
            title: "Gender",
            field: "gender",
            searchable: true,
            render: ({ gender }) => (
              <h3 className="font-medium lowercase first-letter:uppercase">
                {gender}
              </h3>
            ),
          },
          {
            title: "Joined Date",
            field: "createdAt",
            render: ({ createdAt }) =>
              dayjs(new Date(createdAt)).format("MMM D, YYYY h:mm A"),
          },
          {
            title: "Action",
            export: false,
            render: (rowData) => (
              <div className="flex items-center rounded-full shadow-lg bg-white w-fit overflow-hidden    ">
                <AssignInstituteToUser
                  instituteAssigned={rowData?.assignInstitutes}
                  userId={rowData?.id}
                  reValidate={tableRef?.current?.onQueryChange}
                />
                <span
                  className=" w-full bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 cursor-pointer"
                  onClick={() =>
                    handleBlockUser(
                      rowData?._id,
                      rowData?.blockStatus === "BLOCKED"
                        ? "UNBLOCKED"
                        : "BLOCKED"
                    )
                  }
                >
                  <Toolbar title="Block Status">
                    <IOSSwitch checked={rowData?.blockStatus !== "BLOCKED"} />
                  </Toolbar>
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
            onClick: () => tableRef?.current?.onQueryChange(),
          },
        ]}
      />
    </div>
  );
};

export default ViewAllStaff;
