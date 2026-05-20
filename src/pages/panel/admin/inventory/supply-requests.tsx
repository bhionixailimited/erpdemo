import { useFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import MaterialTable from "@material-table/core";
import { Cancel } from "@mui/icons-material";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";

import { InventorySupplyType } from "types/inventorysupply";
import { MoneyFormat, MuiTblOptions, notify } from "utils";
import Swal from "sweetalert2";
import { IssuedQuantityDialog } from "components/admin/dialog";

type dataType = {
  data: InventorySupplyType[];
};
const SupplyRequests = () => {
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    "inventory/supply?orderStatus=ORDER_REQUEST"
  );

  const { mutate: department } = useFetch();

  const handleCancel = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Cancel!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await department({
              path: `inventory/supply/${id}`,
              method: "PUT",
              body: JSON.stringify({
                orderStatus: "CANCELLED",
                quantity: 0,
              }),
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
    <PrivateLayout title="Inventory | Supply">
      <section className="w-full p-4">
        <div className="w-full">
          <div className="mb-4 flex flex-col md:flex-row bg-indigo-50 p-4 rounded-md shadow-md gap-2 justify-between">
            <h2 className="text-theme text-xl md:text-3xl font-bold ">
              All Supply Requests
            </h2>
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
                category: item?.product?.category?.title,
                timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
                productName: item?.product?.title,
                productPrice: item?.product?.price,
                department: item?.department?.title,
              })) || []
            }
            options={{ ...MuiTblOptions(), exportMenu: [] }}
            columns={[
              {
                title: "#",
                field: "slNo",
                editable: "never",
                width: "2%",
              },
              {
                export: false,
                title: "Product Details",
                tooltip: "Product Details",
                searchable: true,
                field: "productName",
                render: ({ product }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar
                          src={product?.imageUrl}
                          alt={"img"}
                          className="!h-24  !w-20 !rounded-md !mr-4"
                        >
                          {product?.title?.[0]}
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            className="!font-semibold"
                            component="span"
                            variant="body2"
                          >
                            {product?.title}
                          </Typography>
                        }
                        secondary={
                          <Typography
                            className="!font-semibold"
                            variant="body2"
                          >
                            {MoneyFormat(product?.price ? product?.price : 0)}
                          </Typography>
                        }
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                title: "Product Image",
                field: "productImage",
                searchable: true,
                export: false,
                hidden: true,
              },
              {
                title: "Product Name",
                field: "productName",
                searchable: true,
                export: true,
                hidden: true,
              },
              {
                title: "Price",
                field: "productPrice",
                searchable: true,
                export: true,
                hidden: true,
              },
              {
                title: "Category",
                field: "category",
                searchable: true,
                emptyValue: "--",
              },
              {
                title: "Staff",
                field: "consumer",
                searchable: true,
                emptyValue: "--",
                render: ({ consumer }: any) => consumer?.displayName,
              },
              // {
              //   title: "Consumer role",
              //   field: "consumerRole",
              //   searchable: true,
              //   emptyValue: "--",
              // },
              {
                title: "Request Quantity ",
                field: "requestQuantity",
                searchable: true,
                emptyValue: "--",
              },
              // {
              //   title: "Amount",
              //   field: "amount",
              //   searchable: true,
              //   emptyValue: "--",
              // },
              {
                title: "Institute Name",
                field: "department",
                searchable: true,
                emptyValue: "--",
                render: ({ college }: any) => college?.instituteName,
              },
              {
                title: "Purchased Department",
                field: "department",
                searchable: true,
                emptyValue: "--",
                render: ({ department }) => department,
              },
              {
                title: "Status",
                field: "orderStatus",
                searchable: true,
                emptyValue: "--",
                lookup: {
                  ORDER_REQUEST: "PENDING",
                  INITIATED: "INITIATED",
                  PROCESSING: "PROCESSING",
                  DELIVERED: "DELIVERED",
                  CANCELLED: "CANCELLED",
                },
              },
              {
                title: "Created At",
                field: "timestamp",
                emptyValue: "--",
                // render: ({ suppliedDate }: any) =>
                //   dayjs(suppliedDate).format("MMM D, YYYY h:mm A"),
              },
              {
                title: "",
                field: "",
                render: ({ orderStatus, _id, quantity }: any) => (
                  <IssuedQuantityDialog
                    orderStatus={orderStatus}
                    mutate={mutate}
                    _id={_id}
                    quantity={quantity}
                  />
                ),
              },
              {
                title: "",
                field: "",
                render: ({ orderStatus, _id, quantity }) => (
                  <Button
                    className="!bg-red-500"
                    onClick={() => handleCancel(_id)}
                    disabled={orderStatus === "DELIVERED"}
                    startIcon={<Cancel />}
                  >
                    Cancel
                  </Button>
                ),
              },
              // {
              //   title: "Action",
              //   export: false,
              //   render: (rowData) => (
              //     <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
              //       <DownloadReportDialog data={rowData} />
              //     </div>
              //   ),
              // },
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
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(SupplyRequests);
