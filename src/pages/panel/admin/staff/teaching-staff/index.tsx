import { AddBox, Download } from "@mui/icons-material";
import {
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Slider,
} from "@mui/material";
import { TeachingStaffDrawer } from "components/admin";
import { ScheduleExamSkeleton } from "components/admin/skeleton";
import { TeacherCards } from "components/cards";
import { AssignModuleStaff, SearchBar } from "components/common";
import { Button, Empty } from "components/core";
import { useAuth, useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import UserType from "types/user";
import { downloadFile, downloadZipFile, notify } from "utils";

type dataType = {
  data: UserType[];
  totalCount?: number;
  perPage?: number;
};
const TeachingStaffs = () => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [openDrawer, setOpenDrawer] = useState<any>(null);
  const searchTitle = useDeferredValue(searchText);
  const [downloadType, setDownloadType] = useState("excel");
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [openAssignModuleDrawer, setOpenAssignModuleDrawer] = useState(false);
  const [currentUser, setCurrentUser] = useState("");
  const [gender, setGender] = useState<string>("");
  const [caste, setCaste] = useState<string>("");
  // console.log("selectedValues-->", selectedValues);
  //&perPage=15 --- if necessary
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    `user?role=TEACHER&pageNo=${pageNo}` +
      (gender ? `&gender=${gender}` : "") +
      (caste ? `&caste=${caste}` : "") +
      (searchTitle ? `&searchTitle=${searchTitle}` : "")
  );

  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) || 12
  );
  return (
    <PrivateLayout title="Staff | Teaching Staff">
      <section className="w-full p-4">
        <AssignModuleStaff
          open={openAssignModuleDrawer}
          onClose={() => setOpenAssignModuleDrawer(false)}
          mutate={mutate}
          currentUser={currentUser}
        />
        <SearchBar
          searchText={searchTitle}
          setSearchText={setSearchText}
          filterComp={
            (
              <SearchFilter
                gender={gender}
                setGender={setGender}
                caste={caste}
                setCaste={setCaste}
              />
            ) || undefined
          }
          exportComp={
            (
              <ExportData
                gender={gender}
                setGender={setGender}
                caste={caste}
                setCaste={setCaste}
                setType={setDownloadType}
                type={downloadType}
                selectedValues={selectedValues}
                setSelectedValues={setSelectedValues}
                selectedRange={selectedRange as number}
                setSelectedRange={setSelectedRange}
                totalStudents={data?.totalCount}
                searchTitle={searchTitle}
                pageNo={pageNo}
              />
            ) || undefined
          }
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 xl:grid-cols-4">
          {isValidating ? (
            <ScheduleExamSkeleton i={data?.data?.length || 8} />
          ) : data?.data && data?.data?.length > 0 ? (
            data?.data?.map((item, index) => (
              <TeacherCards
                photoUrl={item?.photoUrl}
                key={item?._id}
                _id={item?._id}
                completedLesson={15}
                countryCode={item?.countryCode}
                email={item?.email}
                displayName={item?.displayName}
                phoneNumber={item?.phoneNumber}
                joinedAt={item?.employmentDetails?.dateOfJoining}
                caste={item?.caste}
                gender={item?.gender}
                designation={item?.employmentDetails?.designation?.title}
                mutate={mutate}
                upcomingClass={10}
                onEditClick={() => {
                  setOpenDrawer(item);
                }}
                onAssignModuleClick={() => {
                  setCurrentUser(item?._id);
                  setOpenAssignModuleDrawer(true);
                }}
              />
            ))
          ) : (
            <div className="col-span-12">
              <Empty title={"No Teaching Staffs Found"} />
            </div>
          )}
        </div>

        {/* Edit teaching staff */}
        <TeachingStaffDrawer
          open={Boolean(openDrawer)}
          onClose={() => setOpenDrawer(false)}
          data={openDrawer}
          mutate={mutate}
        />
        {/* ----------------------Pagination------------------------- */}
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
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(TeachingStaffs);
const exportFields = [
  // { key: "_id", value: "Id" },
  { key: "email", value: "Email" },
  { key: "displayName", value: "Display Name" },
  { key: "phoneNumber", value: "Phone Number" },
  { key: "countryCode", value: "Country Code" },
  { key: "caste", value: "Caste" },
  { key: "gender", value: "Gender" },
  { key: "role", value: "Role" },
  { key: "department", value: "Department" },
  { key: "designation", value: "Designation" },
  { key: "employmentCode", value: "Employment Code" },
  { key: "aadharNumber", value: "Aadhar Number" },
  { key: "panNumber", value: "Pan Number" },
  { key: "address", value: "Address" },
  { key: "city", value: "City" },
  { key: "emergencyContactName", value: "Emergency Contact Name" },
  { key: "emergencyContactNumber", value: "Emergency Contact Number" },
  { key: "pinCode", value: "Pin Code" },
  { key: "state", value: "State" },
  { key: "blockStatus", value: "Block Status" },
  { key: "accountHolderName", value: "Account Holder Name" },
  { key: "bankName", value: "Bank Name" },
  { key: "accountNumber", value: "Account Number" },
  { key: "photoUrl", value: "Photo" },
  { key: "ifscCode", value: "IFSC" },
  { key: "dateOfBirth", value: "Date Of Birth" },
  { key: "passbookImage", value: "Passbook Image" },
  { key: "aadharImage", value: "Aadhar Image" },
  { key: "panImage", value: "Pan Image" },
  { key: "dateOfJoining", value: "Date Of Joining" },
  { key: "dateOfResignation", value: "Date Of Resignation" },
];
const downloadType = ["pdf", "csv", "excel", "document"];
const ExportData = ({
  gender,
  setGender,
  caste,
  setCaste,
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
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  caste: string;
  setCaste: Dispatch<SetStateAction<string>>;
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
  const { mutate } = useFetch();
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

  const handleExportData = async () => {
    if (type === "document") {
      const response = await mutate({
        path:
          `user/export?role=TEACHER&perPage=${selectedRange}&pageNo=1&basicDetails=true` +
          (searchTitle ? `&searchTitle=${searchTitle}` : "") +
          (gender ? `&gender=${gender}` : "") +
          (caste ? `&caste=${caste}` : "") +
          (downloadType ? `&downloadType=${type}` : "") +
          `&fields=userDocs&fields=aadharImage&fields=photoUrl&fields=panImage&fields=passbookImage&fields=displayName&downloadType=json`,
        method: "GET",
      });

      if (response?.status !== 200) throw new Error("Zip download failed");

      const simplifyData = response?.data?.data?.data?.filter(
        (item: any) =>
          item?.userDocs?.length ||
          item?.passbookImage?.length ||
          item?.photoUrl ||
          item?.aadharImage ||
          item?.panImage
      );

      const extractedData = simplifyData?.flatMap(
        (item: any, index: number) => {
          const results = [];

          if (item?.photoUrl?.length) {
            results.push({
              url: item.photoUrl,
              name: `${item.displayName}-${index + 1}/photo`,
            });
          }

          if (item?.aadharImage?.length) {
            results.push({
              url: item.aadharImage,
              name: `${item.displayName}-${index + 1}/aadhar`,
            });
          }
          if (item.passbookImage?.length) {
            results.push({
              url: item.passbookImage,
              name: `${item.displayName}-${index + 1}/passbook`,
            });
          }
          if (item.panImage?.length) {
            results.push({
              url: item.panImage,
              name: `${item.displayName}-${index + 1}/pan`,
            });
          }
          if (item.userDocs?.length) {
            results.push(
              ...item.userDocs?.map((inner: any) => ({
                url: inner?.url,
                name: `${item.displayName}-${index + 1}/document-${
                  inner?.title
                }`,
              }))
            );
          }

          return results;
        }
      );
      downloadZipFile(extractedData);

      return;
    }
    if (type === "pdf" && selectedValues && selectedValues?.length > 3) {
      notify.error("Can't select more then 3 fields  in pdf type.");
      return;
    }

    downloadFile({
      method: "GET",
      type: type as any,
      url:
        `user/export?role=TEACHER&perPage=${selectedRange}&pageNo=1&basicDetails=true` +
        (gender ? `&gender=${gender}` : "") +
        (caste ? `&caste=${caste}` : "") +
        (searchTitle ? `&searchTitle=${searchTitle}` : "") +
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
  gender,
  setGender,
  caste,
  setCaste,
}: {
  gender: string;
  setGender: Dispatch<SetStateAction<string>>;
  caste: string;
  setCaste: Dispatch<SetStateAction<string>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);

  const { user } = useAuth();

  const genderSchema = [
    { key: "1", title: "MALE", value: "MALE" },
    { key: "2", title: "FEMALE", value: "FEMALE" },
  ];
  const casteSchema = [
    { key: "1", title: "GENERAL", value: "GENERAL" },
    { key: "2", title: "OBC", value: "OBC" },
    { key: "3", title: "SC", value: "SC" },
    { key: "4", title: "ST", value: "ST" },
    { key: "5", title: "SEBC", value: "SEBC" },
    { key: "6", title: "MINORITY", value: "MINORITY" },
    { key: "7", title: "EWS", value: "EWS" },
  ];
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/* ---------------------------Filter By Gender------------------------------- */}
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Gender
          </h3>
        </div>
        <Divider />
        {genderSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={gender === item?.value}
              onClick={() =>
                setGender((prev) => (prev === item?.value ? "" : item.value))
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))}
      </div>

      {/* --------------------------------search By Caste----------------------------------- */}
      <Divider />
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Caste
          </h3>
        </div>
        <Divider />
        {casteSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={caste === item?.value}
              onClick={() =>
                setCaste((prev) => (prev === item?.value ? "" : item.value))
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))}
      </div>
    </div>
  );
};
