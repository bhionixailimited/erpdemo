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
import { AddProjectDetailsDialog } from "components/admin/dialog";
import { DepartmentSkeleton, ProjectSkeleton } from "components/admin/skeleton";
import { ProjectDetailsCard } from "components/cards";
import { SearchBar } from "components/common";
import { Button, Empty } from "components/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import { ProjectDetails } from "types/projectDetails";
import { downloadFile, downloadZipFile, notify } from "utils";

const ManageProject = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [sanctionDate, setSanctionDate] = useState<string[]>([]);
  const [date, setDate] = useState<string[]>([]);
  const [isSanctionStatus, setIsSanctionStatus] = useState<string>("");
  //perPage=12& -- if necessary
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `project-details?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "") +
      (isSanctionStatus ? `&status=${isSanctionStatus}` : "") +
      (date?.length && date?.length > 0
        ? date?.map((year) => `&date=${year}`).join("")
        : "") +
      (sanctionDate?.length && sanctionDate?.length > 0
        ? sanctionDate?.map((year) => `&sanctionDate=${year}`).join("")
        : "")
  );
  const [selectedRange, setSelectedRange] = useState<number>(
    (data?.perPage && data?.perPage) || 12
  );
  // Function to handle checkbox changes
  const handleCheckboxChange = (itemId: string) => {
    // Check if the item is already selected
    const isSelected = selectedItems.includes(itemId);
    if (isSelected) {
      // If it's selected, remove it from the selected items
      setSelectedItems(selectedItems.filter((id) => id !== itemId));
      setSelectedRange((prev) => prev - 1 || 0);
    } else {
      // If it's not selected, add it to the selected items
      setSelectedItems([...selectedItems, itemId]);
      setSelectedRange((prev) => prev + 1 || 0);
    }
  };
  return (
    <div className="w-full">
      <PrivateLayout title="Admin | Projects">
        <section className="w-full bg-gray-50 p-4 ">
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
            <h2 className="text-theme text-3xl font-bold ">Projects</h2>
            <div>
              <AddProjectDetailsDialog mutate={mutate} />
            </div>
          </div>
          {/* <SearchBar searchText={searchText} setSearchText={setSearchTitle} /> */}
          <div className="">
            <SearchBar
              searchText={searchText}
              setSearchText={setSearchTitle}
              filterComp={
                (
                  <SearchFilter
                    isSanctionStatus={isSanctionStatus}
                    setIsSanctionStatus={setIsSanctionStatus}
                    sanctionDate={sanctionDate}
                    setSanctionDate={setSanctionDate}
                    date={date}
                    setDate={setDate}
                  />
                ) || undefined
              }
              exportComp={
                (
                  <ExportData
                    date={date}
                    sanctionDate={sanctionDate}
                    allData={data?.data}
                    isSanctionStatus={isSanctionStatus}
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
                  />
                ) || undefined
              }
            />
          </div>
          <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 mt-4 gap-4">
            {isValidating ? (
              <ProjectSkeleton i={data?.data?.length || 8} />
            ) : data?.data?.length >= 1 ? (
              data?.data?.map((item: ProjectDetails, i: number) => (
                <ProjectDetailsCard
                  key={i}
                  title={item?.title}
                  submittedTo={item?.submittedTo}
                  submittedUnder={item?.submittedUnder}
                  submittedBy={item?.submittedBy}
                  date={item?.date}
                  totalCostOfProject={item?.totalCostOfProject}
                  description={item?.description}
                  status={item?.status}
                  sanctionDate={item?.sanctionDate}
                  sanctionAmount={item?.sanctionAmount}
                  projectId={item?._id}
                  documentPath={item?.documentPath}
                  documentUrl={item?.documentUrl}
                  mutate={mutate}
                  checked={selectedItems.includes(item?._id)}
                  onChange={() => handleCheckboxChange(item?._id)}
                />
              ))
            ) : (
              <span className="col-span-12">
                <Empty title="No Projects Found" />
              </span>
            )}
          </div>
          {/* ------------------Pagination---------------------- */}
          {/* <div className="w-full flex items-center justify-center py-4 mt-2">
            <Pagination
              count={Math.ceil(
                Number(data?.totalCount || 1) / Number(data?.perPage || 1)
              )}
              onChange={(e, v: number) => setPageNo(v)}
              variant="outlined"
              color="primary"
            />
          </div> */}
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ManageProject);
const ExportData = ({
  isSanctionStatus,
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
  sanctionDate,
  date,
}: {
  date: string[];
  sanctionDate: string[];
  isSanctionStatus: string;
  searchTitle: string;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedIds?: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  selectedRange?: number;
  setSelectedRange: Dispatch<SetStateAction<number>>;
  totalStudents?: number;
  allData?: any;
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const { mutate } = useFetch();
  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];

  const exportFields = [
    { key: "title", value: "Title (Name)" },
    { key: "submittedTo", value: "Submitted To" },
    { key: "submittedUnder", value: "Submitted Under" },
    { key: "submittedBy", value: "Submitted By" },
    { key: "date", value: "Date" },
    { key: "totalCostOfProject", value: "Total cost of project" },
    { key: "status", value: "Sanction Status" },
    { key: "description", value: "Description" },
    { key: "sanctionDate", value: "Sanction Date" },
    { key: "sanctionAmount", value: "Sanction Amount" },
  ];

  const downloadType = ["pdf", "csv", "excel", "document"];

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

  const handleExportData = async () => {
    if (type === "document") {
      const response = await mutate({
        path:
          `project-details/export?perPage=${selectedRange}&pageNo=1` +
          (searchTitle ? `&search=${searchTitle}` : "") +
          (date?.length && date?.length > 0
            ? date?.map((year) => `&date=${year}`).join("")
            : "") +
          (sanctionDate?.length && sanctionDate?.length > 0
            ? sanctionDate?.map((year) => `&sanctionDate=${year}`).join("")
            : "") +
          (isSanctionStatus ? `&status=${isSanctionStatus}` : "") +
          (selectedIds?.length
            ? selectedIds?.reduce((acc, item) => {
                return acc + `&exportIds=${item}`;
              }, ``)
            : "") +
          `&fields=documentUrl&fields=title&downloadType=json`,
        method: "GET",
      });

      if (response?.status !== 200) throw new Error("Zip download failed");

      const simplifyData = response?.data?.data?.data?.filter(
        (item: any) => item?.documentUrl?.length
      );

      // const downloadableData = simplifyData?.flatMap(
      //   (item: any, index: number) =>
      //     item?.photoUrl?.map((inner: any, innerIndex: number) => {
      //       return {
      //         url: inner,
      //         name: `${index + 1}-${innerIndex + 1}`,
      //       };
      //     })
      // );

      downloadZipFile(
        (simplifyData || [])?.map((item: any, innerIndex: number) => ({
          url: item?.documentUrl,
          name: `${item?.title}`,
        }))
      );

      return;
    }
    if (type === "pdf" && selectedValues && selectedValues?.length > 3) {
      notify.error("Can't select all the field in pdf type.");
      return;
    }
    downloadFile({
      method: "GET",
      type: type as any,
      url:
        `project-details/export?perPage=${selectedRange}&pageNo=1` +
        (searchTitle ? `&search=${searchTitle}` : "") +
        (date?.length && date?.length > 0
          ? date?.map((year) => `&date=${year}`).join("")
          : "") +
        (sanctionDate?.length && sanctionDate?.length > 0
          ? sanctionDate?.map((year) => `&sanctionDate=${year}`).join("")
          : "") +
        (isSanctionStatus ? `&status=${isSanctionStatus}` : "") +
        (downloadType ? `&downloadType=${type}` : "") +
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
          disabled={
            type !== "document" &&
            (selectedValues?.length === 0 || selectedRange === 0)
          }
          startIcon={<Download />}
          onClick={handleExportData}
        >
          Generate
        </Button>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {type !== "document" && (
          <>
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
          </>
        )}
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
            value={
              selectedIds?.length && selectedIds?.length > 0
                ? selectedIds?.length
                : (selectedRange as number)
            }
            disabled={allData?.length <= 0}
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
  // isSanctionStatus,
  // setIsPassType,
  isSanctionStatus,
  setIsSanctionStatus,
  sanctionDate,
  setSanctionDate,
  date,
  setDate,
}: {
  isSanctionStatus: string;
  setIsSanctionStatus?: Dispatch<SetStateAction<string>>;
  sanctionDate: string[];
  setSanctionDate?: Dispatch<SetStateAction<string[]>>;
  date: string[];
  setDate?: Dispatch<SetStateAction<string[]>>;
}) => {
  const abc = [
    { key: "1", title: "YES", value: "true" },
    { key: "2", title: "NO", value: "false" },
  ];
  const sanctionedArr = [
    {
      key: 1,
      label: "Yes",
      value: "YES",
    },
    {
      key: 2,
      label: "No",
      value: "NO",
    },
  ];
  // filter by year
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
            Filter By Sanction Status
          </h3>
        </div>
        <Divider />
        {sanctionedArr?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={isSanctionStatus === item?.value}
              onClick={() =>
                setIsSanctionStatus &&
                setIsSanctionStatus((prev) =>
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

      {/*--------------------- Filter By Date year------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Date Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={date}
          onChange={(event, value) => {
            setDate?.(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                onDelete={() => {
                  if (Array.isArray(date)) {
                    const newValue = [...date];
                    newValue.splice(index, 1); // Remove the selected option
                    setDate?.(newValue);
                  }
                }}
                key={option}
              />
            ))
          }
        />
      </div>
      {/*--------------------- Filter By Sanction year------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Sanction Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={sanctionDate}
          onChange={(event, value) => {
            setSanctionDate?.(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Sanction Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                onDelete={() => {
                  if (Array.isArray(sanctionDate)) {
                    const newValue = [...sanctionDate];
                    newValue.splice(index, 1); // Remove the selected option
                    setSanctionDate?.(newValue);
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
