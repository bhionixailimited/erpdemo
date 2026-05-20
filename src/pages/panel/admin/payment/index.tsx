import {
  AddBox,
  CurrencyRupee,
  Download,
  Money,
  UploadFile,
} from "@mui/icons-material";
import {
  Slider,
  ClickAwayListener,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Skeleton,
  Checkbox,
  Divider,
} from "@mui/material";
import { IncomingFinance, OutgoingFinance } from "components/admin";
import { AddFinanceDialog, AddLeaveDialog } from "components/admin/dialog";
import { FinanceSkeleton } from "components/admin/skeleton";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Dispatch, SetStateAction, useState } from "react";
import { CSVLink } from "react-csv";
import { FinanceType } from "types/finance";
import { MoneyFormat, downloadFile, notify } from "utils";
const recent_debit = [
  {
    id: 1,
    amount: 520000,
    paymentName: "For Construction",
  },
  {
    id: 2,
    amount: 15000,
    paymentName: "For Exam",
  },
  {
    id: 3,
    amount: 5000,
    paymentName: "For Annual Function",
  },
  {
    id: 4,
    amount: 15000,
    paymentName: "For Salary",
  },
  {
    id: 5,
    amount: 250000,
    paymentName: "For Books",
  },
  {
    id: "1fsdgf",
    amount: 520000,
    paymentName: "For Construction",
  },
  {
    id: "fdsf",
    amount: 15000,
    paymentName: "For Exam",
  },
  {
    id: "3xzd",
    amount: 5000,
    paymentName: "For Annual Function",
  },
  {
    id: "4dszd",
    amount: 15000,
    paymentName: "For Salary",
  },
  {
    id: "5vgvz",
    amount: 250000,
    paymentName: "For Books",
  },
];
const recent_payment = [
  {
    id: 1,
    amount: 520000,
    paymentName: "Admission Fees",
  },
  {
    id: 2,
    amount: 15000,
    paymentName: "From Inventory",
  },
  {
    id: 3,
    amount: 5000,
    paymentName: "From Grants",
  },
  {
    id: 4,
    amount: 15000,
    paymentName: "From Inventory",
  },
  {
    id: 1,
    amount: 520000,
    paymentName: "Admission Fees",
  },
  {
    id: 2,
    amount: 15000,
    paymentName: "From Inventory",
  },
  {
    id: 3,
    amount: 5000,
    paymentName: "From Grants",
  },
  {
    id: 4,
    amount: 15000,
    paymentName: "From Inventory",
  },
  {
    id: 5,
    amount: 250000,
    paymentName: "Admission Fees",
  },
  {
    id: 6,
    amount: 15000,
    paymentName: "From Inventory",
  },
  {
    id: 7,
    amount: 250000,
    paymentName: "Admission Fees",
  },
];
type dataType = {
  data: FinanceType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const ViewPayment = () => {
  const [openExport, setOpenExport] = useState(false);
  const [financeType, setFinanceType] = useState("");
  const [pageNo, setPageNo] = useState(1);
  const [creditPageNo, setCreditPageNo] = useState(1);
  //&perPage=12 ---- if necessasry
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `finance?type=DEBIT&pageNo=${pageNo}`
  );
  //&perPage=12 ---- if necessasry
  const {
    data: credit,
    isValidating: creditValidating,
    mutate: creditMutate,
  } = useSWRFetch<dataType>(`finance?type=CREDIT&pageNo=${creditPageNo}`);
  const [selectedRange, setSelectedRange] = useState<Number>(
    (financeType === "DEBIT"
      ? data?.perPage && data?.perPage
      : credit?.perPage) || 12
  );
  const [downloadType, setDownloadType] = useState("excel");

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const headers = [
    { label: "Title", key: "title" },
    { label: "Finance Type", key: "financeType" },
    { label: "Amount", key: "amount" },
    { label: "Created By", key: "created" },
    { label: "Timestamp", key: "createdTime" },
  ];

  return (
    <div className="w-full">
      <PrivateLayout title="Payment | View">
        <div className="m-auto md:px-5 md:py-4">
          <ClickAwayListener onClickAway={() => setOpenExport(false)}>
            <div>
              <div className="mb-4 flex flex-col md:flex-row bg-indigo-50 p-4 rounded-md shadow-md justify-between gap-2">
                <h2 className="text-theme text-3xl font-bold ">
                  Finance Details
                </h2>
                <div className="flex flex-col md:flex-row gap-3 ">
                  {/* <CSVLink
                filename="incoming-finance.csv"
                headers={headers}
                data={
                  (credit?.data?.length &&
                    credit?.data?.map((item) => {
                      return {
                        ...item,
                        created: item?.createdBy?.email,
                        createdTime: new Date(item?.createdAt),
                      };
                    })) ||
                  []
                }
              >
                <Button
                  disabled={!credit?.data?.length}
                  startIcon={<Download />}
                >
                  Incoming Funds
                </Button>
              </CSVLink>
              <CSVLink
                filename="outgoing-finance.csv"
                headers={headers}
                data={
                  (data?.data?.length &&
                    data?.data?.map((item) => {
                      return {
                        ...item,
                        created: item?.createdBy?.email,
                      };
                    })) ||
                  []
                }
              >
                <Button disabled={!data?.data?.length} startIcon={<Download />}>
                  Outgoing Funds
                </Button>
              </CSVLink> */}
                  <AddFinanceDialog
                    mutate={mutate}
                    creditMutate={creditMutate}
                  />
                  <Button
                    startIcon={<UploadFile />}
                    // className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                    onClick={() => setOpenExport(!openExport)}
                  >
                    Export
                  </Button>
                </div>
              </div>
              <div
                className={`fixed top-0 w-fit z-[9999] right-0 transition-all ease-in-out duration-300 h-screen bg-white max-w-[80vw] md:min-w-[30rem] ${
                  openExport ? "translate-x-0" : "translate-x-[120%]"
                } `}
              >
                {
                  <ExportData
                    setFinanceType={setFinanceType}
                    financeType={financeType}
                    setType={setDownloadType}
                    type={downloadType}
                    selectedValues={selectedValues}
                    setSelectedValues={setSelectedValues}
                    selectedRange={selectedRange as number}
                    setSelectedRange={setSelectedRange}
                    totalStudents={
                      financeType === "DEBIT"
                        ? data?.totalCount
                        : financeType === "CREDIT"
                        ? credit?.totalCount
                        : data?.totalCount && data?.totalCount + 100
                    }
                    pageNo={financeType === "DEBIT" ? pageNo : creditPageNo}
                  />
                }
              </div>
            </div>
          </ClickAwayListener>
          <div className="flex flex-col lg:flex-row gap-5 items-start ">
            <div className="w-full md:px-2">
              <h2 className="text-xl font-semibold mb-2 text-theme ">
                <Money className="text-4xl mr-1 ml-2" /> Incoming Funds
              </h2>
              <div className="bg-indigo-50 rounded-xl mt-2 pt-2 max-h-screen overflow-y-scroll">
                {creditValidating ? (
                  <FinanceSkeleton i={10} />
                ) : credit?.data?.length ? (
                  credit?.data?.map((item) => (
                    <IncomingFinance
                      createdAt={item?.createdAt}
                      key={item?._id}
                      amount={item?.amount}
                      mutate={creditMutate}
                      paymentName={item?.title}
                      id={item?._id}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center p-2 text-gray-400">
                    <small>No Incoming Funds Available</small>
                  </div>
                )}
                {/* -----------------------Pagination-------------------------- */}
                {/* <div className="w-full flex items-center justify-center py-4">
                  <Pagination
                    count={Math.ceil(
                      Number(credit?.totalCount || 1) /
                        Number(credit?.perPage || 1)
                    )}
                    onChange={(e, v: number) => setCreditPageNo(v)}
                    variant="outlined"
                    color="primary"
                  />
                </div> */}
              </div>
            </div>
            <div className="w-full  ">
              <h2 className="text-xl font-semibold mb-2 text-theme md:px-2">
                <Money className="text-4xl mr-1 ml-2" />
                Outgoing Funds
              </h2>
              <div className="bg-indigo-50 rounded-xl mt-2 pt-2 max-h-screen overflow-y-scroll">
                {isValidating ? (
                  <FinanceSkeleton i={10} />
                ) : data?.data?.length ? (
                  data?.data?.map((item) => (
                    <OutgoingFinance
                      createdAt={item?.createdAt}
                      key={item?._id}
                      amount={item?.amount}
                      paymentName={item?.title}
                      id={item?._id}
                      mutate={mutate}
                    />
                  ))
                ) : (
                  <div className="flex items-center justify-center p-2 text-gray-400">
                    <small>No Outgoing Funds Available</small>
                  </div>
                )}
                {/* -----------------------Pagination-------------------------- */}
                {/* <div className="w-full flex items-center justify-center py-4">
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
            </div>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ViewPayment);
const exportFields = [
  { key: "_id", value: "Id" },
  { key: "title", value: "Title" },
  { key: "createdBy", value: "Created By" },
  { key: "amount", value: "Amount" },
  { key: "financeType", value: "Finance Type" },
  { key: "createdAt", value: "Created At" },
];
const downloadType = ["pdf", "excel"];
const ExportData = ({
  financeType,
  setFinanceType,
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
  financeType: string;
  setFinanceType: Dispatch<SetStateAction<string>>;
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
  const fundType = ["CREDIT", "DEBIT"];
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
        `finance/export?perPage=${selectedRange}&pageNo=${pageNo}&type=${financeType}` +
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
            Choose fund type
          </h3>
        </div>
        <div className="w-full flex px-3.5 gap-2  pb-2">
          <RadioGroup
            name="type"
            value={financeType}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setFinanceType(event.target.value);
            }}
            row
          >
            {fundType.map((option) => (
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
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Course
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {courseLoading ? (
          <Skeleton animation="wave" />
        ) : (
          course?.data?.map((item: CourseType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === courseId}
                onClick={() =>
                  setCourseId(item?._id === courseId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setCoursePageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {coursePageNo}
          </span>
          <button
            disabled={course?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setCoursePageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Branch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {branchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          branch?.data?.map((item: BranchType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === branchId}
                onClick={() =>
                  setBranchId(item?._id === branchId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.title}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white "
            onClick={() => setBranchPageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {branchPageNo}
          </span>
          <button
            disabled={branch?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setBranchPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
      {/* <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Status
        </h3>
      </div>
      <Divider />

      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={completed === false}
            onClick={() =>
              setCompleted((prev) => (prev === false ? undefined : false))
            }
          />
          <h3 className="font-medium  tracking-wide text-sm">Ongoing</h3>
        </div>
        <div className="flex items-center gap-4">
          <Checkbox
            size="small"
            checked={completed === true}
            onClick={() => setCompleted((prev) => (prev ? undefined : true))}
          />
          <h3 className="font-medium  tracking-wide text-sm">Completed</h3>
        </div>
      </div> */}

      {/* <Divider /> */}
    </div>
  );
};
