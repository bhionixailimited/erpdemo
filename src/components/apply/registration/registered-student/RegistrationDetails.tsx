import { Skeleton } from "@mui/material";
import { useSWRFetch } from "hooks";
import { useRouter } from "next/router";
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
  data: any;
};
const RegistrationDetails = ({ registerID }: { registerID?: string }) => {
  const router = useRouter();
  const { data, isValidating } = useSWRFetch<dataType>(
    `registration/admin?registrationId=${router?.query?.registerID}`
  );
  console.log(data, "Student Details");

  return (
    <div className="w-full p-4   border-[1px] border-gray-300 bg-gray-100 rounded-md">
      <div className="w-full">
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" w-full mt-4 ">
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
                  data?.data[0]?.fatherName || "Not Provided"
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
                  data?.data[0]?.motherName || "Not Provided"
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
                  data?.data[0]?.guardianName || "Not Provided"
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
                  data?.data[0]?.guardianEmail || "Not Provided"
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
                  data?.data[0]?.guardianMobileNumber || "Not Provided"
                )}
              </p>
            </div>
          </div>

          <div className=" w-full mt-4">
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
                  data?.data[0]?.guardianRelationWithCandidate || "Not Provided"
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
                  data?.data[0]?.guardianCountry || "Not Provided"
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
                  data?.data[0]?.guardianAddressLine1 +
                    " " +
                    data?.data[0]?.guardianAddressLine2 || "Not Provided"
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
                  data?.data[0]?.guardianPinCode || "Not Provided"
                )}
              </p>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" w-full mt-4 ">
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
                  data?.data[0]?.schoolName || "Not Provided"
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
                  data?.data[0]?.schoolRegistrationNumber || "Not Provided"
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
                  data?.data[0]?.schoolBoard || "Not Provided"
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
                  `Year of Passing :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data[0]?.schoolPassingYear || "Not Provided"
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
                  data?.data[0]?.schoolMarkingScheme || "Not Provided"
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
                  data?.data[0]?.obtainScore || "Not Provided"
                )}
              </p>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" w-full mt-4 ">
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
                  data?.data[0]?.xiithSchoolName || "Not Provided"
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
                  data?.data[0]?.xiithBoard || "Not Provided"
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
                  data?.data[0]?.xiithRegistrationNumber || "Not Provided"
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
                  data?.data[0]?.xiiStream || "Not Provided"
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
                  `Result Status :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data[0]?.xiiResultStatus || "Not Provided"
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
                  data?.data[0]?.xiiYearOfPassing || "Not Provided"
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
                  data?.data[0]?.xiiMarkingScheme || "Not Provided"
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
                  data?.data[0]?.xiiObtainScore || "Not Provided"
                )}
              </p>
            </div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className=" w-full mt-4 ">
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
                  data?.data[0]?.diplomaInstituteName || "Not Provided"
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
                  data?.data[0]?.diplomaUniversityName || "Not Provided"
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
                  data?.data[0]?.diplomaStream || "Not Provided"
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
                  data?.data[0]?.diplomaResultStatus || "Not Provided"
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
                  `Year of Passing :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data[0]?.diplomaYearOfPassing || "Not Provided"
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
                  data?.data[0]?.diplomaMarkingScheme || "Not Provided"
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
                  data?.data[0]?.diplomaObtainScore || "Not Provided"
                )}
              </p>
            </div>
          </div>
        </div>
        {/* -------------------------------------Facility details------------------------------- */}
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
              `Facility Details`
            )}
          </p>
          <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
        </div>
        <div className="flex md:flex-row flex-col gap-3 mt-3">
          <div className="md:w-1/2 w-full ">
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Hostel Required ?`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data[0]?.isHostelRequired ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </p>
            </div>
          </div>

          <div className="md:w-1/2 w-full">
            <div>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Transport Required ?`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data[0]?.isTransportRequired ? (
                  "Yes"
                ) : (
                  "No"
                )}
              </p>
            </div>
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
                  data?.data[0]?.studentPermanentAddressLine1 +
                    data?.data[0]?.studentPermanentAddressLine2 ||
                  "Not Provided"
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
                  data?.data[0]?.studentPermanentCity || "Not Provided"
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
                  data?.data[0]?.studentPermanentState || "Not Provided"
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
                  data?.data[0]?.studentPermanentDistrict || "Not Provided"
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
                  data?.data[0]?.studentPermanentAddressPinCode ||
                  "Not Provided"
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
                  data?.data[0]?.studentPermanentCountry || "Not Provided"
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
                  data?.data[0]?.studentCurrentAddressLine1 +
                    data?.data[0]?.studentCurrentAddressLine2 || "Not Provided"
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
                  data?.data[0]?.studentCurrentCity || "Not Provided"
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
                  data?.data[0]?.studentCurrentState || "Not Provided"
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
                  data?.data[0]?.studentCurrentDistrict || "Not Provided"
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
                  data?.data[0]?.studentCurrentAddressPinCode || "Not Provided"
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
                  data?.data[0]?.studentCurrentCountry || "Not Provided"
                )}
              </p>
            </div>
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
              {data?.data[0]?.entranceExams?.map((item:any, index: number) => (
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
              {data?.data[0]?.workExperience?.map((item: any, index: number) => (
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
      </div>
    </div>
  );
};

export default RegistrationDetails;
