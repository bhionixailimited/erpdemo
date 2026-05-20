import MaterialTable from "@material-table/core";
import { Add, Delete, DesignServices } from "@mui/icons-material";
import dayjs from "dayjs";
import { useFetch, useSWRFetch, withProtectedSuperAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { InstituteType } from "types/institute";
import { MuiTblOptions, notify } from "utils";
import {
  Avatar,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
} from "@mui/material";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { Button } from "components/core";
type DataType = {
  data: InstituteType[];
};
const Institutes = () => {
  const { data, isValidating, mutate } = useSWRFetch<DataType>(`institute`);
  const { mutate: institute } = useFetch();
  const { push } = useRouter();
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
            const response = await institute({
              path: `institute/${id}`,
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
    <PrivateLayout>
      <div className="p-4">
        <div className="mb-4 flex md:flex-row flex-col bg-indigo-50 p-4 rounded-md shadow-md justify-between gap-2">
          <h2 className="text-theme text-2xl md:text-3xl font-bold ">
            All Institutes
          </h2>
          <div>
            <div className="flex gap-2">
              <Button
                startIcon={<Add />}
                onClick={() => push(`/panel/superadmin/institutes/add`)}
              >
                Add New Institute
              </Button>
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
              export: true,
              title: "Institute Details",
              tooltip: "Institute Details",
              searchable: true,
              field: "instituteName",
              render: ({ instituteName, logoUrl, email }) => (
                <>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    <ListItemAvatar>
                      <Avatar
                        src={logoUrl}
                        alt={"img"}
                        className="!h-16  !w-16 !rounded-md !mr-4"
                        sx={{
                          objectFit: "contain",
                        }}
                      >
                        {instituteName?.[0]}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          className="!font-semibold"
                          component="span"
                          variant="body2"
                        >
                          {instituteName}
                        </Typography>
                      }
                      secondary={
                        <Typography
                          className="!font-semibold"
                          component="h6"
                          variant="subtitle2"
                        >
                          {email}
                        </Typography>
                      }
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: "Phone",
              field: "phoneNumber",
              searchable: true,
              emptyValue: "--",
            },
            {
              export: false,
              title: "Admin",
              tooltip: "Admin Details",
              searchable: true,
              field: "productName",
              render: ({ admin }) => (
                <>
                  <ListItem sx={{ paddingLeft: "0px" }}>
                    {admin?._id && (
                      <ListItemAvatar>
                        <Avatar
                          src={admin?.photoUrl}
                          alt={"img"}
                          className="!h-14 !w-14 mr-2"
                          sx={{
                            objectFit: "contain",
                          }}
                        >
                          {admin?.displayName?.[0]}
                        </Avatar>
                      </ListItemAvatar>
                    )}

                    <ListItemText
                      primary={
                        <Typography
                          className="!font-bold"
                          component="h5"
                          variant="body2"
                        >
                          {admin?.displayName}
                        </Typography>
                      }
                      secondary={
                        <>
                          <Typography
                            className="!font-semibold !text-theme"
                            component="h6"
                            variant="subtitle2"
                          >
                            {admin?.email}
                          </Typography>
                          <Typography
                            className="!font-semibold !text-theme !text-xs mt-1"
                            component="h6"
                            variant="subtitle2"
                          >
                            {admin?.phoneNumber}
                          </Typography>
                        </>
                      }
                    ></ListItemText>
                  </ListItem>
                </>
              ),
            },
            {
              title: "Address",
              field: "address",
              searchable: true,
              emptyValue: "--",
            },
            {
              title: "Description",
              field: "description",
              searchable: true,
              emptyValue: "--",
            },

            // {
            //   title: "Price",
            //   field: "price",
            //   searchable: true,
            //   emptyValue: "--",
            //   render: ({ price }) => MoneyFormat(price),
            // },
            // {
            //   title: "Stock",
            //   field: "quantity",
            //   searchable: true,
            //   emptyValue: "--",
            // },
            // {
            //   title: "Stock Used",
            //   field: "stockUsed",
            //   searchable: true,
            //   emptyValue: "--",
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
              render: ({ createdAt }: any) =>
                dayjs(createdAt).format("MMM D, YYYY h:mm A"),
            },
            {
              title: "Action",
              export: false,
              render: (rowData) => (
                <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
                  <span
                    className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
                    onClick={() =>
                      push(
                        `/panel/superadmin/institutes/add?edit=true&editId=${rowData?._id}`
                      )
                    }
                  >
                    <DesignServices className="text-green-500 " />
                  </span>

                  <span
                    className=" px-3 py-2 bg-transparent hover:bg-red-200/50 transition-all ease-in-out duration-300 cursor-pointer"
                    onClick={() => handleDelete(rowData?._id)}
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
  );
};

export default withProtectedSuperAdmin(Institutes);
