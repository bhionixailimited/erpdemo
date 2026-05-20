import { Paper, Tooltip } from "@mui/material";
import { AddFeeDialog } from "components/admin/dialog";
import { PrivateLayout } from "layouts";
import { Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import { MoneyFormat, MuiTblOptions, notify } from "utils";
import MaterialTable from "@material-table/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import FeeType from "types/fee";
import Swal from "sweetalert2";

type dataType = {
  data: FeeType[];
};
const SetFeeName = () => {
  const { mutate: fee } = useFetch();
  const { data, mutate, isValidating } = useSWRFetch<dataType>("fees");

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
              path: `fee/delete/${id}`,
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
      <PrivateLayout title="Set Fee | Manage">
        <div className="px-4 mt-4">
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between">
            <h2 className="text-theme text-3xl font-bold ">All Fees</h2>

            <div className="">
              <AddFeeDialog feeName="Add" Dmutate={mutate} />
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
            options={{ ...MuiTblOptions() }}
            columns={[
              {
                title: "#",
                field: "slNo",
                editable: "never",
                width: "2%",
              },
              {
                title: "Fee Name",
                field: "title",
                searchable: true,
              },
              {
                title: "Amount",
                field: "amount",
                searchable: true,
                render: ({ amount }) => MoneyFormat(amount),
              },
              {
                title: "Created At",
                field: "timestamp",
                export: true,
                hidden: true,
              },
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
                    <AddFeeDialog
                      feeName="Edit"
                      Dmutate={mutate}
                      fee={rowData}
                    />

                    <span
                      onClick={() => handleDelete(rowData?._id)}
                      className=" px-3 py-2 bg-transparent hover:bg-red-200/50 transition-all ease-in-out duration-300 cursor-pointer"
                    >
                      <Tooltip title="Delete Fee">
                        <Delete className="text-red-500" />
                      </Tooltip>
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

export default withProtectedAdmin(SetFeeName);
