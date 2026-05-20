import {
  AddBox,
  Delete,
  Download,
  Edit,
  FilterList,
  UploadFile,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Tooltip,
  Pagination,
  ClickAwayListener,
  TextField,
  Skeleton,
  Autocomplete,
  Select,
  Chip,
  MenuItem,
} from "@mui/material";
import { FileIcon } from "assets/static-icon";
import { AddAccreditationAffiliationDialog } from "components/admin/dialog";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { Button, Empty } from "components/core";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { downloadFile, downloadZipFile, notify } from "utils";
import DocumentSideDrawer from "components/admin/dialog/DocumentSideDrawer";
import DocumentAddDialog from "components/admin/dialog/DocumentAddDialog";
import dayjs from "dayjs";
import { mutate } from "swr";

const AccreditationAffiliation = () => {
  const [openExport, setOpenExport] = useState(false);
  const { user } = useAuth();
  const [pageNo, setPageNo] = useState(1);
  const [selectedData, setSelectedData] = useState<any>();
  const [assetId, setAssetId] = useState("");
  const [documentId, setDocumentId] = useState("");
  const [accrecationId, setAccrecationId] = useState("");
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [approvalLetterDate, setApprovalLetterDate] = useState<string[]>([]);
  const [openFilter, setOpenFilter] = useState(false);
  const [societyName, setSocietyName] = useState("");
  const [accType, setAccType] = useState("");
  const [search, setSearch] = useState("");
  //perPage=8& ----if necessary
  const {
    data: accreditation,
    isValidating,
    mutate: accreditationMutate,
  } = useSWRFetch<any>(
    `accreditation?pageNo=${pageNo}` +
      (societyName ? `&nameOfSociety=${societyName}` : "") +
      (accType ? `&type=${accType}` : "") +
      (user?.instituteId?._id ? `&instituteId=${user?.instituteId?._id}` : "") +
      (search ? `&searchTitle=${search}` : "") +
      (approvalLetterDate?.length && approvalLetterDate?.length > 0
        ? approvalLetterDate
            ?.map((year) => `&accreditationApprovalLetterDate=${year}`)
            .join("")
        : "")
  );
  const [selectedRange, setSelectedRange] = useState<number>(
    accreditation?.totalCount > 0
      ? accreditation?.perPage && accreditation?.perPage
      : 0
  );

  const { mutate } = useFetch();
  const deleteData = async (id: string) => {
    try {
      const response = await mutate({
        path: `accreditation/${id}`,
        method: "DELETE",
        // isFormData: true,
        // body: formData,
      });
      if (response?.status !== 200) throw new Error(response?.data?.message);
      accreditationMutate();
      notify.success(response?.data?.message);
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong."
      );
    }
  };
  // Define state to keep track of selected items
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
    <PrivateLayout>
      <section className="px-4 py-2">
        <ClickAwayListener
          onClickAway={() => {
            setOpenExport(false);
            setOpenFilter(false);
          }}
        >
          <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between flex-col gap-2 md:flex-row">
            <h2 className="text-theme text-3xl font-bold ">
              Accreditation & Affiliation
            </h2>
            <div className="flex gap-2">
              <AddAccreditationAffiliationDialog
                selectedData={selectedData}
                setSelectedData={setSelectedData}
                accreditationMutate={accreditationMutate}
                // updateId={updateId}
              />
              <Button
                startIcon={<FilterList />}
                // className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filter
              </Button>
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
                  search={search}
                  setType={setDownloadType}
                  type={downloadType}
                  selectedRange={selectedRange}
                  setSelectedRange={setSelectedRange}
                  setSelectedValues={setSelectedValues}
                  selectedValues={selectedValues}
                  pageNo={pageNo}
                  totalStudents={accreditation?.totalCount}
                  selectedIds={selectedItems}
                  setSelectedIds={setSelectedItems}
                  accType={accType}
                  societyName={societyName}
                  allData={accreditation?.data}
                  approvalLetterDate={approvalLetterDate}
                />
              }
            </div>
            <div
              className={`fixed top-0 w-fit z-[9999] right-0 transition-all ease-in-out duration-300 h-screen bg-white max-w-[80vw] md:min-w-[30rem] ${
                openFilter ? "translate-x-0" : "translate-x-[120%]"
              } `}
            >
              {
                <SearchFilter
                  societyName={societyName}
                  setSocietyName={setSocietyName}
                  accType={accType}
                  setAccType={setAccType}
                  search={search}
                  setSearch={setSearch}
                  approvalLetterDate={approvalLetterDate}
                  setApprovalLetterDate={setApprovalLetterDate}
                />
              }
            </div>
          </div>
        </ClickAwayListener>

        <div>
          <DocumentSideDrawer
            assetId={assetId}
            setAssetId={setAssetId}
            setDocumentId={setDocumentId}
            setAccrecationId={setAccrecationId}
          />
        </div>
        <div>
          <DocumentAddDialog
            setDocumentId={setDocumentId}
            documentId={documentId}
            setAccrecationId={setAccrecationId}
            accrecationId={accrecationId}
            accreditationMutate={accreditationMutate}
          />
        </div>
        <div className="grid md:grid-cols-3 grid-cols-4 gap-6">
          {isValidating ? (
            <>
              {Array(9)
                .fill(0)
                .map((item, index) => (
                  <div className="bg-gray-500 h-52 w-full" key={index}></div>
                ))}
            </>
          ) : accreditation?.data?.length ? (
            accreditation?.data?.map((item: any, i: number) => (
              <div
                key={item?._id}
                className="relative w-full rounded-xl flex space-y-4 flex-col gap-2 tracking-wide shadow-x bg-gradient-to-r from-rose-100 to-teal-100 pb-2"
              >
                <div className="relative ">
                  <div className="absolute right-0 rounded-tl-lg top-24 bg-gradient-to-r from-rose-100 to-teal-100 p-2 shadow-lg shadow-slate-300">
                    <div className="flex">
                      <Tooltip title="Details">
                        <Avatar
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
                          sx={{
                            mr: ".1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                            width: 30,
                            height: 30,
                          }}
                          onClick={() => setSelectedData(item?._id)}
                        >
                          <Edit
                            sx={{ padding: "0px !important" }}
                            fontSize="small"
                          />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <Avatar
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                          sx={{
                            mr: "0.1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                            width: 30,
                            height: 30,
                          }}
                          onClick={() => deleteData(item?._id)}
                        >
                          <Delete
                            sx={{ padding: "0px !important" }}
                            fontSize="small"
                          />
                        </Avatar>
                      </Tooltip>
                      <Tooltip title="View Certificates">
                        <Avatar
                          variant="rounded"
                          className="!mr-0.5 !ml-0.5 !cursor-pointer  !bg-yellow-700 !p-0"
                          sx={{
                            mr: "0.1vw",
                            padding: "0px !important",
                            backgroundColor: "Highlight",
                            cursor: "pointer",
                            color: "",
                            width: 30,
                            height: 30,
                          }}
                          onClick={() => {
                            // alert("View certificate");
                            setAssetId(item?._id);
                          }}
                        >
                          <Visibility
                            sx={{ padding: "0px !important" }}
                            fontSize="small"
                          />
                        </Avatar>
                      </Tooltip>
                    </div>
                  </div>

                  <div className="flex justify-center bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 py-3 rounded-t-lg w-full">
                    {item?.certificates?.length ? (
                      <div className="h-24 w-24  flex justify-center items-center text-3xl">
                        <div className="relative h-full w-full flex justify-center items-center group">
                          <img
                            className="h-full w-full object-cover"
                            src={FileIcon.src}
                            alt="Image"
                          />
                        </div>
                      </div>
                    ) : (
                      <div className="h-24 flex justify-center items-center">
                        <span className=" text-xl font-semibold text-white">
                          No Document
                        </span>
                      </div>
                    )}
                  </div>
                  <div className="px-4 bg-gradient-to-r from-rose-100 to-teal-100 ">
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Type :
                        </p>
                        <p className="text-sm md:text-base text-red-600 font-semibold">
                          {item?.type}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Name :
                        </p>
                        <p className="text-sm md:text-base text-red-600 font-semibold">
                          {item?.institute?.instituteName}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Society Name :
                        </p>
                        <p className="text-sm md:text-base text-gray-700 font-semibold">
                          {item?.nameOfSociety || "---"}
                        </p>
                      </div>
                      <div
                        className={`flex ${
                          item?.approveAuthority
                            ? "flex-col"
                            : "items-center gap-2 py-2 md:py-0"
                        }`}
                      >
                        <p className="font-semibold text-base text-blue-600">
                          Approval Authority :
                        </p>
                        <p className="text-sm md:text-base text-gray-700 break-all capitalize">
                          {item?.approveAuthority || "---"}
                        </p>
                      </div>

                      <div
                        className={`flex ${
                          item.accreditationApprovalLetter
                            ? "flex-col"
                            : "items-center gap-2 py-2 md:py-0"
                        }`}
                      >
                        <p className="font-semibold text-base text-blue-600">
                          Approval Letter Reference:
                        </p>
                        <p className="text-sm md:text-base text-gray-500 capitalize break-all">
                          {item.accreditationApprovalLetter || "---"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Approval Date:
                        </p>
                        <p className="text-sm md:text-base text-gray-700">
                          {item?.accreditationApprovalLetterDate
                            ? dayjs(
                                item?.accreditationApprovalLetterDate
                              ).format("LL")
                            : "---"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Session :
                        </p>
                        <p className="text-sm md:text-base text-gray-700">
                          {item?.session || "---"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Course :
                        </p>
                        <p className="text-sm md:text-base text-gray-700">
                          {item?.course || "---"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Number of Seats Approval :
                        </p>
                        <p className="text-sm md:text-base text-gray-700">
                          {item?.noSeatsApproval || "---"}
                        </p>
                      </div>

                      <div className="flex items-center gap-2 py-2 md:py-0">
                        <p className="font-semibold text-base text-blue-600">
                          Documents Added :
                        </p>
                        <p className="text-sm md:text-base text-gray-700">
                          {item?.certificates?.length || "0"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="absolute top-0 right-2 ">
                  <Checkbox
                    className="!text-white"
                    sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                    size="small"
                    color="warning" // Change the checkbox color to white
                    checked={selectedItems.includes(item?._id)}
                    onChange={() => handleCheckboxChange(item?._id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-12">
              <Empty title="No Data Found" />
            </div>
          )}
        </div>
        {/* -------------------------------Pagination------------------------ */}
        {/* <div className="w-full flex items-center justify-center py-10">
          <Pagination
            count={Math.ceil(
              Number(accreditation?.totalCount || 1) /
                Number(accreditation?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(AccreditationAffiliation);
const ExportData = ({
  type,
  setType,
  selectedValues,
  setSelectedValues,
  selectedRange,
  setSelectedRange,
  totalStudents,
  exportType,
  pageNo,
  selectedIds,
  setSelectedIds,
  accType,
  societyName,
  allData,
  approvalLetterDate,
  setApprovalLetterDate,
  search,
}: {
  search?: string;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedIds?: string[];
  setSelectedIds: Dispatch<SetStateAction<string[]>>;
  selectedRange?: number;
  setSelectedRange: Dispatch<SetStateAction<number>>;
  totalStudents?: number;
  pageNo?: number;
  exportType?: string;
  societyName?: string;
  accType?: string;
  allData?: any;
  approvalLetterDate?: string[];
  setApprovalLetterDate?: Dispatch<SetStateAction<string[]>>;
}) => {
  const { user } = useAuth();
  const [selectAll, setSelectAll] = useState(false);

  const { mutate } = useFetch();

  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 0, label: `${totalStudents || 0}` },
  ];

  const exportFields = [
    { key: "session", value: "Session" },
    { key: "course", value: "Course" },
    { key: "institute", value: "Institute" },
    { key: "nameOfSociety", value: "Name of Society" },
    { key: "noSeatsApproval", value: "No Seats Approval" },
    { key: "type", value: "Type" },
    {
      key: "accreditationApprovalLetterDate",
      value: "Accreditation Approval Letter Date",
    },
    {
      key: "accreditationApprovalLetter",
      value: "Approval Letter Reference",
    },
    {
      key: "approveAuthority",
      value: "Approval Authority",
    },
    {
      key: "certificatesCount",
      value: "Documents Count",
    },
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
    try {
      if (type === "document") {
        const response = await mutate({
          path:
            `accreditation/export?perPage=${selectedRange}&pageNo=1&fields=certificates` +
            (search ? `&searchTitle=${search}` : "") +
            (user?.instituteId?._id
              ? `&instituteId=${user?.instituteId?._id}`
              : "") +
            (approvalLetterDate?.length && approvalLetterDate?.length > 0
              ? approvalLetterDate
                  ?.map((year) => `&accreditationApprovalLetterDate=${year}`)
                  .join("")
              : "") +
            (accType ? `&type=${accType}` : "") +
            (societyName ? `&nameOfSociety=${societyName}` : "") +
            (selectedIds?.length
              ? selectedIds?.reduce((acc, item) => {
                  return acc + `&exportIds=${item}`;
                }, ``)
              : ""),
          method: "GET",
        });

        if (response?.status !== 200) throw new Error("Zip download failed");

        const simplifyData = response?.data?.data?.data?.filter(
          (item: any) => item?.certificates?.length
        );

        const downloadableData = simplifyData?.flatMap(
          (item: any, index: number) =>
            item?.certificates?.map((inner: any, innerIndex: number) => {
              return {
                url: inner,
                name: `${index + 1}-${innerIndex + 1}`,
              };
            })
        );

        downloadZipFile(
          simplifyData?.flatMap((item: any, index: number) =>
            item?.certificates?.map((inner: any, innerIndex: number) => {
              return {
                url: inner?.documentUrl,
                name: `${index + 1}-${innerIndex + 1}-${inner?.title}`,
              };
            })
          )
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
          `accreditation/export?perPage=${selectedRange}&pageNo=1` +
          (search ? `&searchTitle=${search}` : "") +
          (user?.instituteId?._id
            ? `&instituteId=${user?.instituteId?._id}`
            : "") +
          (approvalLetterDate?.length && approvalLetterDate?.length > 0
            ? approvalLetterDate
                ?.map((year) => `&accreditationApprovalLetterDate=${year}`)
                .join("")
            : "") +
          (accType ? `&type=${accType}` : "") +
          (societyName ? `&nameOfSociety=${societyName}` : "") +
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
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong"
      );
    }
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
            valueLabelFormat={valueLabelFormat}
            disabled={allData?.length <= 0}
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
  search,
  setSearch,
  accType,
  setAccType,
  societyName,
  setSocietyName,
  approvalLetterDate,
  setApprovalLetterDate,
}: {
  accType?: string;
  setAccType: Dispatch<SetStateAction<string>>;
  societyName?: string;
  setSocietyName: Dispatch<SetStateAction<string>>;
  search?: string;
  setSearch: Dispatch<SetStateAction<string>>;
  approvalLetterDate?: string[];
  setApprovalLetterDate: Dispatch<SetStateAction<string[]>>;
}) => {
  const societySchema = [
    { key: "1", value: "PODDAR_TRUST", label: "PODDAR TRUST" },
    { key: "2", value: "PODDAR_SANSTHAN", label: "PODDAR SANSTHAN" },
    { key: "3", value: "CAER", label: "CAER" },
  ];
  const typeSchema = [
    { key: "1", value: "ACCREDITATION", label: "ACCREDITATION" },
    { key: "2", value: "AFFILIATION", label: "AFFILIATION" },
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
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">Search</h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* <Divider /> */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Society Name
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {societySchema?.map((item: any) => (
          <div key={item?.id} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={item?.value === societyName}
              onClick={() =>
                setSocietyName(item?.value === societyName ? "" : item?.value)
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.label}
            </h3>
          </div>
        ))}
        {/* <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() =>
              setInstitutePage((prev) => (prev > 1 ? prev - 1 : 1))
            }
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {institutePage}
          </span>
          <button
            disabled={institute?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setInstitutePage((prev) => prev + 1)}
          >
            Next
          </button>
        </div> */}
      </div>
      <Divider />
      {/* -----------------------Filter By Type------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Type
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {typeSchema?.map((item: any) => (
          <div key={item?.id} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={item?.value === accType}
              onClick={() =>
                setAccType(item?.value === accType ? "" : item?.value)
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.label}
            </h3>
          </div>
        ))}
      </div>
      <Divider />
      {/*--------------------- Filter By Approval year------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Approval Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        {/* --------------------------------Filter By Date Of Expiry----------------------------------- */}
        <Autocomplete
          multiple
          options={[]}
          defaultValue={
            approvalLetterDate?.filter((item: string) => item !== null) || []
          }
          value={
            approvalLetterDate?.filter((item: string) => item !== null) || []
          }
          freeSolo
          renderInput={(params) => <TextField {...params} />}
          onChange={(_e: any, value: string[]) => {
            setApprovalLetterDate(value);
          }}
        />
      </div>
    </div>
  );
};
const accreditationAffiliationData = [
  {
    id: 1,
    instituteName: "Sample Institute 1",
    societyName: "PODDAR TRUST",
    otherCertificate: [
      {
        fileName: "Certificate1.pdf",
        fileSize: "2 MB",
      },
      {
        fileName: "Certificate2.docx",
        fileSize: "1.5 MB",
      },
    ],
    approvalAuthority: "Sample Authority 1",
    approvalLetterReference: "Approval123",
    sessionCourse: "2023 - Computer Science",
    numberOfSeatsApproval: "100",
  },
  {
    id: 2,
    instituteName: "Sample Institute 2",
    societyName: "PODDAR SANSTHAN",
    otherCertificate: [
      {
        fileName: "Certificate3.pdf",
        fileSize: "1.8 MB",
      },
    ],
    approvalAuthority: "Sample Authority 2",
    approvalLetterReference: "Approval456",
    sessionCourse: "2023 - Engineering",
    numberOfSeatsApproval: "75",
  },
  {
    id: 3,
    instituteName: "Sample Institute 3",
    societyName: "CAER",
    otherCertificate: [
      {
        fileName: "Certificate4.pdf",
        fileSize: "2.2 MB",
      },
      {
        fileName: "Certificate5.docx",
        fileSize: "1.7 MB",
      },
    ],
    approvalAuthority: "Sample Authority 3",
    approvalLetterReference: "Approval789",
    sessionCourse: "2023 - Business Administration",
    numberOfSeatsApproval: "120",
  },
];
