import {
  AddBox,
  DoneAll,
  Download,
  Pending,
  UploadFile,
} from "@mui/icons-material";
import { Button } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Checkbox,
  ClickAwayListener,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Avatar,
} from "@mui/material";
import { MoneyFormat, downloadFile, notify } from "utils";
import Lottie from "components/core/ClientLottie";
import { FEE } from "assets/animations";
type FeeType = {
  data: {
    _id: string;
    userId: string;
    feesId: string;
    fee: string;
    feeType: number;
    startDate: number;
    endDate: number;
    isPaid: boolean;
    batchId: string;
    batch: string;
    displayName: string;
    email: string;
    photoUrl: string;
    gender: string;
    totalPaid: number;
  }[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const FeesList = () => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: FEE,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const { feeId } = useRouter().query;
  const { data } = useSWRFetch<FeeType>(
    `student-fee/${feeId}?downloadType=json`
  );
  const [pageNo, setPageNo] = useState(1);
  const [openExport, setOpenExport] = useState(false);
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [selectedRange, setSelectedRange] = useState<Number>(12);
  return (
    <div className="w-full">
      <PrivateLayout title="Fees | Manage">
        <div className="w-full  px-2 gap-6">
          <ClickAwayListener onClickAway={() => setOpenExport(false)}>
            <div className="mb-4 flex bg-indigo-50 p-4 rounded-md shadow-md justify-between">
              <h2 className="text-theme text-3xl font-bold ">Students List</h2>

              <div className="">
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
          <div className="flex  items-start">
            <div className="w-full flex flex-col gap-4 py-4 ">
              {data?.data?.map((item) => (
                <div
                  key={item?._id}
                  className="bg-blue-100 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 rounded-lg flex justify-between px-5 items-center"
                >
                  <div className="flex gap-4 w-full">
                    <div className="w-16 h-16 flex items-center justify-center text-theme rounded-full  bg-gray-100 mt-1">
                      <Avatar src={item?.photoUrl} className="!h-16 !w-16 ">
                        {item?.displayName?.[0]}
                      </Avatar>
                    </div>
                    <div className=" flex  gap-5 w-full justify-between ">
                      <div>
                        <h3 className="font-semibold text-md text-theme">
                          {item?.displayName}
                        </h3>
                        <h3 className="text-sm text-theme font-semibold">
                          {item?.email}
                        </h3>
                        <h3 className="text-sm text-theme font-semibold">
                          {MoneyFormat(item?.totalPaid)}
                        </h3>
                      </div>
                      <div className="my-auto">
                        {item?.isPaid ? (
                          <Button
                            className={`bg-green-600 `}
                            type="button"
                            startIcon={<DoneAll />}
                          >
                            Paid
                          </Button>
                        ) : (
                          <Button
                            className={`bg-themeSecondary`}
                            type="button"
                            startIcon={<Pending />}
                          >
                            Not Paid
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="w-full max-w-xl mt-16 hidden xl:flex ">
              <Lottie options={defaultOptions} height={400} width={400} />
            </div>
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(FeesList);
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
  allData?: any;
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
  const { feeId } = useRouter().query;
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
        `student-fee/${feeId}?perPage=${selectedRange}&pageNo=${pageNo}` +
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
