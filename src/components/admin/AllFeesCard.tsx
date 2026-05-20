import { Button, Empty } from "components/core";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { ScheduleExamSkeleton } from "./skeleton";
import { downloadFile, notify } from "utils";
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
import { Dispatch, SetStateAction, useState } from "react";
import FeesCard from "components/cards/FeesCard";
import { AddFeesDialog } from "./dialog";
import BatchType from "types/batch";

type Props = {
  title: string;
  feeName: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
};

type Student = string; // Assuming student is represented by an ID (string)

type Batch = {
  _id: string;
  branch: string;
  course: string;
  session: string;
  isBatchCompleted: boolean;
};

type Fee = {
  _id: string;
  amount: number;
  title: string;
  feeType: string;
};

type ObjectWithFees = {
  amount: number;
  batch: Batch;
  day: number;
  endDate: string;
  feeType: string;
  fees: Fee;
  isSingleUser: boolean;
  month: number;
  pendingUsers: number;
  startDate: string;
  students: Student[];
  totalAmountCollected: number;
  totalPaid: number;
  year: number;
};

type YourObjectType = {
  _id: { fee: string; batch: string; startDate: string; endDate: string };
  amount: number;
  batch: BatchType;
  day: number;
  endDate: string;
  feeType: string;
  fees: Fee;
  isSingleUser: boolean;
  month: number;
  pendingUsers: number;
  startDate: string;
  students: Student[];
  totalAmountCollected: number;
  totalPaid: number;
  year: number;
};

type dataType = {
  data: YourObjectType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
export default function AllFeesCard() {
  const [pageNo, setPageNo] = useState(1);
  //perPage=8& ---- if necessasry
  const {
    data: fee,
    isValidating,
    mutate,
  } = useSWRFetch<dataType>(`student-fee?pageNo=${pageNo}`);

  return (
    <>
      <div className="w-full p-4 gap-6">
        {/* <div className="w-full col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-6 2xl:col-span-6">
          <h3 className="font-semibold tracking-wide px-4  text-theme  text-xl ">
            <Money className="text-4xl" /> Set Student Fees
          </h3>
          <SetStudentFeesForm mutate={mutate} />
        </div> */}
        {/* <ClickAwayListener onClickAway={() => setOpenExport(false)}> */}
        <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between">
          <h2 className="text-theme text-3xl font-bold ">
            All Batches Fees List
          </h2>

          <div className="">
            <AddFeesDialog feeName="Add" mutate={mutate} />
          </div>
        </div>

        <div className="w-full  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 mt-7 gap-4 ">
          {isValidating ? (
            <ScheduleExamSkeleton i={8} />
          ) : fee?.data && fee?.data?.length > 0 ? (
            fee?.data?.map((item, i: number) => (
              <div key={item?._id?.fee + i} className={""}>
                <FeesCard
                  _id={item?._id}
                  name={item?.fees?.title}
                  role={`${item?.batch?.course?.title} ${
                    item?.batch?.branch?.title || ""
                  } (${item?.batch?.session?.title})`}
                  money={item?.amount || 0}
                  feeType={item?.feeType}
                  joinDate={
                    item?.feeType === "ONETIME"
                      ? `${dayjs(item?.startDate).format("ll")} - ${dayjs(
                          item?.endDate
                        ).format("ll")}`
                      : item?.feeType === "RECURRING"
                      ? `${dayjs(item?.startDate).format("MMMM D")} - ${dayjs(
                          item?.endDate
                        ).format("MMMM D")}`
                      : ""
                  }
                  totalStudent={item?.students?.length}
                  city={item?.totalPaid?.toString()}
                  totalAmount={item?.totalAmountCollected}
                  mutate={mutate}
                  priceBeforeDiscount={item?.fees?.amount}
                />
              </div>
            ))
          ) : (
            <div className="col-span-12 ">
              <Empty title={"No Fees Found"} />
            </div>
          )}
        </div>
        {/* -----------------------Pagination-------------------------- */}
        {/* <div className="w-full flex items-center justify-center py-10">
          <Pagination
            count={Math.ceil(
              Number(fee?.totalCount || 1) / Number(fee?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        </div> */}
        {/* </ClickAwayListener> */}
      </div>
    </>
  );
}

const exportFields = [
  { key: "_id", value: "Id" },
  { key: "userId", value: "User Id" },
  { key: "feesId", value: "Fees Id" },
  { key: "fee", value: "Fee" },
  { key: "feeType", value: "Fee Type" },
  { key: "startDate", value: "Start Date" },
  { key: "endDate", value: "End Date" },
  { key: "isPaid", value: "Is Paid" },
  { key: "batchId", value: "Batch Id" },
  { key: "batch", value: "Batch" },
  { key: "amount", value: "Amount" },
  { key: "displayName", value: "Display Name" },
  { key: "email", value: "Email" },
  { key: "gender", value: "Gender" },
  { key: "totalPaid", value: "Total Paid" },
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
  allData,
  courseId,
  branchId,
  batchId,
  pageNo,
  searchTitle,
  studentType,
}: {
  allData: any;
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
        `student-fee/${allData?.fees?._id}_${allData?.startDate}?perPage=${selectedRange}&pageNo=${pageNo}` +
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
            <h3 className="font-medium  tracking-wide text-lg">
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
