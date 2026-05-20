import MaterialTable from "@material-table/core";
import PaymentsIcon from "@mui/icons-material/Payments";
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
import { MuiTblOptions } from "utils";
import { Payments, Visibility } from "@mui/icons-material";
import { Button } from "components/core";
import Link from "next/link";
import { useRef } from "react";
import dayjs from "dayjs";

const MyPayments = () => {
  const { mutate, loading } = useFetch();
  const tableRef = useRef<any>(null);

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
                `registration/self/transaction?perPage=${
                  query.pageSize
                }&pageNo=${query.page + 1}` +
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
            title: "Application Details",
            tooltip: "Application Details",
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
                        {row?.programme?.title}
                      </Typography>
                    }
                    secondaryTypographyProps={{
                      fontWeight: "500",
                    }}
                    secondary={
                      <div>
                        <p>
                          {"Programme Fee: "}
                          <span className="font-semibold">
                            {row?.programme?.programmeFee}
                          </span>
                        </p>
                      </div>
                    }
                    // secondary={row?.email || ""}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Transaction ID",
            field: "_id",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },
          {
            title: "Transaction Amount",
            field: "amount",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },
          {
            title: "Transaction Date",
            field: "",
            searchable: true,
            render: (date) => (
              <span className="font-semibold">
                {date?.createdAt
                  ? dayjs(date?.createdAt).format(" ddd, MMM D, YYYY")
                  : "Not Given"}
              </span>
            ),
          },
          {
            title: "Transaction Status",
            field: "paymentStatus",
            searchable: true,
            // render: ({ gender }) => (
            //   <h3 className="font-medium lowercase first-letter:uppercase">
            //     {gender}
            //   </h3>
            // ),
          },

          //   {
          //     title: "Action",
          //     field: "gender",
          //     searchable: true,
          //     render: ({ gender }) => (
          //       <div className="flex items-center justify-center">
          //         {false ? (
          //           <Button className="!bg-green-500 hover:!ring-green-500">
          //             <Link href={``}>
          //               <div className="flex gap-2">
          //                 <Payments className="text-white" />
          //                 <p>Pay</p>
          //               </div>
          //             </Link>
          //           </Button>
          //         ) : (
          //           <Button>
          //             <Link href={``}>
          //               <div className="flex gap-2">
          //                 <Visibility className="text-white" />
          //                 <p>View Application</p>
          //               </div>
          //             </Link>
          //           </Button>
          //         )}
          //       </div>
          //     ),
          //   },
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

export default MyPayments;
