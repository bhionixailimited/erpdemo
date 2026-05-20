import {
  Email,
  LocalPhone,
  School,
  Timelapse,
  Transgender,
} from "@mui/icons-material";
import { Avatar, Tab, Tabs } from "@mui/material";
import { StudentCertificate, StudentReport } from "components/admin";
import { SendMailDialog } from "components/admin/dialog";
import { StudentDetails } from "components/admin/studentdetails";
import { Button } from "components/core";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";
import { AcademicDetailsType } from "types/academic";
import UserType from "types/user";

interface TabPanelProps {
  children?: ReactNode;
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
  academicDetails: AcademicDetailsType;
}
type dataType = {
  data: DataType;
};
const AlumniStudent = () => {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const { studentId } = useRouter().query;
  const { data } = useSWRFetch<dataType>(
    `user/details/${studentId}?bank=true&academics=true&employee=true&address=true`
  );

  return (
    <PrivateLayout title="Alumni | Student ">
      <div className="w-full">
        <div className="bg-gray-100 w-full ">
          <div className="w-full flex flex-col xl:flex-row md:flex-col items-center py-8  container mx-auto px-4  ">
            <div className="flex flex-col md:flex-row  items-center md:items-start gap-4 md:gap-8 min-w-fit ">
              <Avatar
                src={
                  data?.data?.photoUrl ||
                  "https://cdn-icons-png.flaticon.com/128/2784/2784461.png"
                }
                className="md:!h-40 md:!w-40 !h-28 !w-28"
              />
              <div className="flex flex-col gap-2 md:gap-4 mb-4">
                <div className="w-full flex flex-col gap-2 items-center md:items-start">
                  <h3 className="font-medium text-2xl tracking-wide">
                    {data?.data?.displayName || "Not Provided"}
                  </h3>
                  <h3 className="text-gray-400 font-medium tracking-wide">
                    Graduated from{" "}
                    {data?.data?.academicDetails?.batch
                      ? data?.data?.academicDetails?.batch?.session?.title
                      : "Not Provided"}{" "}
                    Batch
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8  gap-2 md:items-start">
                  <span className="flex flex-col gap-2">
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <LocalPhone className="text-blue-500" /> +
                      {data?.data?.phoneNumber
                        ? data?.data?.countryCode +
                          " " +
                          data?.data?.phoneNumber
                        : "Not Provided"}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Email className="text-yellow-500" />{" "}
                      {data?.data?.email || "Not Provided"}
                    </small>
                    {/* <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <PhoneAndroid className="text-gray-600" />{" "}
                      {data?.data?.deviceName || "unknown"}
                    </small> */}
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Transgender className="text-pink-500" />{" "}
                      {data?.data?.gender || "Not Provided"}
                    </small>
                  </span>
                  <span className="flex flex-col gap-2">
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <School className="text-purple-500" />{" "}
                      {data?.data?.academicDetails?.batch?.course?.title &&
                      data?.data?.academicDetails?.batch?.branch?.title
                        ? `${data?.data?.academicDetails?.batch?.course?.title} ${data?.data?.academicDetails?.batch?.branch?.title} `
                        : "Not Provided"}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Timelapse className="text-lime-500" />{" "}
                      {data?.data?.academicDetails?.batch?.session?.title ||
                        "Not Provided"}
                    </small>
                    {/* <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <VpnKey className="text-red-500" /> Last Active :
                      {data?.data?.lastLoginTime &&
                        moment(
                          data?.data?.lastLoginTime[
                            data?.data?.lastLoginTime?.length - 1
                          ]
                        ).format("Do MMM YYYY : HH:mm A")}
                    </small> */}

                    {/* <small
                      className={` ${
                        data?.data?.status === "ACTIVE"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }  text-sm  font-medium tracking-wide flex items-center gap-8  text-white px-2 py-1  rounded-md w-fit  `}
                    >
                      {data?.data?.status}
                    </small> */}
                  </span>
                </div>
              </div>
            </div>
            <div className="w-full flex items-center gap-8 justify-center flex-wrap ">
              {/* <Button
                className="!bg-green-500 !text-white !font-medium !capitalize  !tracking-wide !rounded-md !py-3 !px-6 "
                startIcon={<Message />}
              >
                Send Message
              </Button> */}
              <SendMailDialog />
            </div>
          </div>
        </div>
        <div className="w-full container mx-auto md:px-4 student-profile-tab ">
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="Student Profile Tab"
            className="!font-medium"
            variant="scrollable"
            scrollButtons="auto"
          >
            <Tab label="Student Details" {...a11yProps(0)} />
            <Tab label="Student Certificate" {...a11yProps(1)} />
            <Tab label="Student Report" {...a11yProps(2)} />
          </Tabs>
          <div className="w-full py-8  ">
            <TabPanel value={tabValue} index={0}>
              <StudentDetails studentID={studentId as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <StudentCertificate studentID={studentId as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <StudentReport studentID={studentId as string} />
            </TabPanel>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(AlumniStudent);
