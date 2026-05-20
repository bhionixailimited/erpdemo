import { SetStateAction, Dispatch, useDeferredValue, useState } from "react";
import {
  Avatar,
  Checkbox,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  TextField,
  Autocomplete,
  Chip,
} from "@mui/material";
import { MouCard } from "components/admin";
import { PrivateLayout } from "layouts";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import AddMouDrawer from "components/admin/AddMouDrawer";
import MouType from "types/mou";
import { SearchBar } from "components/common";
import { downloadFile, downloadZipFile, notify } from "utils";
import { AddBox, Download } from "@mui/icons-material";
import { Button, Empty } from "components/core";
import DepartmentType from "types/department";
import { MaterialSkeleton } from "components/admin/skeleton";

type dataType = {
  data: MouType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const MOU = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [signingYear, setSigningYear] = useState<string[]>([]);
  const [expiryYear, setExpiryYear] = useState<string[]>([]);

  const searchText = useDeferredValue(searchTitle);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [editDepartmentDrawer, setEditDepartmentDrawer] = useState(false);
  const [setLoading, setIsLoading] = useState(false);
  // console.log("jj", setLoading);
  const [isBatchAssign, setBatchAssign] = useState<string>("");
  const [caste, setCaste] = useState<string[]>([]);
  const [courseId, setCourseId] = useState<string[]>([]);
  const [departmentId, setDepartmentId] = useState<string[]>([]);
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    `mou?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "") +
      (departmentId?.length && departmentId?.length > 0
        ? departmentId
            ?.map((departmentId) => `&departmentId=${departmentId}`)
            .join("")
        : "") +
      (signingYear?.length && signingYear?.length > 0
        ? signingYear
            ?.map((dateOfSigning) => `&dateOfSigning=${dateOfSigning}`)
            .join("")
        : "") +
      (expiryYear?.length && expiryYear?.length > 0
        ? expiryYear
            ?.map((expiryYear) => `&dateOfExpire=${expiryYear}`)
            .join("")
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
    <div className="w-full">
      <PrivateLayout title="MOU | Manage">
        {/* <SearchBar searchText={searchText} setSearchText={setSearchTitle} /> */}
        <div className="px-4 pt-4">
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchTitle}
            filterComp={
              (
                <SearchFilter
                  departmentId={departmentId}
                  setDepartmentId={setDepartmentId}
                  setType={setDownloadType}
                  type={downloadType}
                  signingYear={signingYear}
                  setSigningYear={setSigningYear}
                  expiryYear={expiryYear}
                  setExpiryYear={setExpiryYear}
                />
              ) || undefined
            }
            exportComp={
              (
                <ExportData
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
                  departmentId={departmentId}
                  allData={data?.data}
                  setLoading={setLoading}
                  setIsLoading={setIsLoading}
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
                  src="https://cdn-icons-png.flaticon.com/128/4413/4413569.png"
                  variant="rounded"
                  sx={{
                    height: 54,
                    width: 54,
                  }}
                />
                <AddMouDrawer feeName="Add" Dmutate={mutate} />
              </span>
            </div>

            {data?.data?.map((item: MouType) => (
              <MouCard
                _id={item?._id}
                key={item?._id}
                title={item?.title}
                includeDepartment={item?.includeDepartment?.title}
                description={item?.description}
                // avatarSrc={item?.iconUrl}
                editDepartment={() => setEditDepartmentDrawer(item?._id as any)}
                mutate={mutate}
                signBy={item?.signBy}
                signUnderWhom={item?.signUnderWhom}
                dateOfSigning={item?.dateOfSigning}
                dateOfExpire={item?.dateOfExpire}
                checked={selectedItems.includes(item?._id)}
                onChange={() => handleCheckboxChange(item?._id)}
              />
            ))}
          </div>
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

export default withProtectedAdmin(MOU);
const ExportData = ({
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
  departmentId,
  allData,
  setLoading,
  setIsLoading,
}: {
  setLoading: boolean;
  setIsLoading: any;
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
  departmentId: string[];
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
    { key: "title", value: "Title (Name)" },
    { key: "dateOfSigning", value: "Date of signing" },
    { key: "dateOfExpire", value: "Date of expire" },
    { key: "signBy", value: "Sign By" },
    { key: "signUnderWhom", value: "Sign Under Whom" },
    { key: "description", value: "Description" },
    { key: "department", value: "Department" },
  ];

  const downloadType = ["pdf", "csv", "excel", "document"];
  const { mutate } = useFetch();

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
    setIsLoading(true);
    if (type === "document") {
      const response = await mutate({
        method: "GET",
        path:
          `mou/export?downloadType=json&perPage=${selectedRange}&pageNo=1&search=${searchTitle}` +
          (departmentId?.length && departmentId?.length > 1
            ? departmentId
                ?.map((departmentId) => `&departmentId=${departmentId}`)
                .join("")
            : `&departmentId=${departmentId}`) +
          (selectedIds?.length
            ? selectedIds?.reduce((acc, item) => {
                return acc + `&exportIds=${item}`;
              }, ``)
            : "") +
          `&fields=allDocs&fields=title`,
      });

      if (response?.status !== 200) {
        setIsLoading(false);
        throw new Error("Zip download failed");
      } else {
        setIsLoading(true);
      }
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
      setIsLoading(false);
      return;
    }
    if (type === "pdf" && selectedValues && selectedValues?.length > 3) {
      notify.error("Can't select all the field in pdf type.");
      return;
    }
    setIsLoading(true);
    downloadFile({
      // setIsLoading(false),
      //pdf csv excel
      method: "GET",
      type: type as any,
      url:
        `mou/export?perPage=${selectedRange}&pageNo=1&search=${searchTitle}` +
        (departmentId?.length && departmentId?.length > 1
          ? departmentId
              ?.map((departmentId) => `&departmentId=${departmentId}`)
              .join("")
          : `&departmentId=${departmentId}`) +
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
    setIsLoading(false);
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
            (!selectedValues?.length || !type?.length || selectedRange === 0)
          }
          loading={setLoading}
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
  departmentId,
  setDepartmentId,
  type,
  setType,
  signingYear,
  setSigningYear,
  expiryYear,
  setExpiryYear,
}: {
  departmentId: string[];
  setDepartmentId?: Dispatch<SetStateAction<string[]>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  signingYear: string[];
  setSigningYear: Dispatch<SetStateAction<string[]>>;
  expiryYear: string[];
  setExpiryYear: Dispatch<SetStateAction<string[]>>;
}) => {
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
  const [departmentPageNo, setDepartmentPageNo] = useState(1);
  const { data: department, isValidating: departmentLoading } =
    useSWRFetch<any>(`department?pageNo=${departmentPageNo}`);

  //-----------------------------------Filter By Department---------------------------
  const [selectedDepartments, setSelectedDepartments] = useState<any>([]);

  const handleDepartmentChange = (event: React.SyntheticEvent, value: any) => {
    console.log(value);
    setSelectedDepartments(value);
    setDepartmentId && setDepartmentId(value?.map((item: any) => item?._id));
  };
  const handleAddDepartment = () => {
    if (selectedDepartments.length > 0) {
      setDepartmentId && setDepartmentId(selectedDepartments);
    }
  };
  const toggleDepartment = (department: string) => {
    if (departmentId?.includes(department)) {
      setDepartmentId &&
        setDepartmentId(departmentId?.filter((id) => id !== department));
    } else {
      setDepartmentId && setDepartmentId([...(departmentId || []), department]);
    }
  };
  // console.log(departmentId);
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* -------------------------Filter By Course ---------------------------*/}

      {/* --------------------------Filter by department------------------------- */}

      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Department
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="department-filter"
          options={department?.data || []}
          value={selectedDepartments}
          getOptionLabel={(option) => option.title} // Display the title
          onChange={handleDepartmentChange}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Department"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option) => (
              <Chip
                label={option.title} // Display the title
                {...getTagProps({ index: option._id })} // Use the ID as the index
                key={option._id}
              />
            ))
          }
        />

        {/* --------------------------------Filter By Date Of Signing----------------------------------- */}
      </div>

      {/* --------------------Filter By Date Of Signing-------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Date Of Signing
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={signingYear}
          onChange={(event: React.SyntheticEvent, value: any) => {
            setSigningYear(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Date Of Signing Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option: any, index: number) => (
              <Chip
                label={option}
                onDelete={() => {
                  const newValue = [...signingYear];
                  newValue.splice(index, 1); // Remove the selected option
                  setSigningYear(newValue);
                }}
                key={option}
              />
            ))
          }
        />

        {/* --------------------------------Filter By Date Of Expiry----------------------------------- */}
      </div>
      {/* --------------------Filter By Date Of Expiry-------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Date Of Expiry
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={expiryYear}
          onChange={(event: React.SyntheticEvent, value: any) => {
            setExpiryYear(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Date Of Expiry Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option: any, index: number) => (
              <Chip
                label={option}
                onDelete={() => {
                  const newValue = [...expiryYear];
                  newValue.splice(index, 1); // Remove the selected option
                  setExpiryYear(newValue);
                }}
                key={option}
              />
            ))
          }
        />

        {/* --------------------------------search By BatchAssign----------------------------------- */}
      </div>
    </div>
  );
};
