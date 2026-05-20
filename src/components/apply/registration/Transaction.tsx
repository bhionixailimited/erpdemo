import MaterialTable from "@material-table/core";
import PaymentsIcon from "@mui/icons-material/Payments";
import {
  ListItem,
  ListItemText,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import { useFetch } from "hooks";
import { MuiTblOptions } from "utils";
import { Visibility } from "@mui/icons-material";
import { Button } from "components/core";
import dayjs from "dayjs";
import Link from "next/link";
import { useRef, useState } from "react";

const Transaction = () => {
  const { mutate, loading } = useFetch();
  const tableRef = useRef<any>(null);
  const [pageNo, setPageNo] = useState(1);

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
                `registration/admin/transaction?perPage=${
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
                        {row?.user?.studentFirstName}{" "}
                        {row?.user?.studentMiddleName}{" "}
                        {row?.user?.studentLastName}
                      </Typography>
                    }
                    secondaryTypographyProps={{
                      fontWeight: "500",
                    }}
                    secondary={
                      <div>
                        <p>{row?.user?.studentPhoneNumber}</p>
                        <p>{row?.user?.email}</p>
                      </div>
                    }
                    // secondary={row?.email || ""}
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Date",
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
            title: "Price",
            field: "",
            searchable: true,
            render: (amount) => (
              <h3 className="font-medium lowercase first-letter:uppercase">
                {amount?.amount}
              </h3>
            ),
          },

          {
            title: "Invoice",
            field: "gender",
            searchable: true,
            render: ({ gender }) => (
              <div className="flex items-center justify-center">
                <Button className="!bg-blue-500 hover:!ring-blue-500">
                  <Link href={``}>
                    <Tooltip title="Invoice">
                      <div className="flex gap-2">
                        <Visibility className="text-white" />
                        <p>INVOICE</p>
                      </div>
                    </Tooltip>
                  </Link>
                </Button>
              </div>
            ),
          },

          {
            title: "Refund",
            field: "gender",
            searchable: true,
            render: ({ gender }) => (
              <div className="flex items-center justify-center">
                <Button className="!bg-red-500 hover:!ring-red-500">
                  <Tooltip title="Refund">
                    <div className="flex gap-2">
                      <PaymentsIcon className="text-white" />
                      <p>REFUND</p>
                    </div>
                  </Tooltip>
                </Button>
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

export default Transaction;
