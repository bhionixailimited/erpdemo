import { useState } from "react";
import { Paper } from "@mui/material";
import { AddHolidayDialog } from "components/admin/dialog";
import { PrivateLayout } from "layouts";
import { Delete, DesignServices } from "@mui/icons-material";
import dayjs from "dayjs";
import { MuiTblOptions, notify } from "utils";
import MaterialTable from "@material-table/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { GradeType } from "types/grade";
import Swal from "sweetalert2";
import { HolidayType } from "types/holiday";

type dataType = {
  data: HolidayType[];
};
const SetHoliday = () => {
  const { mutate: fee } = useFetch();
  const { data, mutate, isValidating } = useSWRFetch<dataType>("holiday");
  console.log(data);
  const handleDelete = async (rowData: HolidayType) => {
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
              path: `holiday`,
              method: "DELETE",
              body: JSON.stringify({
                startDate: new Date(rowData.startTime).toISOString(),
                endDate: new Date(rowData.endTime).toISOString(),
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
    <div className="w-full">
      <PrivateLayout title="Set Holidays | Manage">
        <div className="px-4 mt-4">
          <p className="text-red-500 mb-4">
            {`* if you have not class you can't see holidays.`}
          </p>
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between">
            <h2 className="text-theme text-3xl font-bold ">Holidays</h2>

            <div className="">
              <AddHolidayDialog feeName="Add" Dmutate={mutate} />
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
                // width: "2%",
              },
              {
                title: "Holidays",
                field: "startTime",
                searchable: true,
                render: ({ startTime }) =>
                  dayjs(startTime).format("dddd, MMMM D, YYYY "),
              },
              // {
              //   title: "End Date",
              //   field: "endTime",
              //   searchable: true,
              //   render: ({ endTime }) => dayjs(endTime).format("MMM D, YYYY"),
              // },
              // {
              //   title: "Created At",
              //   field: "timestamp",
              //   render: ({ createdAt }: any) =>
              //     dayjs(createdAt).format("MMM D, YYYY h:mm A"),
              // },
              {
                title: "Action",
                export: false,
                render: (rowData) => (
                  <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
                    {/* <AddGradeDialog feeName="Edit" /> */}

                    <span
                      onClick={() => handleDelete(rowData)}
                      className=" px-3 py-2 bg-transparent hover:bg-red-200/50 transition-all ease-in-out duration-300 cursor-pointer"
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
    </div>
  );
};

export default withProtectedAdmin(SetHoliday);
