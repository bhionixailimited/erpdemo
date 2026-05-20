import { AddBox, Download } from "@mui/icons-material";
import {
  Autocomplete,
  Avatar,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Slider,
  TextField,
} from "@mui/material";
import { Skeleton } from "@mui/lab";

import {
  AddAppointmentDrawer,
  AppointmentCardChairman,
} from "components/admin";
import { ProjectSkeleton } from "components/admin/skeleton";
import { SearchBar } from "components/common";
import { Button, Empty } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
// import Slider from "react-slick";

import AppointmentType from "types/appointment";
import { downloadFile, notify } from "utils";

type dataType = {
  data: AppointmentType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const Appointment = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isPassType, setIsPassType] = useState<string>("");
  const searchText = useDeferredValue(searchTitle);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [appointmentYear, setAppointmentYear] = useState<string[]>([]);
  //perPage=8& ---if necessary like and for pagination
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `appointment?pageNo=${pageNo}` +
      (searchTitle ? `&searchTitle=${searchTitle}` : "") +
      (isPassType ? `&passType=${isPassType}` : "") +
      (appointmentYear?.length && appointmentYear?.length > 0
        ? appointmentYear?.map((year) => `&timeOfAppointment=${year}`).join("")
        : "")
  );
  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) || 12
  );

  // Function to handle checkbox changes
  const handleCheckboxChange = (itemId: string) => {
    // Check if the item is already selected
    const isSelected = selectedItems.includes(itemId);

    if (isSelected) {
      // If it's selected, remove it from the selected items
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
    } else {
      // If it's not selected, add it to the selected items
      setSelectedItems([...selectedItems, itemId]);
    }
  };
  return (
    <div className="w-full">
      <PrivateLayout title="Appointment">
        {/* --------------------------Search Compomnent-------------------------- */}
        <div className="pt-4 px-4">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchTitle}
            filterComp={
              (
                <SearchFilter
                  isPassType={isPassType}
                  setIsPassType={setIsPassType}
                  appointmentYear={appointmentYear}
                  setAppointmentYear={setAppointmentYear}
                />
              ) || undefined
            }
            exportComp={
              (
                <ExportData
                  appointmentYear={appointmentYear}
                  isPassType={isPassType}
                  selectedIds={selectedItems}
                  setSelectedIds={setSelectedItems}
                  setType={setDownloadType}
                  type={downloadType}
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  setSelectedValues={setSelectedValues}
                  selectedValues={selectedValues}
                  totalStudents={data?.totalCount}
                  searchTitle={searchTitle}
                  allData={data?.data}
                />
              ) || undefined
            }
          />
        </div>
        <div className="px-4 mt-6">
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-theme rounded-xl ">
              <span
                className={`flex flex-col p-2 2xl:p-4 items-center justify-center mt-5  h-52 xl:h-52 2xl:h-52`}
              >
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/128/3050/3050515.png"
                  variant="rounded"
                  sx={{
                    height: 70,
                    width: 70,
                  }}
                />
                <AddAppointmentDrawer feeName="Add" Dmutate={mutate} />
              </span>
            </div>
            {isValidating ? (
              <>
                {Array(9)
                  .fill(0)
                  .map((item, index) => (
                    <div
                      className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 rounded-xl border shadow-md"
                      key={index}
                    >
                      <div
                        className={`flex flex-col p-1 2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-64`}
                      >
                        <Skeleton
                          variant="rounded"
                          width={80}
                          height={80}
                          animation="pulse"
                        />
                        <Skeleton
                          variant="text"
                          width={150}
                          sx={{ fontSize: "1rem" }}
                        />
                        <Skeleton
                          variant="rectangular"
                          width={210}
                          height={40}
                        />
                      </div>
                    </div>
                  ))}
              </>
            ) : data?.data?.length && data?.data?.length >= 1 ? (
              data?.data?.map((item: any, i: number) => (
                <AppointmentCardChairman
                  _id={item?._id}
                  key={item?._id}
                  name={item?.name}
                  phoneNumber={item?.phoneNumber}
                  reason={item?.reason}
                  mutate={mutate}
                  passType={item?.passType}
                  whomToMeet={item?.whomToMeet}
                  timeOfAppointment={item?.timeOfAppointment}
                  instituteId={item?.instituteId}
                  checked={selectedItems.includes(item?._id)}
                  onChange={() => handleCheckboxChange(item?._id)}
                />
              ))
            ) : (
              <span className="col-span-12">
                <Empty title="No Resource Persons Found" />
              </span>
            )}
          </div>
          {/* -------------------Pagination--------------- */}
          {/* <div className="w-full flex items-center justify-center py-10">
            <Pagination
              count={Math.ceil(
                Number(data?.totalCount || 1) / Number(data?.perPage || 1)
              )}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(Appointment);
const ExportData = ({
  appointmentYear,
  isPassType,
  type,
  setType,
  selectedValues,
  setSelectedValues,
  selectedRange,
  setSelectedRange,
  totalStudents,
  selectedIds,
  setSelectedIds,
  searchTitle,
  allData,
}: {
  appointmentYear: string[];
  isPassType: string;
  searchTitle: string;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedIds?: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  selectedRange?: Number;
  setSelectedRange: Dispatch<SetStateAction<Number>>;
  totalStudents?: number;
  allData?: any;
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];

  const exportFields = [
    { key: "name", value: "Name" },
    { key: "whomToMeet", value: "Whom To Meet" },
    { key: "phoneNumber", value: "Phone Number" },
    { key: "reason", value: "Reason" },
    { key: "timeOfAppointment", value: "Time Of Appointment" },
    { key: "passType", value: "Pass Type" },
  ];

  const downloadType = ["pdf", "csv", "excel"];

  const handleCheckboxClick = (itemId: string) => {
    selectAll && setSelectAll(false);
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
        `appointment/export?perPage=${selectedRange}&pageNo=1&search=${searchTitle}` +
        (downloadType ? `&downloadType=${type}` : "") +
        (appointmentYear?.length && appointmentYear?.length > 0
          ? appointmentYear
              ?.map((year) => `&timeOfAppointment=${year}`)
              .join("")
          : "") +
        (isPassType ? `&passType=${isPassType}` : "") +
        (selectedIds?.length
          ? selectedIds?.reduce((acc, item) => {
              return acc + `&exportIds=${item}`;
            }, ``)
          : "") +
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
            disabled={allData?.length <= 0}
            value={
              selectedIds?.length && selectedIds?.length > 0
                ? selectedIds?.length
                : (selectedRange as number)
            }
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
const SearchFilter = ({
  isPassType,
  setIsPassType,
  appointmentYear,
  setAppointmentYear,
}: {
  isPassType: string;
  setIsPassType?: Dispatch<SetStateAction<string>>;
  appointmentYear?: string[];
  setAppointmentYear: Dispatch<SetStateAction<string[]>>;
}) => {
  const abc = [
    { key: "1", title: "YES", value: "true" },
    { key: "2", title: "NO", value: "false" },
  ];
  const passTypes = [
    { key: "01", label: "Normal", value: "Normal" },
    {
      key: "02",
      label: "Inventory Gate Pass",
      value: "InventoryGatePass",
    },
    {
      key: "03",
      label: "Admission Gate Pass",
      value: "AdmissionGatePass",
    },
  ];

  function getYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];

    // Create a range of 50 years before and after the current year
    for (let i = currentYear - 50; i <= currentYear + 50; i++) {
      years.push(i.toString());
    }

    return years;
  }
  const years = getYearOptions();

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* <Divider /> */}

      {/* --------------------------------search By BatchAssign----------------------------------- */}
      <Divider />
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Pass Type
          </h3>
        </div>
        <Divider />
        {passTypes?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={isPassType === item?.value}
              onClick={() =>
                setIsPassType &&
                setIsPassType((prev) =>
                  prev === item?.value ? "" : item.value
                )
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.label}
            </h3>
          </div>
        ))}
      </div>

      {/* -----------------------Filter By Appoinment Year-------------------------- */}
      {/*--------------------- Filter By Event year------------------- */}
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Appoinment Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={appointmentYear}
          onChange={(event, value) => {
            setAppointmentYear(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Appoinment Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                onDelete={() => {
                  if (Array.isArray(appointmentYear)) {
                    const newValue = [...appointmentYear];
                    newValue.splice(index, 1); // Remove the selected option
                    setAppointmentYear(newValue);
                  }
                }}
                key={option}
              />
            ))
          }
        />
      </div>
    </div>
  );
};
