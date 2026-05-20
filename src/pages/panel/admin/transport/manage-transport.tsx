import MaterialTable from "@material-table/core";
import { Add, AddBox, Delete, Download, UploadFile } from "@mui/icons-material";
import {
  AddTransportDialog,
  DriverDetailsDialog,
  LeaveDetailsDialog,
} from "components/admin/dialog";
import { Button } from "components/core";
import { PrivateLayout } from "layouts";
import { MuiTblOptions, downloadFile, getHoursAndMinutes, notify } from "utils";
import {
  Avatar,
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Typography,
} from "@mui/material";
import dayjs from "dayjs";
import {
  EditLeaveManagementDrawer,
  EditTransportDrawer,
} from "components/admin";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import Swal from "sweetalert2";
import { CSVLink } from "react-csv";
import { Dispatch, SetStateAction, useState } from "react";

const ManageTranport = () => {
  const { mutate: transportDelete } = useFetch();
  const [pageNo, setPageNo] = useState(1);
  const { data, isValidating, mutate } = useSWRFetch<any>("transport");
  const [openExport, setOpenExport] = useState(false);
  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) || 25
  );
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleDeleteTransport = (transport: any) => {
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
            const response = await transportDelete({
              path: `transport/delete/${transport?._id}`,
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

  const headers = [
    { label: "From Route", key: "startFrom" },
    { label: "Start Time", key: "startTime" },
    { label: "Vehicle Name", key: "vehicleName" },
    { label: "Vehicle Number", key: "vehicleNumber" },
    { label: "Driver Name", key: "driverName" },
    { label: "Driver Number", key: "driverNumber" },
    { label: "In-charge Name", key: "inchargeName" },
    { label: "In-charge Number", key: "inchargeNumber" },
    { label: "Timestamp", key: "createdTime" },
  ];
  return (
    <div className="w-full">
      <PrivateLayout title="Transport | Manage">
        <div className="m-auto md:px-5 py-4">
          <ClickAwayListener onClickAway={() => setOpenExport(false)}>
            <div className="mb-4 flex flex-col md:flex-row bg-indigo-50 p-4 rounded-md shadow-md gap-3 justify-between">
              <h2 className="text-theme text-3xl font-bold ">
                Transport Details
              </h2>
              <div className="flex flex-col md:flex-row gap-2">
                {/* <CSVLink
                filename="transport-details.csv"
                headers={headers}
                data={
                  (data?.data?.length &&
                    data?.data?.map((item: any) => {
                      return {
                        ...item,
                        startTime: getHoursAndMinutes(new Date(item.startTime)),
                        vehicleName: item?.vehicle?.vehicleName,
                        vehicleNumber: item?.vehicle?.vehicleNumber,
                        driverName: item?.driver?.name,
                        driverNumber: item?.driver?.phoneNumber,
                        inchargeName: item?.inCharge?.displayName,
                        inchargeNumber: item?.inCharge?.phoneNumber,
                        createdTime: new Date(item?.createdAt),
                      };
                    })) ||
                  []
                }
              >
                <Button disabled={!data?.data?.length} startIcon={<Download />}>
                  Download
                </Button>
              </CSVLink> */}
                <AddTransportDialog mutate={mutate} />
                <Button
                  startIcon={<UploadFile />}
                  // className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                  onClick={() => setOpenExport(!openExport)}
                >
                  Export
                </Button>
              </div>
              <div
                className={`fixed top-0 w-fit z-[9999] right-0 transition-all ease-in-out duration-300 h-screen bg-white max-w-[80vw] md:min-w-[30rem] ${
                  openExport ? "translate-x-0" : "translate-x-[120%]"
                } `}
              >
                {
                  <ExportData
                    setType={setDownloadType}
                    type={downloadType}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    selectedRange={selectedRange as number}
                    setSelectedRange={setSelectedRange}
                    totalStudents={data?.totalCount}
                    pageNo={pageNo}
                  />
                }
              </div>
            </div>
          </ClickAwayListener>
          <MaterialTable
            components={{
              Container: (props) => (
                <Paper {...props} className="!bg-indigo-50" />
              ),
            }}
            title={""}
            isLoading={isValidating}
            data={
              data?.data?.map((item: any, i: number) => ({
                ...item,
                sl: i + 1,
                // timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
              })) || []
            }
            options={{ ...MuiTblOptions(), exportMenu: [] }}
            columns={[
              {
                title: "#",
                field: "sl",
                editable: "never",
                width: "2%",
              },
              {
                title: "From Route",
                field: "startFrom",
                searchable: true,
              },
              {
                title: "From Time",
                field: "startTime",
                searchable: true,
                render: ({ startTime }) => dayjs(startTime).format("h:mm A"),
              },
              {
                title: "Vehicle Number",
                field: "vehicleNumber",
                searchable: true,
                render: ({ vehicle }) =>
                  `${vehicle?.vehicleName} (${vehicle?.vehicleNumber})`,
              },
              {
                export: true,
                title: "Driver Profile",
                tooltip: "profile",
                searchable: true,
                field: "name",
                render: ({ driver }) => (
                  <>
                    <ListItem sx={{ paddingLeft: "0px" }}>
                      <ListItemAvatar>
                        <Avatar src={driver?.photoUrl} alt={"img"} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={
                          <Typography
                            className="!font-semibold"
                            component="span"
                            variant="body2"
                          >
                            {driver?.name}
                          </Typography>
                        }
                        secondaryTypographyProps={{
                          fontWeight: "500",
                        }}
                        secondary={driver?.phoneNumber}
                        //   secondary={phoneNumber}
                      ></ListItemText>
                    </ListItem>
                  </>
                ),
              },
              {
                export: true,
                title: "In Charge Profile",
                tooltip: "profile",
                searchable: true,
                field: "driver",
                render: ({ inCharge }) =>
                  inCharge ? (
                    <>
                      <ListItem sx={{ paddingLeft: "0px" }}>
                        <ListItemAvatar>
                          <Avatar src={inCharge?.photoUrl} alt={"img"} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={
                            <Typography
                              className="!font-semibold"
                              component="span"
                              variant="body2"
                            >
                              {inCharge?.displayName}
                            </Typography>
                          }
                          secondaryTypographyProps={{
                            fontWeight: "500",
                          }}
                          secondary={inCharge?.phoneNumber}
                          //   secondary={phoneNumber}
                        ></ListItemText>
                      </ListItem>
                    </>
                  ) : (
                    "---"
                  ),
              },
              {
                title: "Price",
                field: "price",
                searchable: true,
              },
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
                title: "Created At",
                field: "createdAt",
                emptyValue: "Not Provided",
                render: ({ createdAt }: any) =>
                  dayjs(createdAt).format("MMM D, YYYY h:mm A"),
              },

              {
                title: "Actions",
                headerStyle: {
                  textAlign: "center",
                },
                export: false,
                width: "18%",
                // field: "pick",
                render: (row: any) => (
                  <>
                    <div className="flex">
                      {" "}
                      <EditTransportDrawer open={row} mutate={mutate} />
                      <DriverDetailsDialog open={row} />
                      <Tooltip title="Delete Product">
                        <Avatar
                          variant="rounded"
                          onClick={() => handleDeleteTransport(row as any)}
                          className=" !mr-1 !cursor-pointer !bg-red-700 text-white"
                        >
                          {/* {isDeletingAccessory ? (
                            <CircularProgress size={16} color="inherit" />
                          ) : (
                            <Delete className="!p-0" />
                          )} */}{" "}
                          <Delete className="!p-0" />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </>
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

export default withProtectedAdmin(ManageTranport);
const exportFields = [
  { key: "_id", value: "Id" },
  { key: "startFrom", value: "Start From" },
  { key: "startTime", value: "Start Time" },
  { key: "vehicleName", value: "Vehicle Name" },
  { key: "vehicleNumber", value: "Vehicle Number" },
  { key: "vehicleRcNumber", value: "Vehicle RC Number" },
  { key: "rcExpiryDate", value: "RC Expiry Date" },
  { key: "vehicleInsuranceNumber", value: "Vehicle Insurance Number" },
  { key: "vehicleInsuranceExpiryDate", value: "Vehicle Insurance Expiry Date" },
  { key: "vehiclePucNumber", value: "Vehicle PUC Number" },
  { key: "vehiclePucExpiryDate", value: "Vehicle PUC Expiry Date" },
  { key: "vehicleStatus", value: "Vehicle Status" },
  { key: "driverName", value: "Driver Name" },
  { key: "driverPhoneNumber", value: "Driver Phone Number" },
  { key: "driverDrivingLicenseNumber", value: "Driver Driving License Number" },
  { key: "driverLicenseExpiryDate", value: "Driver License Expiry Date" },
  { key: "staffIncharge", value: "Staff Incharge" },
  { key: "staffInchargeNumber", value: "Staff Incharge Number" },
  { key: "staffInchargeEmail", value: "Staff Incharge Email" },
];
const downloadType = ["pdf", "excel"];
const ExportData = ({
  type,
  setType,
  selectedValues,
  setSelectedValues,
  selectedRange,
  setSelectedRange,
  totalStudents,
  courseId,
  branchId,
  batchId,
  pageNo,
  searchTitle,
  studentType,
}: {
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedRange?: Number;
  setSelectedRange: Dispatch<SetStateAction<Number>>;
  totalStudents?: number;
  courseId?: string;
  branchId?: string;
  batchId?: string;
  pageNo?: number;
  searchTitle?: string;
  studentType?: string;
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];
  const handleCheckboxClick = (itemId: string) => {
    setSelectedValues((prevValues) => {
      if (prevValues.includes(itemId)) {
        // Deselect the checkbox if it was already selected
        return prevValues.filter((value) => value !== itemId);
      } else {
        if (type === "pdf" && prevValues?.length > 3) {
          notify.error("A maximum of 3 field can be choose in PDF type.");
          return prevValues;
        }

        // Select the checkbox if it was not already selected
        return [...prevValues, itemId];
      }
    });
  };
  const handleSelectAllClick = () => {
    if (selectAll) {
      // Deselect all checkboxes if "Select All" is currently checked
      setSelectedValues([]);
      setSelectAll(false);
    } else if (!selectAll && type === "pdf") {
      notify.error("A maximum of 3 field can be choose in PDF type.");
    } else {
      // Select all checkboxes if "Select All" is currently unchecked
      const allItemIds = exportFields.map((item) => item?.key);
      setSelectedValues(allItemIds);
      setSelectAll(true);
    }
  };
  const valuetext = (value: number) => {
    return `${value}`;
  };
  const valueLabelFormat = (value: number) => {
    return value.toString();
  };

  const handleExportData = () => {
    if (type === "pdf" && selectedValues && selectedValues?.length > 3) {
      notify.error("Can't select all the field in pdf type.");
      return;
    }
    downloadFile({
      method: "GET",
      type: type as any,
      url:
        `transport/export?perPage=${selectedRange}&pageNo=${pageNo}` +
        // (batchId ? `&session=${batchId}` : "") +
        // (courseId ? `&course=${courseId}` : "") +
        // (branchId ? `&branch=${branchId}` : "") +

        (downloadType ? `&downloadType=${type}` : "") +
        (selectedValues?.length
          ? selectedValues?.reduce((acc, item) => {
              return acc + `&fields=${item}`;
            }, ``)
          : ""),
    });
  };

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <div className="flex items-center py-4 gap-4 justify-between">
        <div className="flex gap-1">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose fields to export
          </h3>
        </div>
        <Button
          disabled={!selectedValues?.length || !type?.length}
          startIcon={<Download />}
          onClick={handleExportData}
        >
          Generate
        </Button>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={selectAll}
            onClick={handleSelectAllClick}
            color="primary"
          />
          <h3 className="font-semibold tracking-wide text-sm text-theme">
            Select All
          </h3>
        </div>
        {exportFields?.map((item: any) => (
          <div key={item?._id} className="flex items-center gap-4">
            <Checkbox
              size="small"
              // checked={item?._id === batchId}
              checked={selectedValues?.includes(item?.key)}
              onClick={() => handleCheckboxClick(item?.key)}
            />
            <h3 className="font-medium  tracking-wide text-sm ">
              {item?.value}
            </h3>
          </div>
        ))}

        <div className="flex items-center pt-4 px-2 gap-2">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose export type *
          </h3>
        </div>
        <div className="w-full flex px-3.5 gap-2  pb-2">
          <RadioGroup
            name="downloadType"
            value={type}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setType(event.target.value);
            }}
            row
          >
            {downloadType.map((option) => (
              <FormControlLabel
                key={option}
                value={option}
                control={<Radio size="small" />}
                label={option}
              />
            ))}
          </RadioGroup>
        </div>
        <div className="flex items-center pt-4 px-2 gap-2">
          <AddBox className="text-blue-500 " />
          <h3 className="font-medium text-theme tracking-wide text-sm mt-0.5">
            Choose Range *
          </h3>
        </div>
        <div className="w-full flex px-5 pt-2 gap-2  pb-4">
          <Slider
            aria-label="Always visible"
            defaultValue={500}
            value={selectedRange as number}
            valueLabelFormat={valueLabelFormat}
            marks={marks}
            getAriaValueText={valuetext}
            valueLabelDisplay="on"
            min={0}
            max={totalStudents}
            onChange={(event: Event, value: number | number[]) => {
              setSelectedRange(value as number);
            }}
            className="animate-slide"
          />
        </div>
      </div>
    </div>
  );
};
