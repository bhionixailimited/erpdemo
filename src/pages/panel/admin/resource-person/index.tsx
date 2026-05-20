import { AddBox, Download } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { AddResourcePersonDialog } from "components/admin/dialog";
import { DepartmentSkeleton, ProjectSkeleton } from "components/admin/skeleton";
import { ResourcePersonCard } from "components/cards";
import { SearchBar } from "components/common";
import { Button, Empty } from "components/core";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useDeferredValue, useState, Dispatch, SetStateAction } from "react";
import { downloadFile, downloadZipFile, notify } from "utils";

const ManageResourcePerson = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchTitle, setSearchTitle] = useState("");
  const [isSubjectExport, setIsSubjectExport] = useState<string>("");
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const searchText = useDeferredValue(searchTitle);
  //perPage=12&
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `person-resource?pageNo=${pageNo}` +
      (searchText ? `&searchTitle=${searchTitle}` : "") +
      (isSubjectExport ? `&subjectExport=${isSubjectExport}` : "")
  );
  const [selectedRange, setSelectedRange] = useState<number>(
    (data?.perPage && data?.perPage) || 12
  );
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

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
      <PrivateLayout title="Admin | Person Resource">
        <section className="w-full bg-gray-50 p-4 ">
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
            <h2 className="text-theme text-3xl font-bold ">Resource Persons</h2>
            <div>
              <AddResourcePersonDialog mutate={mutate} />
            </div>
          </div>

          {/* --------------------------Search Compomnent-------------------------- */}
          <SearchBar
            searchText={searchText}
            setSearchText={setSearchTitle}
            filterComp={
              (
                <SearchFilter
                  isSubjectExport={isSubjectExport}
                  setIsSubjectExport={setIsSubjectExport}
                />
              ) || undefined
            }
            exportComp={
              (
                <ExportData
                  allData={data?.data}
                  isSubjectExport={isSubjectExport}
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

          {/* -------------------------Resource Persons--------------------------- */}
          <div className="w-full grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1  mt-4 gap-4">
            {isValidating ? (
              <ProjectSkeleton i={data?.data?.length || 8} />
            ) : data?.data?.length >= 1 ? (
              data?.data?.map((item: any, i: number) => (
                <ResourcePersonCard
                  designation={item?.designation}
                  exportEmailId={item?.exportEmailId}
                  mobileNo={item?.mobileNo}
                  nameOfOrganization={item?.nameOfOrganization}
                  nameOfResourcePerson={item?.nameOfResourcePerson}
                  photoPath={item?.photoPath}
                  photoUrl={item?.photoUrl}
                  profile={item?.profile}
                  subjectExport={item?.subjectExport}
                  resourcePersonId={item?._id}
                  key={i}
                  mainMutate={mutate}
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
          {/* -----------------------------Pagination----------------------------- */}
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

export default withProtectedAdmin(ManageResourcePerson);
const ExportData = ({
  isSubjectExport,
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
  isSubjectExport: string;
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
  const { mutate } = useFetch();
  const [selectAll, setSelectAll] = useState(false);
  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];

  const exportFields = [
    { key: "nameOfResourcePerson", value: "Name of Resource Person" },
    { key: "designation", value: "Designation" },
    { key: "nameOfOrganization", value: "Name of Organization" },
    { key: "subjectExpert", value: "Subject Expert" },
    { key: "exportEmailId", value: "Expert Email ID" },
    { key: "mobileNo", value: "Mobile Number" },
    { key: "profile", value: "Profile" },
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
          `person-resource/export?downloadType=json&perPage=${selectedRange}&pageNo=1` +
          (searchTitle ? `&search=${searchTitle}` : "") +
          (isSubjectExport ? `&subjectExport=${isSubjectExport}` : "") +
          (selectedIds?.length
            ? selectedIds?.reduce((acc, item) => {
                return acc + `&exportIds=${item}`;
              }, ``)
            : "" + `&fields=photoUrl&fields=nameOfResourcePerson`),

        method: "GET",
      });

      if (response?.status !== 200) throw new Error("Zip download failed");

      const simplifyData = response?.data?.data?.data?.filter(
        (item: any) => item?.photoUrl?.length
      );

      downloadZipFile(
        (simplifyData || [])?.map((item: any, innerIndex: number) => ({
          url: item?.photoUrl,
          name: `${item?.nameOfResourcePerson}`,
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
        `person-resource/export?perPage=${selectedRange}&pageNo=1` +
        (searchTitle ? `&search=${searchTitle}` : "") +
        (isSubjectExport ? `&subjectExport=${isSubjectExport}` : "") +
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
            (!selectedValues?.length || !type?.length || selectedRange === 0)
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
  isSubjectExport,
  setIsSubjectExport,
}: {
  isSubjectExport: string;
  setIsSubjectExport?: Dispatch<SetStateAction<string>>;
}) => {
  const abc = [
    { key: "1", title: "YES", value: "true" },
    { key: "2", title: "NO", value: "false" },
  ];
  const subjectExportArr = [
    {
      key: 1,
      label: "Industry",
      value: "Industry",
    },
    {
      key: 2,
      label: "Start-up",
      value: "Start-Up",
    },
    {
      key: 3,
      label: "Academic",
      value: "Academic",
    },
    {
      key: 4,
      label: "NGO",
      value: "NGO",
    },
    {
      key: 5,
      label: "Corporate",
      value: "Corporate",
    },
  ];

  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* <Divider /> */}

      {/* --------------------------------Filter By Subject Expert----------------------------------- */}
      <Divider />
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Subject Expert
          </h3>
        </div>
        <Divider />
        {subjectExportArr?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={isSubjectExport === item?.value}
              onClick={() =>
                setIsSubjectExport &&
                setIsSubjectExport((prev) =>
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
    </div>
  );
};
