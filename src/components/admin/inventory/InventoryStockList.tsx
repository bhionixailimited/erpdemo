import MaterialTable from "@material-table/core";
import {
  Abc,
  Add,
  AddBox,
  ClearAll,
  Close,
  Delete,
  DesignServices,
  Download,
  RemoveRedEye,
  UploadFile,
} from "@mui/icons-material";

import {
  Pagination,
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  Avatar,
  ClickAwayListener,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
} from "@mui/material";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { useRouter } from "next/router";
import {
  Dispatch,
  SetStateAction,
  useDeferredValue,
  useRef,
  useState,
} from "react";
import Swal from "sweetalert2";
import { InventoryProductType } from "types/inventoryproduct";
import { MoneyFormat, MuiTblOptions, downloadFile, notify } from "utils";
import AddStockDrawer from "../dialog/AddStockDrawer";
import { ViewDocumentDrawer } from "../dialog";

type dataType = {
  data: InventoryProductType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const InventoryStockList = () => {
  const tableRef = useRef<any>();
  const [pageNo, setPageNo] = useState(1);

  const [openDialog, setOpenDialog] = useState(false);
  const [openABC, setOpenABC] = useState(false);
  const [abcAlphabet, setAbcAlphabet] = useState<string>("");
  const [openExport, setOpenExport] = useState(false);
  const { push } = useRouter();
  const { mutate: designation } = useFetch();
  const { mutate: fetchData, loading } = useFetch();
  const { data, isValidating, error, mutate } =
    useSWRFetch<dataType>("inventory");
  const [downloadType, setDownloadType] = useState("excel");
  const [isStock, setIsStock] = useState(false);

  const [completed, setCompleted] = useState<boolean>();
  // console.log("data-->", data);
  // console.log("data-->pageNo", data?.pageNo);
  // const { mutate } = useFetch();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const handleDelete = async (id: string) => {
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
            const response = await designation({
              path: `inventory/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            // mutate && mutate();
            tableRef?.current && tableRef?.current.onQueryChange();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleSingleExport = async (id: string) => {
    downloadFile({
      method: "GET",
      type: "excel",
      url: `inventory/${id}/export?downloadType=excel`,
    });
  };
  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.totalCount && data?.totalCount) || 0
  );
  const handleAlphabetClick = (char: any) => {
    if (abcAlphabet === char) {
      // If the clicked alphabet is the same as the selected one, deselect it.
      setAbcAlphabet("");
    } else {
      // Otherwise, select the clicked alphabet.
      setAbcAlphabet(char);
    }
  };
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"; // A to Z characters
  return (
    <div className="w-full">
      <ClickAwayListener onClickAway={() => setOpenExport(false)}>
        <div className="mb-4 flex md:flex-row flex-col bg-indigo-50 p-4 rounded-md shadow-md justify-between gap-2">
          <h2 className="text-theme text-2xl md:text-3xl font-bold ">
            Inventory Stock Details
          </h2>
          <div>
            <div className="flex gap-2">
              <button
                className="btn-primary"
                onClick={() => push(`/panel/admin/inventory/create`)}
              >
                Add New Stock
              </button>
              <div className="relative">
                <Button
                  startIcon={<Abc />}
                  // className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                  onClick={() => setOpenABC(!openABC)}
                >
                  Alphabets
                </Button>
                {openABC && (
                  <div className="absolute z-10 top-12 left-1/2 -translate-x-1/2 bg-white border border-gray-300 p-2 w-80 rounded-md flex-col">
                    <div className="flex justify-center items-center">
                      <p className="w-52 border border-gray-400 rounded-md"></p>
                      <Tooltip title="To clear alphabet">
                        <IconButton>
                          <ClearAll
                            className="!text-theme"
                            onClick={() => {
                              setAbcAlphabet("");
                              tableRef.current &&
                                tableRef.current.onQueryChange();
                            }}
                          />
                        </IconButton>
                      </Tooltip>
                      <IconButton className="">
                        <Close
                          className="!text-red-700"
                          onClick={() => setOpenABC(false)}
                        />
                      </IconButton>
                    </div>
                    <div className="grid grid-cols-5 gap-1 text-gray-600 font-semibold">
                      {alphabet.split("").map((char, index) => (
                        <div
                          key={index}
                          onClick={() => {
                            handleAlphabetClick(char);
                            tableRef.current &&
                              tableRef.current.onQueryChange();
                          }}
                          className={`cursor-pointer rounded-full flex justify-center items-center ${
                            abcAlphabet === char
                              ? "bg-green-700 text-white"
                              : "hover:bg-gray-600 hover:text-white"
                          }`}
                        >
                          {char}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
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
                setType={setDownloadType}
                type={downloadType}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                selectedRange={selectedRange as number}
                setSelectedRange={setSelectedRange}
                totalStudents={data?.totalCount}
                pageNo={pageNo}
                abcAlphabet={abcAlphabet}
              />
            }
          </div>
        </div>
      </ClickAwayListener>
      <MaterialTable
        tableRef={tableRef}
        components={{
          Container: (props) => <Paper {...props} className="!bg-indigo-50" />,
        }}
        title={""}
        isLoading={isValidating}
        data={async (query) =>
          new Promise(async (resolve, reject) => {
            const result = await fetchData({
              method: "GET",
              path: `inventory?perPage=${query.pageSize}&pageNo=${
                query.page + 1
              }${query.search ? `&searchTitle=${query.search}` : ""}${
                abcAlphabet ? `&searchAlphabet=${abcAlphabet}` : ""
              }`,
            });
            resolve({
              data:
                result?.data?.data?.data?.map((item: any, index: number) => {
                  return {
                    ...query,
                    ...item,
                    slNo: index + 1,
                    timestamp: dayjs(item?.createdAt).format(
                      "MMM D, YYYY h:mm A"
                    ),
                  };
                }) || [],
              page: result?.data?.data?.pageNo
                ? result?.data?.data?.pageNo - 1
                : 0,
              totalCount: result?.data?.data?.totalCount || 0,
            });
          }) || []
        }
        options={{
          ...MuiTblOptions(),
          //  pageSize: 10,
          // search: true,
          exportMenu: [],
          debounceInterval: 700,
        }}
        columns={[
          {
            title: "#",
            field: "slNo",
            editable: "never",
            width: "2%",
          },
          {
            export: true,
            title: "Product Details",
            tooltip: "Product Details",
            searchable: true,
            field: "productName",
            render: ({ title, imageUrl }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar
                      src={imageUrl}
                      alt={"img"}
                      className="!h-24  !w-20 !rounded-md !mr-4"
                    >
                      {title?.[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        className="!font-semibold"
                        component="span"
                        variant="body2"
                      >
                        {title}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          {
            title: "Brand",
            field: "brand",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Product Image",
            field: "productImage",
            searchable: true,
            export: true,
            hidden: true,
          },

          {
            title: "Price",
            field: "price",
            searchable: true,
            emptyValue: "--",
            render: ({ price }) => MoneyFormat(price),
          },
          {
            title: "Measurement Unit",
            field: "measurementUnit",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Stock",
            field: "quantity",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Stock Used",
            field: "stockUsed",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Category",
            field: "category",
            searchable: true,
            emptyValue: "--",
            render: ({ category }) => category?.title,
          },
          {
            title: "Supplier",
            field: "supplier",
            searchable: true,
            emptyValue: "--",
          },
          // {
          //   title: "Challan Number",
          //   field: "challanNumber",
          //   searchable: true,
          //   emptyValue: "--",
          // },
          // {
          //   title: "Status",
          //   field: "status",
          //   render: ({ status }: any) => (
          //     <small className="bg-theme text-white px-2 py-1 rounded-md">
          //       {status}
          //     </small>
          //   ),
          // },
          {
            title: "Stock Created",
            field: "createdAt",
            render: ({ createdAt }: any) =>
              dayjs(createdAt).format("MMM D, YYYY h:mm A"),
          },
          {
            title: "Action",
            export: false,
            render: (rowData) => (
              <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
                <span className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 ">
                  {/* <DesignServices className="text-green-500 " /> */}
                  {/* <a
                    href="" //"rowData?.billUpload"
                    target="_blank"
                    rel="noreferrer"
                    referrerPolicy="no-referrer"
                  > </a> */}
                  {/* <IconButton className="!bg-blue-500 !text-white"> */}
                  {/* <Tooltip title="View Document">
                    <RemoveRedEye onClick={() => setOpenDialog(true)} />
                  </Tooltip> */}

                  <ViewDocumentDrawer _id={rowData?._id} mutate={mutate} />

                  {/* </IconButton> */}
                </span>
                <AddStockDrawer _id={rowData?._id} mutate={tableRef} />
                {/* <span
                  className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
                  onClick={() => setIsStock(true)}
                >
                  <Tooltip title="Add Stock">
                    <Add className="text-green-500 " />
                  </Tooltip>
                </span> */}
                <span className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 ">
                  <Tooltip title="Export">
                    <IconButton
                      onClick={() => handleSingleExport(rowData?._id)}
                    >
                      <Download className="text-theme " />
                    </IconButton>
                  </Tooltip>
                </span>

                <span
                  className="border-r px-3 py-2 cursor-pointer bg-transparent hover:bg-green-200/50 transition-all ease-in-out duration-300 "
                  onClick={() =>
                    push(
                      `/panel/admin/inventory/create?edit=true&editId=${rowData?._id}`
                    )
                  }
                >
                  <Tooltip title="Edit Stock">
                    <DesignServices className="text-orange-500 " />
                  </Tooltip>
                </span>

                <span
                  className=" px-3 py-2 bg-transparent hover:bg-red-200/50 transition-all ease-in-out duration-300 cursor-pointer"
                  onClick={() => handleDelete(rowData?._id)}
                >
                  <Tooltip title="Delete Stock">
                    <Delete className="text-red-500" />
                  </Tooltip>
                </span>
              </div>
            ),
          },
        ]}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => tableRef.current && tableRef.current.onQueryChange(),
          },
        ]}
      />

      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <h1>Docs are here</h1>
      </Dialog>
    </div>
  );
};

export default withProtectedAdmin(InventoryStockList);

const exportFields = [
  // { key: "_id", value: "Id" },
  { key: "title", value: "Title" },
  { key: "quantity", value: "Quantity" }, //stock
  { key: "stockUsed", value: "Stock Used" }, // get from used stock quantity and not from while creating

  { key: "price", value: "Price" },
  { key: "category", value: "Category" },
  { key: "measurementUnit", value: "Measurement Unit" },
  { key: "brand", value: "Brand" },
  { key: "supplier", value: "Supplier" },
  { key: "description", value: "Description" },
];
const downloadType = ["pdf", "csv", "excel"];
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
  abcAlphabet,
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
  abcAlphabet?: string;
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
        `inventory/export?perPage=${selectedRange}&pageNo=${pageNo}` +
        (abcAlphabet ? `&searchAlphabet=${abcAlphabet}` : "") +
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

// const AddStockDrawer = ({
//   open,
//   onClose,
// }: {
//   open: boolean;
//   onClose: () => void;
// }) => {
//   return (
//     <div className="w-full">
//       <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
//         <h1>Hii</h1>
//       </Dialog>
//     </div>
//   );
// };
