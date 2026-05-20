import { Image } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import React from "react";
import { AcademicDetailsType } from "types/academic";
import { BankDetailsType } from "types/bankdetails";
import UserType from "types/user";
import { UserAddressType } from "types/useraddress";
interface DataType extends UserType {
  academicDetails: AcademicDetailsType;
  addressDetails: UserAddressType;
  bankDetails: BankDetailsType;
}
type dataType = {
  data: DataType;
};
const StudentDetails = ({ studentID }: { studentID?: string }) => {
  const { data, isValidating } = useSWRFetch<dataType>(
    `user/details/${studentID}?bank=true&academics=true&employee=true&address=true`
  );
  // console.log("data-->", data);
  // console.log("isValidating-->", isValidating);

  return (
    <div className="w-full p-4   border-[1px] border-gray-300 bg-gray-100 rounded-md">
      <div className="w-full">
        <div className="flex items-center mt-4">
          {/* <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div> */}
          <h2 className=" text-lg font-semibold text-theme">
            {isValidating ? (
              <Skeleton
                variant="text"
                animation={"wave"}
                width={180}
                height={50}
              />
            ) : (
              `Basic Details :-`
            )}
          </h2>
          {/* <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div> */}
        </div>

        {/*--------------------------- Parent Details-------------------------------- */}

        <div className="flex flex-col md:flex-row  gap-3 mt-3">
          <div className="md:w-1/2 w-full ">
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
                  data?.data?.addressDetails?.fatherName || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Father's Phone Number :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.fatherNumber || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Parent's Email :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.parentEmail || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Local Guardian's Name :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.localGuardianName ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Local Guardian's Phone Number :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.localGuardianPhoneNumber ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Local Guardian's Relation :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.localGuardianRelation ||
                  "Not Provided"
                )}
              </p>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
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
                  data?.data?.addressDetails?.motherName || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Mother's Phone Number :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.motherNumber || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Alternate Student Number :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.alternateStudentNumber ||
                  "Not Provided"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------Address/ admission details------------------------------- */}
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
              `Admission Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>

        <div className="flex md:flex-row flex-col gap-3 mt-3">
          <div className="md:w-1/2 w-full ">
            <div>
              <p className="font-semibold flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Aadhaar No :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.aadharNumber || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Application No :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.applicationNumber ||
                  "Not Provided"
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
                  data?.data?.academicDetails?.registrationNumber ||
                  "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Study Medium :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.studyMedium || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `HSC Board :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.hscBoard || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `HSC Institute :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.hscInstitute || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `HSC/10th Full Marks :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.hscFullMarks || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `HSC/10th Mark Secured :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.hscMarkSecured || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `HSC Mark Percentage :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.hscMarkPercentage ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `HSC Passing Year  :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.hscPassingYear || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Diploma Board :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.diplomaBoard || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Diploma Institute :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.diplomaInstitute ||
                  "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Diploma Full Marks :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.diplomaFullMark || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Diploma Mark Secured :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.diplomaMarkSecured ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Diploma Mark Percentage :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.diplomaMarkPercentage ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Diploma Passing Year  :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.diplomaPassingYear ||
                  "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Library Card No :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.academicDetails?.libraryCardNumber ? (
                  data?.data?.academicDetails?.libraryCardNumber
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Course :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.batch?.course?.title ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Receipt Number :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.receiptNumber || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Want to stay in hostel ?`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.academicDetails?.isHostler ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </p>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div>
              <p className="font-semibold  flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Aadhaar Image :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.addressDetails?.aadharImageUrl ? (
                  <div
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                      window?.open(data?.data?.addressDetails?.aadharImageUrl)
                    }
                  >
                    <Image />{" "}
                    <span className="text-md font-medium">
                      View aadhar image
                    </span>
                  </div>
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Date Of Birth :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.dateOfBirth ? (
                  dayjs(data?.data?.dateOfBirth).format("ll")
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Enrollment Code :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.enrollmentCode || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Academic Year :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.academicYear || "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `12th Board :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.twelfthBoard || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `12th Institute :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.twelfthInstitute ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `12th Full Marks :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.twelfthFullMark || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `12th Mark Secured :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.twelfthMarkSecured ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `12th Mark Percentage :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.twelfthMarkPercentage ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `12th Passing Year  :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.twelfthPassingYear ||
                  "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Graduation Full Marks :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.graduationFullMark ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Graduation Mark Secured :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.graduationMarkSecured ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Graduation Mark Percentage :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.graduationMarkPercentage ||
                  "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Graduation Passing Year  :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.graduationPassingYear ||
                  "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Roll No :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.rollNumber || "Not Provided"
                )}
              </p>
            </div>
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Branch :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.academicDetails?.batch?.branch?.title ||
                  "Not Provided"
                )}
              </p>
            </div>

            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Want to use college transport ?`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.academicDetails?.isUsingTransport ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </p>
            </div>
          </div>
        </div>

        {/* -------------------------------------Other Details/address------------------------------- */}
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
              `Other Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" w-full mt-4 ">
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
                  data?.data?.addressDetails?.address || "Not Provided"
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
                  data?.data?.addressDetails?.city || "Not Provided"
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
                  data?.data?.addressDetails?.state || "Not Provided"
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
                  data?.data?.addressDetails?.district || "Not Provided"
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
                  data?.data?.addressDetails?.pinCode || "Not Provided"
                )}
              </p>
            </div>
          </div>

          <div className=" w-full mt-4">
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
                  data?.data?.addressDetails?.currentAddress || "Not Provided"
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
                  data?.data?.addressDetails?.currentCity || "Not Provided"
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
                  data?.data?.addressDetails?.currentState || "Not Provided"
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
                  data?.data?.addressDetails?.currentDistrict || "Not Provided"
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
                  data?.data?.addressDetails?.currentPinCode || "Not Provided"
                )}
              </p>
            </div>
          </div>

          {/* kk */}
          <div className=" w-full mt-4 ">
            <div>
              <p className="font-semibold flex mt-2 items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Local Guardian Address :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.localGuardianAddress ||
                  "Not Provided"
                )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDetails;
