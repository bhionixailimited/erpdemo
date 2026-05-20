import MaterialTable from "@material-table/core";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import { useRef } from "react";
import UserType from "types/user";
import { MuiTblOptions } from "utils";
import PayFeeDrawer from "./PayFeeDrawer";

const ViewAllStudent = () => {
  const { mutate, loading } = useFetch();

  // const tableRef = useRef<any>(null);
  const {
    data,
    isValidating,
    error,
    mutate: feeMutate,
  } = useSWRFetch<any>("student?isAlumni=false");
  return (
    <div className="w-full">
      <MaterialTable
        // tableRef={tableRef}
        components={{
          Container: (props) => <Paper {...props} className="!bg-indigo-50" />,
        }}
        title={""}
        isLoading={isValidating}
        data={
          data?.data?.map((item: UserType, i: number) => ({
            ...item,
            slNo: i + 1,
            timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
            id: item?._id,
            batchData: item?.batch?.course?.title,
          })) || []
        }
        // data={async (query) =>
        //   new Promise((resolve, reject) => {
        //     mutate({
        //       path:
        //         `student?isAlumni=false&perPage=${query.pageSize}&pageNo=${
        //           query?.page + 1
        //         }` +
        //         (query?.search?.length ? `&searchTitle=${query?.search}` : ""),
        //       method: "GET",
        //       isFormData: false,
        //     }).then((result) => {
        //       resolve({
        //         data:
        //           result?.data?.data?.data?.map(
        //             (item: UserType, index: number) => {
        //               return {
        //                 ...item,
        //                 slNo: index + 1 + query?.page * query.pageSize,
        //                 id: item?._id,
        //               };
        //             }
        //           ) || [],
        //         page: result?.data?.data?.pageNo
        //           ? result?.data?.data?.pageNo - 1
        //           : 0,
        //         totalCount: result?.data?.data?.totalCount || 0,
        //       });
        //     });
        //   })
        // }
        options={{ ...MuiTblOptions(), pageSize: 20 }}
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
            export: true,
            hidden: true,
          },
          {
            title: "Phone Number",
            field: "phoneNumber",
            searchable: true,
            export: true,
          },
          {
            title: "Email",
            field: "email",
            searchable: true,
            hidden: true,
            export: true,
          },
          {
            title: "Batch",
            field: "batchData",
            searchable: true,
            render: ({ batch }) => (
              <h3 className="font-medium uppercase">
                {batch?.course?.title || "----"}{" "}
                {batch?.branch?.title || "----  "}
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
            title: "Created At",
            field: "timestamp",
            render: ({ createdAt }) =>
              dayjs(new Date(createdAt)).format("MMM D, YYYY h:mm A"),
          },

          {
            title: "Action",
            export: false,
            render: (rowData) => (
              <div className="flex items-center rounded-full shadow-lg bg-white w-fit overflow-hidden    ">
                <PayFeeDrawer studentId={rowData?._id} />
              </div>
            ),
          },
        ]}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => feeMutate(),
          },
        ]}
      />
    </div>
  );
};

export default ViewAllStudent;
