import {
  Email,
  LocalPhone,
  School,
  Timelapse,
  Transgender,
} from "@mui/icons-material";
import { Avatar, Button, Tab, Tabs, Skeleton } from "@mui/material";
import {
  StaffAttendance,
  StaffBasicDetails,
  StaffPaymentDetails,
} from "components/admin";
import { SendMailDialog } from "components/admin/dialog";
import dayjs from "dayjs";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import { AcademicDetailsType } from "types/academic";
import { BankDetailsType } from "types/bankdetails";
import { EmployeeDetailsType } from "types/employeedetails";
import UserType from "types/user";
import { UserAddressType } from "types/useraddress";
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`student-profile-${index}`}
      aria-labelledby={`student-${index}`}
      {...other}
    >
      {value === index && children}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `student-${index}`,
    "aria-controls": `student-profile-${index}`,
  };
}
interface DataType extends UserType {
  address: UserAddressType;
  employeeDetails: EmployeeDetailsType;
  bankDetails: BankDetailsType;
}
type dataType = {
  data: DataType;
};
const StaffDetails = () => {
  const { staffId } = useRouter().query;
  const { data, isValidating } = useSWRFetch<dataType>(
    `user/details/${staffId}?bank=true&academics=true&employee=true&address=true`
  );

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  return (
    <PrivateLayout title="Staff | View Detail">
      <div className="w-full  ">
        <div className="bg-white border w-full ">
          <div className="w-full flex flex-col xl:flex-row md:flex-col items-center py-8 md:gap-8  container mx-auto px-4  ">
            <div className="flex flex-col md:flex-row  items-center md:items-start gap-4 md:gap-8 min-w-fit">
              {isValidating ? (
                <Skeleton
                  variant="circular"
                  animation={"wave"}
                  width={170}
                  height={170}
                />
              ) : (
                <Avatar
                  src={data?.data?.photoUrl}
                  className="md:!h-40 md:!w-40 !h-28 !w-28"
                />
              )}
              <div className="flex flex-col gap-2 md:gap-4 mb-4 ">
                <div className="w-full flex flex-col gap-2 items-center md:items-start">
                  <h3 className="font-medium text-2xl tracking-wide">
                    {isValidating ? (
                      <Skeleton variant="text" animation={"wave"} width={170} />
                    ) : (
                      data?.data?.displayName || "Not Provided"
                    )}
                  </h3>
                  <h3 className="text-gray-400 font-medium tracking-wide">
                    {isValidating ? (
                      <Skeleton variant="text" animation={"wave"} width={250} />
                    ) : (
                      <>
                        Joined on{" "}
                        {data?.data?.employeeDetails?.createdAt
                          ? dayjs(
                              data?.data?.employeeDetails?.createdAt
                            ).format("DD MMM YYYY")
                          : "Not Provided"}
                      </>
                    )}
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8  gap-2 md:items-start">
                  <span className="flex flex-col gap-2">
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <LocalPhone className="text-blue-500" /> +
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : data?.data?.phoneNumber ? (
                        data?.data?.countryCode + " " + data?.data?.phoneNumber
                      ) : (
                        "Not Provided"
                      )}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Email className="text-yellow-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data?.email || "Not Provided"
                      )}
                    </small>

                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Transgender className="text-pink-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data?.gender || "Not Provided"
                      )}
                    </small>
                  </span>
                  <span className="flex flex-col gap-2">
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <School className="text-purple-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : data?.data?.role === "TEACHER" ? (
                        "Teaching Staff"
                      ) : data?.data?.role === "STAFF" ? (
                        "Non-Teaching Staff"
                      ) : (
                        "Not Provided"
                      )}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Timelapse className="text-lime-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        (data?.data?.employeeDetails?.yearOfExperience &&
                          `${data?.data?.employeeDetails?.yearOfExperience} Years Of Experience`) ||
                        "Not Provided"
                      )}
                    </small>
                  </span>
                </div>
              </div>
            </div>
            <div className=" w-full flex items-center gap-8 justify-center flex-wrap">
              {isValidating ? (
                <Skeleton
                  variant="rounded"
                  animation={"wave"}
                  width={190}
                  height={50}
                />
              ) : (
                <SendMailDialog />
              )}
            </div>
          </div>
        </div>
        <div className="w-full container mx-auto md:px-4 student-profile-tab  ">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Staff Profile Tab"
            className="!font-medium"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Basic Details" {...a11yProps(0)} />
            <Tab label="Payment Details" {...a11yProps(1)} />
            <Tab label="Attendance Details" {...a11yProps(2)} />
          </Tabs>
          <div className="w-full py-8  ">
            <TabPanel value={tabValue} index={0}>
              <StaffBasicDetails staffId={staffId as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <StaffPaymentDetails staffId={staffId as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <StaffAttendance staffId={staffId as string} />
            </TabPanel>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(StaffDetails);
