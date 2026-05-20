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
import { AddBox, Download, SafetyDivider } from "@mui/icons-material";
import { AddEventDrawer, EventCard, MouCard } from "components/admin";
import { SearchBar } from "components/common";
import { useFetch, useSWRFetch } from "hooks";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import { EventType } from "types/event";
import { downloadFile, downloadZipFile, notify } from "utils";
import { Button } from "components/core";

type dataType = {
  data: EventType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const SocialEvent = ({ eventType }: { eventType: string }) => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const searchText = useDeferredValue(searchTitle);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [eventDate, setEventDate] = useState<string[]>([]);
  const [editDepartmentDrawer, setEditDepartmentDrawer] = useState(false);
  //perPage=15&  --- if necessary include this
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `event?pageNo=${pageNo}&eventType=${eventType}` +
      (searchText ? `&searchTitle=${searchTitle}` : "") +
      (eventDate?.length && eventDate?.length > 0
        ? eventDate?.map((year) => `&eventDate=${year}`).join("")
        : "")
  );
  const [selectedRange, setSelectedRange] = useState<number>(
    (data?.totalCount && data?.totalCount) || 0
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
    <div className="px-1">
      {/* <SearchBar searchText={searchText} setSearchText={setSearchTitle} /> */}
      <div className="py-3">
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchTitle}
          filterComp={
            (
              <SearchFilter eventDate={eventDate} setEventDate={setEventDate} />
            ) || undefined
          }
          exportComp={
            (
              <ExportData
                eventDate={eventDate}
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
                eventType={eventType}
              />
            ) || undefined
          }
        />
      </div>
      <div className="grid grid-cols-12 gap-4 w-full">
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-theme rounded-xl ">
          <span
            className={`flex flex-col p-2 2xl:p-4 items-center justify-center mt-2  h-36 xl:h-44 2xl:h-44`}
          >
            <Avatar
              src="https://cdn-icons-png.flaticon.com/128/4413/4413569.png"
              variant="rounded"
              sx={{
                height: 54,
                width: 54,
              }}
            />
            <AddEventDrawer
              eventType={eventType}
              feeName="Add"
              Dmutate={mutate}
            />
          </span>
        </div>
        {data?.data?.map((item: EventType) => (
          <EventCard
            _id={item?._id}
            key={item?._id}
            title={item?.title}
            duration={item?.venue}
            description={item?.description}
            // avatarSrc={item?.iconUrl}
            editDepartment={() => setEditDepartmentDrawer(item?._id as any)}
            mutate={mutate}
            dateOfSigning={item?.eventDate}
            checked={selectedItems.includes(item?._id)}
            onChange={() => handleCheckboxChange(item?._id)}
          />
        ))}
      </div>
      {/* ------------------------------Pagination------------------------- */}
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
  );
};

export default SocialEvent;
const ExportData = ({
  eventDate,
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
  eventType,
}: {
  eventDate?: string[];
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
  eventType?: string;
}) => {
  const [selectAll, setSelectAll] = useState(false);
  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];

  const exportFields = [
    { key: "title", value: "Event (Name)" },
    { key: "description", value: "Description" },
    { key: "eventDate", value: "Event Date" },
    { key: "venue", value: "Venue" },
    { key: "guests", value: "Guests" },
  ];
  const { mutate } = useFetch();
  const downloadType = ["pdf", "csv", "excel", "document"];

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

  const handleExportData = async () => {
    if (type === "document") {
      const response = await mutate({
        method: "GET",
        path:
          `event/export?downloadType=json&perPage=${selectedRange}&pageNo=1` +
          (eventType ? `&eventType=${eventType}` : "") +
          (eventDate?.length && eventDate?.length > 0
            ? eventDate?.map((year) => `&eventDate=${year}`).join("")
            : "") +
          (searchTitle ? `&search=${searchTitle}` : "") +
          (selectedIds?.length
            ? selectedIds?.reduce((acc, item) => {
                return acc + `&exportIds=${item}`;
              }, ``)
            : "") +
          `&fields=allDocs&fields=title`,
      });

      if (response?.status !== 200) throw new Error("Zip download failed");
      const flattenedAllDocs = response?.data?.data?.data?.flatMap(
        (item: any) =>
          item?.allDocs?.map((doc: any) => ({
            title: `${item?.title}-${doc?.title}`,
            url: doc?.url,
          }))
      );

      const simplifyData = flattenedAllDocs?.filter(
        (item: any) => item?.url?.length
      );

      downloadZipFile(
        (simplifyData || [])?.map((item: any, innerIndex: number) => ({
          url: item?.url,
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
        `event/export?perPage=${selectedRange}&pageNo=1` +
        (eventType ? `&eventType=${eventType}` : "") +
        (eventDate?.length && eventDate?.length > 0
          ? eventDate?.map((year) => `&eventDate=${year}`).join("")
          : "") +
        (searchTitle ? `&search=${searchTitle}` : "") +
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
            (!selectedValues?.length || selectedRange === 0)
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
  eventDate,
  setEventDate,
}: {
  eventDate?: string[];
  setEventDate: Dispatch<SetStateAction<string[]>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);

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
      {/*--------------------- Filter By Event year------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Event Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={eventDate}
          onChange={(event, value) => {
            setEventDate(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Event Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                onDelete={() => {
                  if (Array.isArray(eventDate)) {
                    const newValue = [...eventDate];
                    newValue.splice(index, 1); // Remove the selected option
                    setEventDate(newValue);
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
