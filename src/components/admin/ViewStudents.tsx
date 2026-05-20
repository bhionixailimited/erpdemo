import { AddBox, Download } from "@mui/icons-material";
import {
  Autocomplete,
  Checkbox,
  Chip,
  Divider,
  FormControlLabel,
  Pagination,
  Radio,
  RadioGroup,
  Skeleton,
  Slider,
  TextField,
} from "@mui/material";
import { SearchBar, StudentCard } from "components/common";
import { Button, Empty } from "components/core";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { Dispatch, SetStateAction, useDeferredValue, useState } from "react";
import BranchType from "types/branch";
import CourseType from "types/course";
import UserType from "types/user";
import { downloadFile, downloadZipFile, notify } from "utils";
import { StudentSkeleton } from "./skeleton";
import { EditStudentDrawer } from "./studentdetails";
interface Props {
  studentDrawer?: () => void;
  type?: "ALUMNI" | "STUDENT";
}

type dataType = {
  data: UserType[];
  totalCount?: number;
  perPage?: number;
};
const ViewStudents = ({ studentDrawer, type: studentType }: Props) => {
  const [pageNo, setPageNo] = useState(1);
  const [searchText, setSearchText] = useState("");
  const searchTitle = useDeferredValue(searchText);
  const [downloadType, setDownloadType] = useState("excel");
  const [admissionYear, setAdmissionYear] = useState<string[]>([]);
  const [completed, setCompleted] = useState<boolean>();
  const [batchId, setBatchId] = useState<string[]>([]);
  const [courseId, setCourseId] = useState<string[]>([]);
  const [branchId, setBranchId] = useState<string[]>([]);
  const [gender, setGender] = useState<string[]>([]);
  const [caste, setCaste] = useState<string[]>([]);
  const [isBatchAssign, setBatchAssign] = useState<string>("");
  const [isHostler, setIsHostler] = useState<string>("");
  const [isUsingTransport, setIsUsingTransport] = useState<string>("");
  const [resultPublished, setResultPublished] = useState<boolean>();
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

  //perPage=12&
  const { data, isValidating, mutate } = useSWRFetch<dataType>(
    studentType === "ALUMNI"
      ? `student?isAlumni=true&` +
          (!batchId?.length &&
          !courseId?.length &&
          !branchId?.length &&
          !gender?.length &&
          !caste?.length &&
          !isBatchAssign &&
          !isHostler &&
          !isUsingTransport &&
          !searchTitle &&
          !admissionYear?.length
            ? `perPage=100&pageNo=${pageNo}`
            : `pageNo=${pageNo}`) +
          (batchId?.length && batchId?.length < 1
            ? `&session=${batchId}`
            : batchId?.map((batchId) => `&session=${batchId}`).join("")) +
          (courseId?.length && courseId?.length < 1
            ? `&course=${courseId}`
            : courseId?.map((courseId) => `&course=${courseId}`).join("")) +
          (branchId?.length && branchId?.length < 1
            ? `&branch=${branchId}`
            : branchId?.map((branchId) => `&branch=${branchId}`).join("")) +
          (gender?.length && gender?.length < 1
            ? `&gender=${gender}`
            : gender?.map((gender) => `&gender=${gender}`).join("")) +
          (caste?.length && caste?.length < 1
            ? `&caste=${caste}`
            : caste?.map((caste) => `&caste=${caste}`).join("")) +
          (isBatchAssign ? `&isBatchAssign=${isBatchAssign}` : "") +
          (isHostler ? `&isHostler=${isHostler}` : "") +
          (isUsingTransport ? `&isUsingTransport=${isUsingTransport}` : "") +
          (searchTitle ? `&searchTitle=${searchTitle}` : "") +
          (admissionYear?.length && admissionYear?.length > 0
            ? admissionYear?.map((year) => `&admissionYear=${year}`).join("")
            : "")
      : `student?` +
          (!batchId?.length &&
          !courseId?.length &&
          !branchId?.length &&
          !gender?.length &&
          !caste?.length &&
          !isBatchAssign &&
          !isHostler &&
          !isUsingTransport &&
          !searchTitle &&
          !admissionYear?.length
            ? `perPage=100&pageNo=${pageNo}`
            : `pageNo=${pageNo}`) +
          (batchId?.length && batchId?.length < 1
            ? `&session=${batchId}`
            : batchId?.map((batchId) => `&session=${batchId}`).join("")) +
          (courseId?.length && courseId?.length < 1
            ? `&course=${courseId}`
            : courseId?.map((courseId) => `&course=${courseId}`).join("")) +
          (branchId?.length && branchId?.length < 1
            ? `&branch=${branchId}`
            : branchId?.map((branchId) => `&branch=${branchId}`).join("")) +
          (gender?.length && gender?.length < 1
            ? `&gender=${gender}`
            : gender?.map((gender) => `&gender=${gender}`).join("")) +
          (caste?.length && caste?.length < 1
            ? `&caste=${caste}`
            : caste?.map((caste) => `&caste=${caste}`).join("")) +
          (searchTitle ? `&searchTitle=${searchTitle}` : "") +
          (isHostler ? `&isHostler=${isHostler}` : "") +
          (isUsingTransport ? `&isUsingTransport=${isUsingTransport}` : "") +
          (isBatchAssign ? `&isBatchAssign=${isBatchAssign}` : "") +
          (admissionYear?.length && admissionYear?.length > 0
            ? admissionYear?.map((year) => `&admissionYear=${year}`).join("")
            : "")
  );

  const [selectedRange, setSelectedRange] = useState<Number>(
    (data?.perPage && data?.perPage) ||
      (data?.totalCount && data?.totalCount) ||
      100
  );
  const [editStudentDrawer, setEditStudentDrawer] = useState<any>(false);
  return (
    <>
      <SearchBar
        searchText={searchTitle}
        setSearchText={setSearchText}
        filterComp={
          (
            <SearchFilter
              isUsingTransport={isUsingTransport}
              setIsUsingTransport={setIsUsingTransport}
              isHostler={isHostler}
              setIsHostler={setIsHostler}
              isBatchAssign={isBatchAssign}
              setBatchAssign={setBatchAssign}
              gender={gender}
              setGender={setGender}
              caste={caste}
              setCaste={setCaste}
              branchId={branchId}
              setBranchId={setBranchId}
              setCourseId={setCourseId}
              courseId={courseId}
              setType={setDownloadType}
              type={downloadType}
              batchId={batchId}
              setBatchId={setBatchId}
              resultPublished={resultPublished}
              setResultPublished={setResultPublished}
              completed={completed}
              setCompleted={setCompleted}
              admissionYear={admissionYear}
              setAdmissionYear={setAdmissionYear}
            />
          ) || undefined
        }
        exportComp={
          (
            <ExportData
              caste={caste}
              setCaste={setCaste}
              gender={gender}
              setGender={setGender}
              isUsingTransport={isUsingTransport}
              setIsUsingTransport={setIsUsingTransport}
              isHostler={isHostler}
              setIsHostler={setIsHostler}
              isBatchAssign={isBatchAssign}
              setBatchAssign={setBatchAssign}
              setType={setDownloadType}
              type={downloadType}
              selectedValues={selectedValues}
              setSelectedValues={setSelectedValues}
              selectedRange={selectedRange as number}
              setSelectedRange={setSelectedRange}
              totalStudents={data?.totalCount}
              batchId={batchId}
              setBatchId={setBatchId}
              courseId={courseId}
              branchId={branchId}
              admissionYear={admissionYear}
              setAdmissionYear={setAdmissionYear}
              studentType={studentType}
              searchTitle={searchTitle}
              pageNo={pageNo}
            />
          ) || undefined
        }
      />

      <div className="w-full grid grid-cols-12 pt-4 gap-4 ">
        {isValidating ? (
          <StudentSkeleton i={8} />
        ) : data?.data?.length ? (
          data?.data?.map((item, index) => (
            <div
              key={index}
              className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
            >
              <StudentCard
                key={item?._id}
                data={item}
                studentDrawer={() => {
                  setEditStudentDrawer(item?._id);
                }}
                type={studentType}
                mutate={mutate}
              />
            </div>
          ))
        ) : (
          <div className="col-span-12">
            <Empty title="No Student Found" />
          </div>
        )}
        <EditStudentDrawer
          open={editStudentDrawer}
          onClose={() => setEditStudentDrawer(false)}
          mutate={mutate}
        />
      </div>
      {/* ---------Pagination--------- */}
      <div className="w-full flex items-center justify-center py-4">
        {!(
          batchId?.length ||
          courseId?.length ||
          branchId?.length ||
          gender?.length ||
          caste?.length ||
          isBatchAssign ||
          isHostler ||
          isUsingTransport ||
          searchTitle ||
          admissionYear?.length
        ) && (
          <Pagination
            count={Math.ceil(
              Number(data?.totalCount || 1) / Number(data?.perPage || 1)
            )}
            onChange={(e, v: number) => setPageNo(v)}
            variant="outlined"
            color="primary"
          />
        )}
      </div>
    </>
  );
};

export default ViewStudents;
const exportFields = [
  // { key: "_id", value: "Id" },
  { key: "displayName", value: "Display Name" },
  { key: "email", value: "Email" },
  { key: "phoneNumber", value: "Phone Number" },
  { key: "countryCode", value: "Country Code" },
  { key: "gender", value: "Gender" },
  { key: "blockStatus", value: "Block Status" },
  { key: "branch", value: "Branch" },
  { key: "course", value: "Course" },
  { key: "session", value: "Session" },
  { key: "caste", value: "Caste" }, //----------------//
  { key: "applicationNumber", value: "Application Number" },
  { key: "enrollmentCode", value: "Enrollment Code" },
  { key: "isAlumni", value: "Is Alumni" },
  { key: "isHostler", value: "Is Hostler" },
  { key: "isUsingTransport", value: "Is Using Transport" },
  { key: "libraryCardNumber", value: "Library Card Number" },
  { key: "registrationNumber", value: "Registration Number" },
  { key: "studyMedium", value: "Study Medium" },
  { key: "hscFullMarks", value: "HSC Full Marks" },
  { key: "passOutDate", value: "Pass Out Date" },
  { key: "academicYear", value: "Academic Year" },
  { key: "hscMarkSecured", value: "HSC Mark Secured" },
  { key: "hscMarkPercentage", value: "HSC Mark Percentage" },
  { key: "hscPassingYear", value: "HSC Passing Year" },
  { key: "hscBoard", value: "HSC Board" },
  { key: "hscInstitute", value: "HSC Institute" },
  { key: "twelfthFullMark", value: "Twelfth Full Mark" },
  { key: "twelfthMarkSecured", value: "Twelfth Mark Secured" },
  { key: "twelfthMarkPercentage", value: "Twelfth Mark Percentage" },
  { key: "twelfthPassingYear", value: "Twelfth Passing Year" },
  { key: "twelfthBoard", value: "Twelfth Board" },
  { key: "twelfthInstitute", value: "Twelfth Institute" },
  { key: "diplomaFullMark", value: "Diploma Full Mark" },
  { key: "diplomaMarkSecured", value: "Diploma Mark Secured" },
  { key: "diplomaMarkPercentage", value: "Diploma Mark Percentage" },
  { key: "diplomaPassingYear", value: "Diploma Passing Year" },
  { key: "diplomaBoard", value: "Diploma Board" },
  { key: "diplomaInstitute", value: "Diploma Institute" },
  { key: "graduationFullMark", value: "Graduation Full Mark" },
  { key: "graduationMarkSecured", value: "Graduation Mark Secured" },
  { key: "graduationMarkPercentage", value: "Graduation Mark Percentage" },
  { key: "graduationPassingYear", value: "Graduation Passing Year" },
  { key: "graduationBoard", value: "Graduation Board" },
  { key: "graduationInstitute", value: "Graduation Institute" },
  { key: "receiptNumber", value: "Receipt Number" },
  { key: "rollNumber", value: "Roll Number" },
  { key: "aadharNumber", value: "Aadhar Number" },
  { key: "address", value: "Address" },
  { key: "city", value: "City" },
  { key: "district", value: "District" },
  { key: "fatherName", value: "Father Name" },
  { key: "parentNumber", value: "Parent Number" },
  { key: "motherName", value: "Mother Name" },
  { key: "pinCode", value: "Pin Code" },
  { key: "state", value: "State" },
  // { key: "aadharImageUrl", value: "Aadhar Image URL" },
  // { key: "aadharImageRef", value: "Aadhar Image Ref" },
  { key: "fatherNumber", value: "Father Number" },
  { key: "motherNumber", value: "Mother Number" },
  // { key: "emergencyContactNumber", value: "Emergency Contact Number" },
  // { key: "emergencyContactName", value: "Emergency Contact Name" },
  { key: "parentEmail", value: "Parent Email" },
  { key: "currentAddress", value: "Current Address" },
  { key: "localGuardianName", value: "Local Guardian Name" },
  { key: "localGuardianPhoneNumber", value: "Local Guardian Phone Number" },
  { key: "localGuardianRelation", value: "Local Guardian Relation" },
  { key: "alternateStudentNumber", value: "Alternate Student Number" },
  { key: "localGuardianAddress", value: "Local Guardian Address" },
  { key: "currentCity", value: "Current City" },
  { key: "currentDistrict", value: "Current District" },
  { key: "currentState", value: "Current State" },
  { key: "currentPinCode", value: "Current Pin Code" },
  { key: "dateOfBirth", value: "Date Of Birth" },
  { key: "photoUrl", value: "Photo" },
  { key: "documents", value: "Documents" },
  { key: "certificates", value: "Certificates" },
  { key: "aadharImage", value: "Aadhar" },
];

const downloadType = ["pdf", "csv", "excel", "document"];
const ExportData = ({
  isBatchAssign,
  setBatchAssign,
  caste,
  setCaste,
  isUsingTransport,
  setIsUsingTransport,
  isHostler,
  setIsHostler,
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
  admissionYear,
  setAdmissionYear,
  gender,
  setGender,
}: {
  isBatchAssign: string;
  setBatchAssign: Dispatch<SetStateAction<string>>;
  caste: string[];
  setCaste: Dispatch<SetStateAction<string[]>>;
  isUsingTransport: string;
  setIsUsingTransport: Dispatch<SetStateAction<string>>;
  isHostler: string;
  setIsHostler: Dispatch<SetStateAction<string>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  selectedValues?: string[];
  setSelectedValues: Dispatch<SetStateAction<string[]>>;
  selectedRange?: Number;
  setSelectedRange: Dispatch<SetStateAction<Number>>;
  admissionYear?: string[];
  setAdmissionYear: Dispatch<SetStateAction<string[]>>;
  gender?: string[];
  setGender: Dispatch<SetStateAction<string[]>>;
  batchId: string[];
  setBatchId: Dispatch<SetStateAction<string[]>>;
  totalStudents?: number;
  courseId?: string[];
  branchId?: string[];
  pageNo?: number;
  searchTitle?: string;
  studentType?: string;
}) => {
  const { mutate } = useFetch();
  const [selectAll, setSelectAll] = useState(false);
  // console.log("selectAll-->", selectAll);
  const marks = [
    { value: 0, label: "0" },
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
  // const handleCheckboxClick = (itemId: string) => {
  //   setSelectedValues((prevValues) => {
  //     let updatedValues: any;

  //     if (prevValues.includes(itemId)) {
  //       // If the clicked checkbox was previously selected, unselect it
  //       updatedValues = prevValues.filter((value) => value !== itemId);
  //     } else {
  //       // If the clicked checkbox was not previously selected, select it
  //       updatedValues = [...prevValues, itemId];
  //     }

  //     // Check if all checkboxes are selected, and update the "Select All" checkbox accordingly
  //     const allItemIds = exportFields.map((item) => item?.key);
  //     const isAllSelected = allItemIds.every((item) =>
  //       updatedValues.includes(item)
  //     );
  //     setSelectAll(isAllSelected);

  //     return updatedValues;
  //   });
  // };

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
          studentType === "ALUMNI"
            ? `student/export?isAlumni=true&perPage=${selectedRange}&pageNo=1` +
              (batchId?.length && batchId?.length < 1
                ? `&session=${batchId}`
                : batchId?.map((batchId) => `&session=${batchId}`).join("")) +
              (courseId?.length && courseId?.length < 1
                ? `&course=${courseId}`
                : courseId?.map((courseId) => `&course=${courseId}`).join("")) +
              (branchId?.length && branchId?.length < 1
                ? `&branch=${branchId}`
                : branchId?.map((branchId) => `&branch=${branchId}`).join("")) +
              (gender?.length && gender?.length < 1
                ? `&gender=${gender}`
                : gender?.map((gender) => `&gender=${gender}`).join("")) +
              (caste?.length && caste?.length < 1
                ? `&caste=${caste}`
                : caste?.map((caste) => `&caste=${caste}`).join("")) +
              (admissionYear?.length && admissionYear?.length < 1
                ? `&admissionYear=${admissionYear}`
                : admissionYear
                    ?.map((year) => `&admissionYear=${year}`)
                    .join("")) +
              (isBatchAssign ? `&isBatchAssign=${isBatchAssign}` : "") +
              (isUsingTransport
                ? `&isUsingTransport=${isUsingTransport}`
                : "") +
              (isHostler ? `&isHostler=${isHostler}` : "") +
              (searchTitle ? `&searchTitle=${searchTitle}` : "") +
              (selectedValues?.length
                ? selectedValues?.reduce((acc, item) => {
                    return acc + `&fields=${item}`;
                  }, ``)
                : "") +
              `&fields=allDocuments&fields=aadharImage&fields=photoUrl&fields=allCertificates&fields=displayName&downloadType=json`
            : `student/export?perPage=${selectedRange}&pageNo=1` +
              (batchId?.length && batchId?.length < 1
                ? `&session=${batchId}`
                : batchId?.map((batchId) => `&session=${batchId}`).join("")) +
              (courseId?.length && courseId?.length < 1
                ? `&course=${courseId}`
                : courseId?.map((courseId) => `&course=${courseId}`).join("")) +
              (branchId?.length && branchId?.length < 1
                ? `&branch=${branchId}`
                : branchId?.map((branchId) => `&branch=${branchId}`).join("")) +
              (gender?.length && gender?.length < 1
                ? `&gender=${gender}`
                : gender?.map((gender) => `&gender=${gender}`).join("")) +
              (caste?.length && caste?.length < 1
                ? `&caste=${caste}`
                : caste?.map((caste) => `&caste=${caste}`).join("")) +
              (admissionYear?.length && admissionYear?.length < 1
                ? `&admissionYear=${admissionYear}`
                : admissionYear
                    ?.map((year) => `&admissionYear=${year}`)
                    .join("")) +
              (isBatchAssign ? `&isBatchAssign=${isBatchAssign}` : "") +
              (caste ? `&caste=${caste}` : "") +
              (isUsingTransport
                ? `&isUsingTransport=${isUsingTransport}`
                : "") +
              (isHostler ? `&isHostler=${isHostler}` : "") +
              (searchTitle ? `&searchTitle=${searchTitle}` : "") +
              (selectedValues?.length
                ? selectedValues?.reduce((acc, item) => {
                    return acc + `&fields=${item}`;
                  }, ``)
                : "") +
              `&fields=allDocuments&fields=aadharImage&fields=photoUrl&fields=allCertificates&fields=displayName&downloadType=json`,
        method: "GET",
      });

      if (response?.status !== 200) throw new Error("Zip download failed");

      const simplifyData = response?.data?.data?.data?.filter(
        (item: any) =>
          item?.allDocuments?.length ||
          item?.allCertificates?.length ||
          item?.photoUrl ||
          item?.aadharImage
      );

      // const downloadableData = simplifyData?.flatMap(
      //   (item: any, index: number) =>
      //     item?.photoUrl?.map((inner: any, innerIndex: number) => {
      //       return {
      //         url: inner,
      //         name: `${index + 1}-${innerIndex + 1}`,
      //       };
      //     })
      // );

      const extractedData = simplifyData?.flatMap(
        (item: any, index: number) => {
          const results = [];

          if (item.photoUrl?.length) {
            results.push({
              url: item.photoUrl,
              name: `${item.displayName}-${index + 1}/photo`,
            });
          }

          if (item.aadharImage?.length) {
            results.push({
              url: item.aadharImage,
              name: `${item.displayName}-${index + 1}/aadhar`,
            });
          }

          if (item.allCertificates?.length) {
            results.push(
              ...item.allCertificates.map((inner: any) => ({
                url: inner.fileUrl,
                name: `${item.displayName}-${index + 1}/certificate-${
                  inner.title
                }`,
              }))
            );
          }

          if (item.allDocuments?.length) {
            results.push(
              ...item.allDocuments.map((inner: any) => ({
                url: inner.fileUrl,
                name: `${item.displayName}-${index + 1}/document-${
                  inner.title
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
      notify.error("Can't select all the field in pdf type.");
      return;
    }
    downloadFile({
      method: "GET",
      type: type as any,
      url:
        studentType === "ALUMNI"
          ? `student/export?isAlumni=true&perPage=${selectedRange}&pageNo=1` +
            (batchId?.length && batchId?.length < 1
              ? `&session=${batchId}`
              : batchId?.map((batchId) => `&session=${batchId}`).join("")) +
            (courseId?.length && courseId?.length < 1
              ? `&course=${courseId}`
              : courseId?.map((courseId) => `&course=${courseId}`).join("")) +
            (branchId?.length && branchId?.length < 1
              ? `&branch=${branchId}`
              : branchId?.map((branchId) => `&branch=${branchId}`).join("")) +
            (gender?.length && gender?.length < 1
              ? `&gender=${gender}`
              : gender?.map((gender) => `&gender=${gender}`).join("")) +
            (caste?.length && caste?.length < 1
              ? `&caste=${caste}`
              : caste?.map((caste) => `&caste=${caste}`).join("")) +
            (admissionYear?.length && admissionYear?.length < 1
              ? `&admissionYear=${admissionYear}`
              : admissionYear
                  ?.map((year) => `&admissionYear=${year}`)
                  .join("")) +
            (isBatchAssign ? `&isBatchAssign=${isBatchAssign}` : "") +
            (isUsingTransport ? `&isUsingTransport=${isUsingTransport}` : "") +
            (isHostler ? `&isHostler=${isHostler}` : "") +
            (searchTitle ? `&searchTitle=${searchTitle}` : "") +
            (downloadType ? `&downloadType=${type}` : "") +
            (selectedValues?.length
              ? selectedValues?.reduce((acc, item) => {
                  return acc + `&fields=${item}`;
                }, ``)
              : "")
          : `student/export?perPage=${selectedRange}&pageNo=1` +
            (batchId?.length && batchId?.length < 1
              ? `&session=${batchId}`
              : batchId?.map((batchId) => `&session=${batchId}`).join("")) +
            (courseId?.length && courseId?.length < 1
              ? `&course=${courseId}`
              : courseId?.map((courseId) => `&course=${courseId}`).join("")) +
            (branchId?.length && branchId?.length < 1
              ? `&branch=${branchId}`
              : branchId?.map((branchId) => `&branch=${branchId}`).join("")) +
            (gender?.length && gender?.length < 1
              ? `&gender=${gender}`
              : gender?.map((gender) => `&gender=${gender}`).join("")) +
            (caste?.length && caste?.length < 1
              ? `&caste=${caste}`
              : caste?.map((caste) => `&caste=${caste}`).join("")) +
            (admissionYear?.length && admissionYear?.length < 1
              ? `&admissionYear=${admissionYear}`
              : admissionYear
                  ?.map((year) => `&admissionYear=${year}`)
                  .join("")) +
            (isBatchAssign ? `&isBatchAssign=${isBatchAssign}` : "") +
            (caste ? `&caste=${caste}` : "") +
            (isUsingTransport ? `&isUsingTransport=${isUsingTransport}` : "") +
            (isHostler ? `&isHostler=${isHostler}` : "") +
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
// ----------------------------------
const SearchFilter = ({
  isUsingTransport,
  setIsUsingTransport,
  isHostler,
  setIsHostler,
  isBatchAssign,
  setBatchAssign,
  gender,
  setGender,
  caste,
  setCaste,
  setCompleted,
  completed,
  setBatchId,
  batchId,
  resultPublished,
  setResultPublished,
  type,
  setType,
  setCourseId,
  courseId,
  branchId,
  setBranchId,
  admissionYear,
  setAdmissionYear,
}: {
  isUsingTransport: string;
  setIsUsingTransport: Dispatch<SetStateAction<string>>;
  isHostler: string;
  setIsHostler: Dispatch<SetStateAction<string>>;
  isBatchAssign: string;
  setBatchAssign: Dispatch<SetStateAction<string>>;
  gender: string[];
  setGender: Dispatch<SetStateAction<string[]>>;
  caste: string[];
  setCaste: Dispatch<SetStateAction<string[]>>;
  batchId: string[];
  setBatchId: Dispatch<SetStateAction<string[]>>;
  type: string;
  setType: Dispatch<SetStateAction<string>>;
  resultPublished?: boolean;
  setResultPublished: Dispatch<SetStateAction<boolean | undefined>>;
  completed?: boolean;
  setCompleted: Dispatch<SetStateAction<boolean | undefined>>;
  courseId?: string[];
  setCourseId: Dispatch<SetStateAction<string[]>>;
  branchId?: string[];
  setBranchId: Dispatch<SetStateAction<string[]>>;
  admissionYear?: string[];
  setAdmissionYear: Dispatch<SetStateAction<string[]>>;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [coursePageNo, setCoursePageNo] = useState(1);
  const [branchPageNo, setBranchPageNo] = useState(1);

  const { user } = useAuth();
  //perPage=5& -- if needed
  const { data: batch, isValidating: batchLoading } = useSWRFetch<any>(
    `session?pageNo=${pageNo}`
  );
  //perPage=5&   --- if needed
  const { data: course, isValidating: courseLoading } = useSWRFetch<any>(
    `course?pageNo=${coursePageNo}`
  );

  //perPage=5&   --- if needed
  const { data: branch, isValidating: branchLoading } = useSWRFetch<any>(
    `branch?pageNo=${branchPageNo}`
  );

  // filter by admission year
  function getYearOptions() {
    const currentYear = new Date().getFullYear();
    const years = [];

    // Create a range of 50 years before and after the current year
    for (let i = currentYear - 50; i <= currentYear + 1; i++) {
      years.push(i.toString());
    }

    return years;
  }
  const years = getYearOptions();

  //filter by Batchsession year as per autocomplete
  const [selectedBatchSessionItems, setSelectedBatchSessionItems] =
    useState<any>([]);
  const handleBatchSession = (event: React.SyntheticEvent, value: any) => {
    // console.log("value-->", value);
    setSelectedBatchSessionItems(value);
    setBatchId && setBatchId(value?.map((item: any) => item?._id));
  };

  //filter by course year as per autocomplete
  const [selectedSessionItems, setSelectedSessionItems] = useState<any>([]);
  const handleCourse = (event: React.SyntheticEvent, value: any) => {
    // console.log("value-->", value);
    setSelectedSessionItems(value);
    setCourseId && setCourseId(value?.map((item: any) => item?._id));
  };

  //filter by branch year as per autocomplete
  const [selectedBranchItems, setSelectedBranchItems] = useState<any>([]);
  const handleBranch = (event: React.SyntheticEvent, value: any) => {
    // console.log("value-->", value);
    setSelectedBranchItems(value);
    setBranchId && setBranchId(value?.map((item: any) => item?._id));
  };

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
  const batchAssign = [
    { key: "1", title: "YES", value: "true" },
    { key: "2", title: "NO", value: "false" },
  ];
  const hostlerSchema = [
    { key: "1", title: "YES", value: "true" },
    { key: "2", title: "NO", value: "false" },
  ];
  const transportSchema = [
    { key: "1", title: "YES", value: "true" },
    { key: "2", title: "NO", value: "false" },
  ];

  // Calculate the current year
  const currentYear = new Date().getFullYear();

  // Calculate the range of admission years (10 years before and after)
  const startYear = currentYear - 10;
  const endYear = currentYear + 10;

  // Create an array of admission years within the range
  const allAdmissionYears = [];
  for (let year = startYear; year <= endYear; year++) {
    allAdmissionYears.push(year);
  }

  // Number of admission years to display per page
  const itemsPerPage = 5;

  // State to manage the currently displayed page of admission years
  const [page, setPage] = useState(1);

  // Calculate the index range for the current page
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  // Get the admission years for the current page
  const admissionYears = allAdmissionYears.slice(startIndex, endIndex);

  // Function to handle page navigation
  const handlePageChange = (newPage: SetStateAction<number>) => {
    setPage(newPage);
  };
  const toggleAdmissionYear = (year: string) => {
    if (admissionYear?.includes(year)) {
      setAdmissionYear(admissionYear?.filter((y) => y !== year) || []); // Provide a default empty array if admissionYear is undefined
    } else {
      setAdmissionYear([...(admissionYear || []), year]); // Provide a default empty array if admissionYear is undefined
    }
  };
  const toggleSession = (sessionId: string) => {
    if (batchId?.includes(sessionId)) {
      setBatchId(batchId?.filter((id: string) => id !== sessionId));
    } else {
      setBatchId([...batchId, sessionId]);
    }
  };
  const toggleCourse = (course: string) => {
    if (courseId?.includes(course)) {
      setCourseId(courseId?.filter((id) => id !== course));
    } else {
      setCourseId([...(courseId || []), course]);
    }
  };
  const toggleBranch = (branch: string) => {
    if (branchId?.includes(branch)) {
      setBranchId(branchId?.filter((id) => id !== branch));
    } else {
      setBranchId([...(branchId || []), branch]);
    }
  };
  const toggleGender = (genderId: string) => {
    if (gender?.includes(genderId)) {
      setGender(gender?.filter((id) => id !== genderId));
    } else {
      setGender([...(gender || []), genderId]);
    }
  };
  const toggleCaste = (casteId: string) => {
    if (caste?.includes(casteId)) {
      setCaste(caste?.filter((id) => id !== casteId));
    } else {
      setCaste([...(caste || []), casteId]);
    }
  };
  return (
    <div className="w-full  p-4 max-h-screen overflow-hidden overflow-y-auto ">
      {/*--------------------- Filter By Admission year------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Admission Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="year-filter"
          options={years}
          value={admissionYear}
          onChange={(event, value) => {
            setAdmissionYear(value);
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              className="!max-w-lg"
              placeholder="Search Admission Year"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip
                label={option}
                onDelete={() => {
                  if (Array.isArray(admissionYear)) {
                    const newValue = [...admissionYear];
                    newValue.splice(index, 1); // Remove the selected option
                    setAdmissionYear(newValue);
                  }
                }}
                key={option}
              />
            ))
          }
        />
      </div>

      {/*--------------------- Filter By Admission year Checkbox------------------- */}
      {/* <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Admission Year
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {admissionYears.map((year) => (
          <div key={year} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={admissionYear?.includes(year.toString())}
              onClick={() => toggleAdmissionYear(year.toString())}
            />
            <h3 className="font-medium  tracking-wide text-sm">{year}</h3>
          </div>
        ))}
        <div className="flex items-center justify-between py-4">
          <button
            className="bg-theme px-4 py-1 rounded-md text-white"
            onClick={() => handlePageChange(page - 1)}
            disabled={page === 1}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">{page}</span>
          <button
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => handlePageChange(page + 1)}
            disabled={endIndex >= allAdmissionYears.length}
          >
            Next
          </button>
        </div>
      </div> */}
      {/* -------------------Filter By Session Autocomplete---------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Batch Session
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="batchSession-filter"
          options={batch?.data || []}
          value={selectedBatchSessionItems}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleBatchSession}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Batch Session"
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: option?._id })} // Use the ID as the index
                key={option?._id}
              />
            ))
          }
        />

        {/* --------------------------------Filter By Date Of Signing----------------------------------- */}
      </div>
      {/*--------------------- Filter By Session year Checkbox------------------- */}
      {/* <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Session
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1">
        {batchLoading ? (
          <Skeleton animation="wave" />
        ) : (
          batch?.data?.map((item: any) => (
            <div key={item?._id} className="flex items-center gap-4">
              <Checkbox
                size="small"
                checked={batchId?.includes(item?._id)}
                onClick={() => toggleSession(item?._id)}
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
            onClick={() => setPageNo((prev) => (prev > 1 ? prev - 1 : 1))}
          >
            Prev
          </button>
          <span className="text-center border px-4 font-semibold">
            {pageNo}
          </span>
          <button
            disabled={batch?.isLastChunk}
            className="bg-green-500 px-4 py-1 rounded-md text-white"
            onClick={() => setPageNo((prev) => prev + 1)}
          >
            Next
          </button>
        </div>
      </div> */}
      {/* -------------------------------Filter By Course autocomplete--------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Course
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="course-filter"
          options={course?.data || []}
          value={selectedSessionItems}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleCourse}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Batch Course"
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: option?._id })} // Use the ID as the index
                key={option?._id}
              />
            ))
          }
        />

        {/* --------------------------------Filter By Date Of Signing----------------------------------- */}
      </div>

      {/* -------------------------------Filter By Course autocomplete--------------------- */}
      <div className="flex items-center py-4 gap-4">
        <AddBox className="text-blue-500" />
        <h3 className="font-medium text-theme tracking-wide text-sm">
          Filter By Branch
        </h3>
      </div>
      <Divider />
      <div className="flex flex-col gap-1 mt-1">
        <Autocomplete
          multiple
          id="course-filter"
          options={branch?.data || []}
          value={selectedBranchItems}
          getOptionLabel={(option: any) => option?.title} // Display the title
          onChange={handleBranch}
          renderInput={(params) => (
            <TextField
              className="!max-w-lg"
              {...params}
              // variant="outlined"
              // label="Select Departments"
              placeholder="Search Branch"
            />
          )}
          renderTags={(value: any, getTagProps) =>
            value?.map((option: any) => (
              <Chip
                label={option?.title} // Display the title
                {...getTagProps({ index: option?._id })} // Use the ID as the index
                key={option?._id}
              />
            ))
          }
        />

        {/* --------------------------------Filter By Date Of Signing----------------------------------- */}
      </div>
      {/* -------------------------------Filter By Course autocomplete--------------------- */}
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
                checked={courseId?.includes(item?._id)}
                onClick={() => toggleCourse(item?._id)}
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
      </div> */}
      {/* ------------Filter By Branch checkbox------------- */}
      {/* <Divider />
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
                checked={branchId?.includes(item?._id)}
                onClick={() => toggleBranch(item?._id)}
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

      {/* ---------------------------Filter By Gender------------------------------- */}
      <Divider />
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
              checked={gender?.includes(item?.value)}
              onClick={() => toggleGender(item?.value)}
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
              checked={caste?.includes(item?.value)}
              onClick={() => toggleCaste(item?.value)}
            />

            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))}
      </div>
      {/* --------------------------------search By BatchAssign----------------------------------- */}
      <Divider />
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Batch Assign
          </h3>
        </div>
        <Divider />
        {batchAssign?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={isBatchAssign === item?.value}
              onClick={() =>
                setBatchAssign((prev) =>
                  prev === item?.value ? "" : item.value
                )
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))}
      </div>
      {/* --------------------------------search By Hostler----------------------------------- */}
      <Divider />
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Hostler
          </h3>
        </div>
        <Divider />
        {hostlerSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={isHostler === item?.value}
              onClick={() =>
                setIsHostler((prev) => (prev === item?.value ? "" : item.value))
              }
            />
            <h3 className="font-medium  tracking-wide text-sm">
              {item?.title}
            </h3>
          </div>
        ))}
      </div>
      {/* --------------------------------search By Transport----------------------------------- */}
      <Divider />
      <div className="flex flex-col gap-1">
        <Divider />
        <div className="flex items-center py-4 gap-4">
          <AddBox className="text-blue-500" />
          <h3 className="font-medium text-theme tracking-wide text-sm">
            Filter By Transport
          </h3>
        </div>
        <Divider />
        {transportSchema?.map((item: any) => (
          <div key={item?.key} className="flex items-center gap-4">
            <Checkbox
              size="small"
              checked={isUsingTransport === item?.value}
              onClick={() =>
                setIsUsingTransport((prev) =>
                  prev === item?.value ? "" : item.value
                )
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
