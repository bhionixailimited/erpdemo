import { Image } from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useSWRFetch } from "hooks";
import { BankDetailsType } from "types/bankdetails";
import { EmployeeDetailsType } from "types/employeedetails";
import UserType from "types/user";
import { UserAddressType } from "types/useraddress";
interface DataType extends UserType {
  addressDetails: UserAddressType;
  employeeDetails: EmployeeDetailsType;
  bankDetails: BankDetailsType;
}
type dataType = {
  data: DataType;
};
const StaffBasicDetails = ({ staffId }: { staffId?: string }) => {
  const { data, isValidating } = useSWRFetch<dataType>(
    `user/details/${staffId}?bank=true&academics=true&employee=true&address=true`
  );

  return (
    <div>
      <div className="w-full p-4  border-[1px] border-gray-300 bg-gray-100 rounded-md">
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
          <div className="flex md:flex-row flex-col gap-3 mt-3">
            <div className="md:w-1/2 w-full">
              <p className="font-semibold">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Name :`
                )}
              </p>
              <p className="text-sm">
                {data?.data?.displayName
                  ? data?.data?.displayName
                  : "Not Provided"}
              </p>
              <p className="font-semibold mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Contact Number :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.phoneNumber ? (
                  data?.data?.countryCode + " " + data?.data?.phoneNumber
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>{" "}
            <div className="md:w-1/2 w-full">
              <p className="font-semibold">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Email Address :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.email ? (
                  data?.data?.email
                ) : (
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Employee Code :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.employeeDetails?.employmentCode ? (
                  data?.data?.employeeDetails?.employmentCode
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
          </div>
          {/* -------------------------------------Address------------------------------- */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="md:w-1/2 w-full">
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Date Of Birth :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.dateOfBirth ? (
                  dayjs(data?.data?.dateOfBirth).format("ll")
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
          </div>
          <div className="flex md:flex-row flex-col gap-4 mt-2">
            <div className="md:w-1/2 w-full">
              {/* -------------------------------------Adhaar Number------------------------------- */}
              <p className="font-semibold flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Aadhar No :`
                )}
              </p>
              <p className="text-sm ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.addressDetails?.aadharNumber ? (
                  data?.data?.addressDetails?.aadharNumber
                ) : (
                  "Not Provided"
                )}
              </p>
              {/* -------------------------------------Adhaar Image------------------------------- */}
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Aadhar Image :`
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
                      View aadhar Image
                    </span>
                  </div>
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>

            <div className="md:w-1/2 w-full">
              <p className="font-semibold flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Pan No :`
                )}
              </p>
              <p className="text-sm">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.addressDetails?.panNumber ? (
                  data?.data?.addressDetails?.panNumber
                ) : (
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Pan Image :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.addressDetails?.panImageUrl ? (
                  <div
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                      window?.open(data?.data?.addressDetails?.panImageUrl)
                    }
                  >
                    <Image />{" "}
                    <span className="text-md font-medium">View Pan Image</span>
                  </div>
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
          </div>

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
          {/* -------------------------------------Address------------------------------- */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="md:w-1/2 w-full mt-4">
              <p className="font-semibold flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Date Of Joining:`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.employeeDetails?.dateOfJoining ? (
                  dayjs(data?.data?.employeeDetails?.dateOfJoining).format("ll")
                ) : (
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold flex items-center gap-1 mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Emergency Contact Name:`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.emergencyContactName ||
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `City:`
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
              <p className="font-semibold flex mt-2 items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Address :`
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
              {/* <p className="font-semibold mt-2 flex items-center gap-1 ">
                Panchayat :
              </p>
              <p className="text-sm mt-2">Berhampur</p>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                Post Office :
              </p>
              <p className="text-sm mt-2">Haripur</p> */}
            </div>
            <div className="md:w-1/2 w-full mt-4">
              <p className="font-semibold flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Date Of Resignation:`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.employeeDetails?.dateOfResignation ? (
                  dayjs(data?.data?.employeeDetails?.dateOfResignation).format(
                    "ll"
                  )
                ) : (
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold flex items-center gap-1 mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Emergency Contact Number:`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.emergencyContactNumber ||
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold flex items-center gap-1 mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Pin Code :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  data?.data?.addressDetails?.pinCode || "Not Provided"
                )}
              </p>

              {/* <p className="font-semibold mt-2 flex items-center gap-1 ">
                Police Station :
              </p>
              <p className="text-sm mt-2">K. Nuagaon</p>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                District :
              </p>
              <p className="text-sm mt-2">Ganjam</p> */}
            </div>
          </div>
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
                `Bank Details`
              )}
            </p>
            <div className="w-full border-b-[1px] border-gray-400 border-dashed"></div>
          </div>
          {/* -------------------------------------Address------------------------------- */}
          <div className="flex md:flex-row flex-col gap-4">
            <div className="md:w-1/2 w-full mt-4 ">
              <p className="font-semibold flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Account Number :`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  (data?.data?.bankDetails?.accountNumber &&
                    data?.data?.bankDetails?.accountNumber) ||
                  "Not Provided"
                )}
              </p>

              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Account Holder Name :`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  (data?.data?.bankDetails?.accountHolderName &&
                    data?.data?.bankDetails?.accountHolderName) ||
                  "Not Provided"
                )}
              </p>

              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Passbook Image :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : data?.data?.bankDetails?.passbookImageUrl ? (
                  <div
                    className="text-blue-600 cursor-pointer"
                    onClick={() =>
                      window?.open(data?.data?.bankDetails?.passbookImageUrl)
                    }
                  >
                    <Image />{" "}
                    <span className="text-md font-medium">
                      View Passbook Image
                    </span>
                  </div>
                ) : (
                  "Not Provided"
                )}
              </p>
            </div>
            <div className="md:w-1/2 w-full mt-4 ">
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `IFSC :`
                )}
              </p>
              <p className="text-sm mt-2">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  (data?.data?.bankDetails?.ifscCode &&
                    data?.data?.bankDetails?.ifscCode) ||
                  "Not Provided"
                )}
              </p>
              <p className="font-semibold mt-2 flex items-center gap-1 ">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  `Bank Name :`
                )}
              </p>
              <p className="text-sm mt-2">
                {isValidating ? (
                  <Skeleton variant="text" animation={"wave"} width={180} />
                ) : (
                  (data?.data?.bankDetails?.bankName &&
                    data?.data?.bankDetails?.bankName) ||
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

export default StaffBasicDetails;
