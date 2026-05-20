import MaterialTable from "@material-table/core";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
  Avatar,
  ClickAwayListener,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Typography,
  TextField,
  Skeleton,
} from "@mui/material";
import { CreateSuppliedForm } from "components/form/admin";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { InventorySupplyType } from "types/inventorysupply";
import { MoneyFormat, MuiTblOptions, downloadFile, notify } from "utils";
import { OpenInvoiceDialog } from "../dialog";
import {
  AddBox,
  Download,
  Filter,
  FilterList,
  UploadFile,
} from "@mui/icons-material";
import { Button } from "components/core";
import { useState, Dispatch, SetStateAction } from "react";
import BranchType from "types/branch";
import { InstituteType } from "types/institute";

type dataType = {
  data: InventorySupplyType[];
  pageNo: number;
  perPage: number;
  totalCount: number;
};
const StockSupplied = ({
  type,
  isSelf,
  exportType,
}: {
  type?: "ADMIN" | "STAFF";
  isSelf?: boolean;
  exportType?: "REQUEST" | "ALL";
}) => {
  const [openExport, setOpenExport] = useState(false);
  const [openFilter, setOpenFilter] = useState(false);
  const [pageNo, setPageNo] = useState(1);
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [instituteId, setInstituteId] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [productName, setProductName] = useState("");
  const [staffName, setStaffName] = useState("");
  const [departmentName, setDepartmentName] = useState("");
  let queryParameters = "";

  // Check each condition and add the corresponding query parameter
  if (instituteId) {
    queryParameters += `?instituteId=${instituteId}`;
  }

  if (categoryId) {
    queryParameters += queryParameters
      ? `&categoryId=${categoryId}`
      : `?categoryId=${categoryId}`;
  }

  if (staffName) {
    queryParameters += queryParameters
      ? `&consumer=${staffName}`
      : `?consumer=${staffName}`;
  }

  if (productName) {
    queryParameters += queryParameters
      ? `&searchTitle=${productName}`
      : `?searchTitle=${productName}`;
  }

  if (departmentName) {
    queryParameters += queryParameters
      ? `&department=${departmentName}`
      : `?department=${departmentName}`;
  }
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    type === "STAFF"
      ? `inventory/supply?myRequest=${isSelf === true}`
      : `inventory/supply${queryParameters}`
  );

  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) || 12
  );

  // console.log(data);
  return (
    <div className="w-full">
      <ClickAwayListener
        onClickAway={() => {
          setOpenExport(false);
          setOpenFilter(false);
        }}
      >
        <div className="mb-4 flex flex-col md:flex-row bg-indigo-50 p-4 rounded-md shadow-md gap-2 justify-between">
          <h2 className="text-theme text-xl md:text-3xl font-bold ">
            {type === "STAFF" ? `Supply Requests` : `Inventory Stock Supplied`}
          </h2>
          <div className="flex items-center gap-5">
            <CreateSuppliedForm
              mutate={mutate}
              userType={type}
              isSelf={isSelf}
              exportType={exportType}
            />
            {type !== "STAFF" && (
              <Button
                startIcon={<FilterList />}
                // className="!bg-gradient-to-r !from-gray-50 !text-theme !to-gray-100 !rounded-md"
                onClick={() => setOpenFilter(!openFilter)}
              >
                Filter
              </Button>
            )}
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
                exportType={exportType}
                instituteId={instituteId}
                setInstituteId={setInstituteId}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                staffName={staffName}
                setStaffName={setStaffName}
                departmentName={departmentName}
                setDepartmentName={setDepartmentName}
                productName={productName}
                setProductName={setProductName}
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
                instituteId={instituteId}
                setInstituteId={setInstituteId}
                categoryId={categoryId}
                setCategoryId={setCategoryId}
                staffName={staffName}
                setStaffName={setStaffName}
                departmentName={departmentName}
                setDepartmentName={setDepartmentName}
                productName={productName}
                setProductName={setProductName}
              />
            }
          </div>
        </div>
      </ClickAwayListener>

      <MaterialTable
        components={{
          Container: (props) => <Paper {...props} className="!bg-indigo-50" />,
        }}
        title={""}
        isLoading={isValidating}
        data={
          data?.data?.map((item, i) => ({
            ...item,
            slNo: i + 1,
            category: item?.product?.category?.title,
            timestamp: dayjs(item?.createdAt).format("MMM D, YYYY h:mm A"),
            productName: item?.product?.title,
            productPrice: item?.product?.price,
            department: item?.department?.title,
            productInstitute: item?.product?.institute?.instituteName,
          })) || []
        }
        options={{ ...MuiTblOptions(), exportMenu: [] }}
        columns={[
          {
            title: "#",
            field: "slNo",
            editable: "never",
            width: "2%",
          },
          {
            export: false,
            title: "Product Details",
            tooltip: "Product Details",
            searchable: true,
            field: "productName",
            render: ({ product }) => (
              <>
                <ListItem sx={{ paddingLeft: "0px" }}>
                  <ListItemAvatar>
                    <Avatar
                      src={product?.imageUrl}
                      alt={"img"}
                      className="!h-24  !w-20 !rounded-md !mr-4"
                    >
                      {product?.title?.[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography
                        className="!font-semibold"
                        component="span"
                        variant="body2"
                      >
                        {product?.title}
                      </Typography>
                    }
                    secondary={
                      <Typography className="!font-semibold" variant="body2">
                        {MoneyFormat(product?.price ? product?.price : 0)}
                      </Typography>
                    }
                  ></ListItemText>
                </ListItem>
              </>
            ),
          },
          // {
          //   title: "Product Image",
          //   field: "productImage",
          //   searchable: true,
          //   export: false,
          //   hidden: true,
          // },
          {
            title: "Product Name",
            field: "productName",
            searchable: true,
            export: true,
            hidden: true,
          },
          {
            title: "Price",
            field: "productPrice",
            searchable: true,
            export: true,
            hidden: true,
          },
          {
            title: "Category",
            field: "category",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Staff",
            field: "consumer",
            searchable: true,
            emptyValue: "--",
            render: ({ consumer }: any) => consumer?.displayName,
          },
          // {
          //   title: "Consumer role",
          //   field: "consumerRole",
          //   searchable: true,
          //   emptyValue: "--",
          // },
          {
            title: "Request Quantity ",
            field: "requestQuantity",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Issued Quantity ",
            field: "issuedQuantity",
            searchable: true,
            emptyValue: "--",
          },
          {
            title: "Challan No",
            field: "challanNumber",
            searchable: true,
            emptyValue: "--",
            hidden: exportType === "REQUEST",
          },
          // {
          //   title: "Amount",
          //   field: "amount",
          //   searchable: true,
          //   emptyValue: "--",
          // },
          {
            title: "Institute Name",
            field: "department",
            searchable: true,
            emptyValue: "--",
            render: ({ college, productInstitute }: any) =>
              isSelf ? productInstitute : college?.instituteName,
          },
          {
            title: "Purchased Department",
            field: "department",
            searchable: true,
            emptyValue: "--",
            render: ({ department }) => department,
          },
          {
            title: "Status",
            field: "orderStatus",
            searchable: true,
            emptyValue: "--",
            lookup: {
              ORDER_REQUEST: "PENDING",
              INITIATED: "INITIATED",
              PROCESSING: "PROCESSING",
              DELIVERED: "DELIVERED",
              CANCELLED: "CANCELLED",
            },
          },

          {
            title: "Created At",
            field: "timestamp",
            emptyValue: "--",
            // render: ({ suppliedDate }: any) =>
            //   dayjs(suppliedDate).format("MMM D, YYYY h:mm A"),
          },
          {
            title: "",
            field: "",
            render: ({ _id, orderStatus }) =>
              orderStatus === "DELIVERED" && <OpenInvoiceDialog _id={_id} />,
            // render: ({ suppliedDate }: any) =>
            //   dayjs(suppliedDate).format("MMM D, YYYY h:mm A"),
          },
          // {
          //   title: "Action",
          //   export: false,
          //   render: (rowData) => (
          //     <div className="flex items-center rounded-lg border w-fit overflow-hidden ">
          //       <DownloadReportDialog data={rowData} />
          //     </div>
          //   ),
          // },
        ]}
        // editable={{
        //   onRowUpdate: async (newData, oldData) => {
        //     try {
        //       const response = await department({
        //         path: `inventory/supply/${oldData?._id}`,
        //         method: "PUT",
        //         body: JSON.stringify({
        //           ...newData,
        //         }),
        //         isFormData: true,
        //       });

        //       if (response?.data?.error) {
        //         notify.error(response?.data?.error);
        //         return;
        //       }
        //       mutate();
        //       notify.success(response?.data?.message);
        //     } catch (e) {
        //       console.log(e);
        //     }
        //   },
        // }}
        actions={[
          {
            icon: "refresh",
            tooltip: "Refresh Data",
            isFreeAction: true,
            onClick: () => mutate(),
          },
        ]}
      />
    </div>
  );
};

export default StockSupplied;

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
  exportType,
  instituteId,
  setInstituteId,
  categoryId,
  setCategoryId,
  staffName,
  setStaffName,
  productName,
  setProductName,
  departmentName,
  setDepartmentName,
}: {
  productName?: string;
  setProductName: Dispatch<SetStateAction<string>>;
  instituteId?: string;
  setInstituteId: Dispatch<SetStateAction<string>>;
  departmentName?: string;
  setDepartmentName: Dispatch<SetStateAction<string>>;
  staffName?: string;
  setStaffName: Dispatch<SetStateAction<string>>;
  categoryId?: string;
  setCategoryId: Dispatch<SetStateAction<string>>;
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
  exportType?: string;
}) => {
  const [selectAll, setSelectAll] = useState(false);

  const marks = [
    { value: 0, label: "0" },
    { value: 30, label: "30" },
    { value: 50, label: "50" },
    { value: totalStudents || 1000, label: `${totalStudents || 1000}` },
  ];

  const exportFields = [
    { key: "productName", value: "Product Name" },
    { key: "price", value: "Price" },
    { key: "category", value: "Category" },
    { key: "requestQuantity", value: "Request Quantity" },
    // { key: "purchasedDepartment", value: "Purchased Department" },
    { key: "department", value: "Department" },
    { key: "college", value: "College" },
    { key: "consumer", value: "Consumer" },
    { key: "quantity", value: "Quantity" },
    { key: "initiatedBy", value: "Initiated By" },
    { key: "orderStatus", value: "Order Status" },
  ];
  if (exportType !== "REQUEST") {
    exportFields.push({ key: "challanNumber", value: "Challan Number" });
    exportFields.push({ key: "remark", value: "Remark" });
  }
  const downloadType = ["pdf", "csv", "excel"];

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
        exportType === "REQUEST"
          ? `inventory/supply/export?perPage=${selectedRange}&pageNo=${pageNo}&myRequest=true` +
            (downloadType ? `&downloadType=${type}` : "") +
            (selectedValues?.length
              ? selectedValues?.reduce((acc, item) => {
                  return acc + `&fields=${item}`;
                }, ``)
              : "")
          : `inventory/supply/export?perPage=${selectedRange}&pageNo=${pageNo}` +
            (instituteId ? `&instituteId=${instituteId}` : "") +
            (categoryId ? `&categoryId=${categoryId}` : "") +
            (staffName ? `&consumer=${staffName}` : "") +
            (productName ? `&searchTitle=${productName}` : "") +
            (departmentName ? `&department=${departmentName}` : "") +
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
    </div>
  );
};
const SearchFilter = ({
  instituteId,
  setInstituteId,
  categoryId,
  setCategoryId,
  staffName,
  setStaffName,
  productName,
  setProductName,
  departmentName,
  setDepartmentName,
}: {
  productName?: string;
  setProductName: Dispatch<SetStateAction<string>>;
  instituteId?: string;
  setInstituteId: Dispatch<SetStateAction<string>>;
  departmentName?: string;
  setDepartmentName: Dispatch<SetStateAction<string>>;
  staffName?: string;
  setStaffName: Dispatch<SetStateAction<string>>;
  categoryId?: string;
  setCategoryId: Dispatch<SetStateAction<string>>;
}) => {
  // console.log("instituteId-->", instituteId);
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);
  const [categoryPageNo, setCategoryPageNo] = useState(1);
  const [publicationPage, setPublication] = useState(1);
  const [authorPage, setAuthorPage] = useState(1);
  const [institutePage, setInstitutePage] = useState(1);
  // const { user } = useAuth();

  const { data: author, isValidating: authorLoading } = useSWRFetch<dataType>(
    `author?perPage=5&pageNo=${authorPage}`
  );
  const { data: publication, isValidating: publicationLoading } =
    useSWRFetch<dataType>(`publication?perPage=5&pageNo=${publicationPage}`);

  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    `batch?perPage=5&pageNo=${pageNo}&session=true&course=true&branch=true&session=true`
  );

  const { data: course, isValidating: courseLoading } = useSWRFetch<any>(
    `course?perPage=5&pageNo=${coursePageNo}`
  );
  const { data: branch, isValidating: branchLoading } = useSWRFetch<any>(
    `branch?perPage=5&pageNo=${branchPageNo}`
  );
  const { data: inventoryCategory, isValidating: categoryLoading } =
    useSWRFetch<any>(`inventory/category?perPage=5&pageNo=${categoryPageNo}`);
  // console.log("inventoryCategory-->", inventoryCategory);

  const { data: institute, isValidating: instituteLoading } = useSWRFetch<{
    data: InstituteType[];
    isLastChunk: boolean;
  }>(`institute?perPage=5&pageNo=${institutePage}`);
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Institute
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {instituteLoading ? (
          <Skeleton animation="wave" />
        ) : (
          institute?.data?.map((item: any) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === instituteId}
                onClick={() =>
                  setInstituteId(item?._id === instituteId ? "" : item?._id)
                }
              />
              <h3 className="font-medium  tracking-wide text-sm">
                {item?.instituteName}
              </h3>
            </div>
          ))
        )}
        <div className="w-full flex items-center justify-between py-4 ">
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
        </div>
      </div>
      <Divider />

      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Category
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {categoryLoading ? (
          <Skeleton animation="wave" />
        ) : (
          inventoryCategory?.data?.map((item: BranchType) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={item?._id === categoryId}
                onClick={() =>
                  setCategoryId(item?._id === categoryId ? "" : item?._id)
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
            onClick={() =>
              setCategoryPageNo((prev) => (prev > 1 ? prev - 1 : 1))
            }
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {categoryPageNo}
          </span>
          <button
            disabled={inventoryCategory?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setCategoryPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div>
      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Product
        </h3>
      </div>
      <Divider />

      <div className="flex flex-col gap-1">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setProductName(e.target.value)}
        />
      </div>

      <Divider />

      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Staff Name
        </h3>
      </div>
      <Divider />

      <div className="flex flex-col gap-1">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setStaffName(e.target.value)}
        />
      </div>

      <Divider />
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Department
        </h3>
      </div>
      <Divider />

      <div className="flex flex-col gap-1">
        <TextField
          size="small"
          variant="outlined"
          placeholder="Search"
          onChange={(e) => setDepartmentName(e.target.value)}
        />
      </div>

      <Divider />
    </div>
  );
};
