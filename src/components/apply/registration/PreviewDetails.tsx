import React, { useRef } from 'react';
import { useReactToPrint } from "react-to-print";
import { Skeleton } from "@mui/material";
import { useApplyAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { AcademicDetailsType } from "types/academic";
import { BankDetailsType } from "types/bankdetails";
import UserType from "types/user";
import { UserAddressType } from "types/useraddress";
import DocumentImageCard from "./DocumentImageCard";
import dayjs from "dayjs";
import { Button } from "components/core";
interface DataType extends UserType {
  academicDetails: AcademicDetailsType;
  addressDetails: UserAddressType;
  bankDetails: BankDetailsType;
}
type dataType = {
  data: any;
};
type dataType1 = {
  data: {
    logoUrl: string;
  };
};
const PreviewDetails = () => {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const router = useRouter();

  const { data, isValidating } = useSWRFetch<dataType1>(`logo`);

  const { user, getUser } = useApplyAuth();
  console.log(user, "User Data");

  return (
    <section className=''>
      <div className="flex justify-end pb-4">
                <Button onClick={handlePrint}>PRINT</Button>
            </div>
    <div className="w-full p-4   border-[1px] border-gray-300 bg-gray-100 rounded-md" id="print" ref={componentRef}>
      <div className="w-full">
        <div className="flex flex-row justify-between">
          <div className="flex justify-start">
            <img
              src={
                data?.data?.logoUrl ||
                process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL ||
                "https://www.poddarinstitute.org/assets/images/logo/poddar-logo.webp"
              }
              alt=""
              className="md:h-16 h-10 w-40  object-contain"
            />
          </div>
          {/* <div className="flex justify-end">
                <Button onClick={handlePrint}>PRINT</Button>
            </div> */}
        </div>
        {/* -------------------------------------StudentDetails------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Student Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-4">
          <div>
            <p className="font-semibold">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's First Name :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentFirstName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Middle Name :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentMiddleName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Last Name :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentLastName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Email :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.email || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Phone Number :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPhoneNumber || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Date of Birth :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                dayjs(
                  user?.studentDateOfBirth || "Date of Birth Not Provided"
                ).format(" ddd, MMM D, YYYY ")
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Gender :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentGender || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Nationality :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentNationality || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Religion :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentReligion || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Programme :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.programme?.title || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Programme Year :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.programmeYear || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Blood Group :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentBloodGroup || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Mother Tongue :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentMotherTongue || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Student's Medium :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentStudyMedium || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Is Student DifferentlyAble :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : user?.isDifferentlyAble ? (
                "YES"
              ) : (
                "NO"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Hostel Required :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : user?.isHostelRequired ? (
                "Yes"
              ) : (
                "No"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Transport Required :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : user?.isTransportRequired ? (
                "Yes"
              ) : (
                "No"
              )}
            </p>
          </div>
        </div>
        {/* -------------------------------------ParentDetails------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Parent Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-4 ">
          <div>
            <p className="font-semibold">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Father's Name :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.fatherName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Mother's Name :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.motherName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Name :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Email :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianEmail || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Phone Number :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianMobileNumber || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Relation :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianRelationWithCandidate || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Country :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianCountry || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Address :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianAddressLine1 + " " + user?.guardianAddressLine2 ||
                "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Guardian's Pincode :`
              )}
            </p>
            <p className="text-sm">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.guardianPinCode || "Not Provided"
              )}
            </p>
          </div>
        </div>
        {/* -------------------------------------Xth Education Details/------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Xth Education Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className=" grid grid-cols-1 md:grid-cols-3 w-full mt-4 ">
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `School Name :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.schoolName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Registration No :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.schoolRegistrationNumber || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Board :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.schoolBoard || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Year of Passing :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.schoolPassingYear || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Marking Scheme :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.schoolMarkingScheme || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `CGPA / Percentage Obtained :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.obtainScore || "Not Provided"
              )}
            </p>
          </div>
        </div>
        {/* -------------------------------------XIIth Education Details/------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `XIIth Education Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-4">
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `School Name :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiithSchoolName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Board/University :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiithBoard || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Registration No :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiithRegistrationNumber || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Stream :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiiStream || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Result Status :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiiResultStatus || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Year of Passing :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiiYearOfPassing || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Marking Scheme :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiiMarkingScheme || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `CGPA / Percentage Obtained :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.xiiObtainScore || "Not Provided"
              )}
            </p>
          </div>
        </div>
        {/* -------------------------------------Diploma Education Details/------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Diploma Education Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-4">
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Institute Name :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaInstituteName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `University :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaUniversityName || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Stream :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaStream || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Result Status :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaResultStatus || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Year of Passing :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaYearOfPassing || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Marking Scheme :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaMarkingScheme || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `CGPA / Percentage Obtained :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.diplomaObtainScore || "Not Provided"
              )}
            </p>
          </div>
        </div>
        {/* -------------------------------------Address Details------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Address Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full mt-4">
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Permanent Address :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPermanentAddressLine1 +
                  " " +
                  user?.studentPermanentAddressLine2 || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `City (Permanent) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPermanentDistrict || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `State (Permanent) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPermanentState || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `District (Permanent) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPermanentDistrict || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Pin Code (Permanent) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPermanentAddressPinCode || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Country (Permanent) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentPermanentCountry || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Current Address :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentCurrentAddressLine1 +
                  " " +
                  user?.studentCurrentAddressLine2 || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `City (Current) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentCurrentCity || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `State (Current) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentCurrentState || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold mt-2 flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `District (Current) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {" "}
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentCurrentDistrict || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Pin Code (Current) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentCurrentAddressPinCode || "Not Provided"
              )}
            </p>
          </div>
          <div>
            <p className="font-semibold flex items-center gap-1 ">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                `Country (Current) :`
              )}
            </p>
            <p className="text-sm mt-2">
              {isValidating ? (
                <Skeleton variant="text" animation={"wave"} width={180} />
              ) : (
                user?.studentCurrentCountry || "Not Provided"
              )}
            </p>
          </div>
        </div>

        {/* -------------------------------------National/State Level Qualifying Exam details------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `National/State Level Qualifying Exam Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>

        <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
          <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">
            {/* :TABLE HEAD */}
            <thead className="min-w-full bg-gray-100 text-left text-gray-700">
              <tr>
                {/* ::Appeared in any entrance examination */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Appeared in any entrance examination
                </th>
                {/* ::Exam Name */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Exam Name
                </th>
                {/* ::Exam Roll No */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Exam Roll No
                </th>
                {/* ::Year of Appearing */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Year of Appearing
                </th>
                {/* ::Result Status */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Result Status
                </th>
                {/* ::Score/Percentile */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Score/Percentile
                </th>
                {/* ::All India Rank */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  All India Rank
                </th>
              </tr>
            </thead>

            {/* :TABLE BODY */}
            <tbody className="">
              {/* {user?.entranceExamResultImage?.map( */}
              {user?.entranceExams?.map((item, index: number) => (
                <tr
                  key={item?._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } whitespace-nowrap`}
                >
                  {/* ::User Name */}
                  <td className="py-3 px-4 text-base text-gray-700 font-semibold">
                    {item ? "Yes" : "No"}
                  </td>
                  {/* ::User Job Title */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.examName || "NO DATA"}
                  </td>
                  {/* ::User Email */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.examRollNumber || "NO DATA"}
                  </td>
                  {/* ::User Created Date */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.yearOfAppearing || "NO DATA"}
                  </td>
                  {/* ::User Created Date */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.resultStatus || "NO DATA"}
                  </td>
                  {/* ::User Created Date */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.score || "NO DATA"}
                  </td>
                  {/* ::User Created Date */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.allIndiaRank || "NO DATA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* -------------------------------------Work Experirience details------------------------------- */}
        <div className="flex items-center mt-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Work Experirience Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>

        <div className="mx-auto pb-8 w-full max-w-7xl overflow-x-auto">
          <table className="px-4 min-w-full rounded-md border border-gray-200 overflow-hidden">
            {/* :TABLE HEAD */}
            <thead className="min-w-full bg-gray-100 text-left text-gray-700">
              <tr>
                {/* ::Have any Work Experience */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Have any Work Experience
                </th>
                {/* ::Position */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Position
                </th>
                {/* ::Employer */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Employer
                </th>
                {/* ::Location */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  Location
                </th>
                {/* ::No of Years of Experience */}
                <th
                  className="py-3 px-4 text-sm font-medium uppercase tracking-wide"
                  scope="col"
                >
                  No of Years of Experience
                </th>
              </tr>
            </thead>

            {/* :TABLE BODY */}
            <tbody className="">
              {/* {user?.entranceExamResultImage?.map( */}
              {user?.workExperience?.map((item, index: number) => (
                <tr
                  key={item?._id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"
                  } whitespace-nowrap`}
                >
                  {/* ::User Name */}
                  <td className="py-3 px-4 text-base text-gray-700 font-semibold">
                    {item ? "Yes" : "No"}
                  </td>
                  {/* ::item Job Title */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.position || "NO DATA"}
                  </td>
                  {/* ::item Email */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.employer || "NO DATA"}
                  </td>
                  {/* ::item Created Date */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.location || "NO DATA"}
                  </td>
                  {/* ::item Created Date */}
                  <td className="py-3 px-4 text-base text-gray-500 font-medium">
                    {item?.yearsOfExperience || "NO DATA"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* -------------------------------------Attached Document------------------------------- */}
        <div className="flex items-center my-4">
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          <p className="px-2 text-lg font-semibold text-theme whitespace-nowrap">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Attached Document`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="">
          <DocumentImageCard />
        </div>
      </div>
    </div>
    </section>
  );
};

export default PreviewDetails;
