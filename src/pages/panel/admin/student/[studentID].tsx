import {
  BatchPrediction,
  Email,
  HistoryEdu,
  JoinInner,
  LocalPhone,
  MilitaryTech,
  School,
  Stream,
  Timelapse,
  Transgender,
} from "@mui/icons-material";
import {
  Avatar,
  Dialog,
  MenuItem,
  Select,
  SelectChangeEvent,
  Skeleton,
  Tab,
  Tabs,
} from "@mui/material";
import {
  StudentCertificate,
  StudentDocuments,
  StudentReport,
} from "components/admin";
import {
  DemoteStudentDialog,
  PromoteStudentDialog,
  SendMailDialog,
} from "components/admin/dialog";
import {
  Attendance,
  PaymentDetails,
  StudentAssignment,
  StudentDetails,
} from "components/admin/studentdetails";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { AcademicDetailsType } from "types/academic";
import BatchType from "types/batch";
import UserType from "types/user";
import { notify } from "utils";
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
  academicDetails: AcademicDetailsType;
}
type dataType = {
  data: DataType;
};
const Profile = () => {
  const { mutate, loading } = useFetch();
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const { studentID } = useRouter().query;
  const { push } = useRouter();
  const {
    data,
    isValidating,
    mutate: userMutate,
  } = useSWRFetch<dataType>(
    `user/details/${studentID}?bank=true&academics=true&employee=true&address=true`
  );

  const handleAlumni = async () => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Move it to alumni!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await mutate({
              path: `student/academic/${studentID}`,
              method: "POST",
              body: JSON.stringify({
                isAlumni: true,
              }),
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }

            notify.success(response?.data?.message);
            push(`/panel/admin/alumni`);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <PrivateLayout>
      <div className="w-full">
        <div className="bg-gray-100 w-full ">
          <div className="w-full flex flex-col xl:flex-row md:flex-col items-center py-8 md:gap-4 gap-2 container mx-auto px-4">
            <div className="flex flex-col md:flex-row  items-center md:items-start gap-4 md:gap-4 min-w-fit">
              {isValidating ? (
                <Skeleton
                  variant="circular"
                  animation={"wave"}
                  width={170}
                  height={170}
                />
              ) : (
                <Avatar
                  src={
                    data?.data?.photoUrl ||
                    "https://cdn-icons-png.flaticon.com/128/2784/2784461.png"
                  }
                  className="md:!h-40 md:!w-40 !h-28 !w-28"
                />
              )}
              <div className="flex flex-col gap-2 md:gap-4 ">
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
                        {data?.data?.academicDetails?.createdAt
                          ? dayjs(
                              data?.data?.academicDetails?.createdAt
                            ).format("DD MMM YYYY")
                          : "Not Provided"}
                      </>
                    )}
                  </h3>
                </div>
                <div className="flex flex-col md:flex-row md:gap-8 gap-2 md:items-start ">
                  <span className="flex flex-col gap-2">
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <LocalPhone className="text-blue-500" />
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : data?.data?.phoneNumber ? (
                        `+` +
                        data?.data?.countryCode +
                        " " +
                        data?.data?.phoneNumber
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
                    {/* <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <PhoneAndroid className="text-gray-600" />{" "}
                      {data?.data?.deviceName || "unknown"}
                    </small> */}
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
                    {/*  */}
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <HistoryEdu className="text-yellow-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data?.academicDetails?.promotedClass ||
                        "Not Provided"
                      )}
                    </small>
                    {data?.data?.academicDetails?.section ? (
                      <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                        <BatchPrediction className="text-theme" />{" "}
                        {isValidating ? (
                          <Skeleton
                            variant="text"
                            animation={"wave"}
                            width={100}
                          />
                        ) : (
                          `Section - ${data?.data?.academicDetails?.section}` ||
                          "Not Provided"
                        )}
                      </small>
                    ) : null}
                    {/*  */}
                  </span>

                  <span className="flex flex-col gap-2">
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <Stream className="text-orange-400" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : data?.data?.caste && data?.data?.caste ? (
                        `${data?.data?.caste} `
                      ) : (
                        "Not Provided"
                      )}
                    </small>

                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8 break-words max-w-[300px] ">
                      <School className="text-purple-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : data?.data?.academicDetails?.batch?.course?.title &&
                        data?.data?.academicDetails?.batch?.branch?.title ? (
                        `${data?.data?.academicDetails?.batch?.course?.title} ${data?.data?.academicDetails?.batch?.branch?.title} `
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
                        data?.data?.academicDetails?.batch?.session?.title ||
                        "Not Provided"
                      )}
                    </small>
                    {/*  */}
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <MilitaryTech className="text-blue-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data?.academicDetails?.promoteStatus ||
                        "Not Provided"
                      )}
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
            <div className="flex w-full gap-2 md:gap-2 lg:gap-8 md:justify-center lg:justify-start">
              <div className=" flex flex-col-reverse items-center gap-2 md:gap-6 justify-center md:justify-end mt-2 md:mt-0 ">
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
                {isValidating ? (
                  <Skeleton
                    variant="rounded"
                    animation={"wave"}
                    width={190}
                    height={50}
                  />
                ) : (
                  <>
                    {" "}
                    <Button
                      className="!bg-theme !text-white !font-medium !capitalize  !tracking-wide !rounded-md md:!py-3 text-xs md:text-lg md:!px-6  whitespace-nowrap xl:!w-60 "
                      startIcon={<JoinInner />}
                      loading={loading}
                      onClick={() => {
                        handleAlumni();
                      }}
                    >
                      Move To Alumni
                    </Button>
                  </>
                )}
              </div>
              <div className="w-full flex flex-col gap-2 md:gap-4 items-center lg:items-start">
                {isValidating ? (
                  <Skeleton
                    variant="rounded"
                    animation={"wave"}
                    width={190}
                    height={50}
                  />
                ) : (
                  <DemoteStudentDialog mutate={userMutate} type={"STUDENT"} />
                )}
                {isValidating ? (
                  <Skeleton
                    variant="rounded"
                    animation={"wave"}
                    width={190}
                    height={50}
                  />
                ) : (
                  <PromoteStudentDialog mutate={userMutate} type={"STUDENT"} />
                )}

                {/* <Button
                  className="shadow-none text-xs md:text-base whitespace-nowrap !py-4 !min-w-fit !px-8"
                  onClick={() => {
                    setOpenDemoteDialog(true);
                    setSelectedStudent(studentID as string);
                  }}
                >
                  Promote Student
                </Button>
                <Button
                  onClick={() => {
                    handleClick("DEMOTED");
                    // setOpenDialog(true);
                    // setSelectedStudent(studentID as string);
                  }}
                  className="shadow-none text-xs md:text-base whitespace-nowrap !py-4 !bg-red-500 !min-w-fit !px-8 "
                >
                  Demote Student
                </Button> */}
              </div>
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
            <Tab label="Add Documents" {...a11yProps(1)} />
            <Tab label="Payment Details" {...a11yProps(2)} />
            <Tab label="Attendance Details" {...a11yProps(3)} />
            <Tab label="Exam Performance" {...a11yProps(4)} />
            <Tab label="Assignment Performance" {...a11yProps(5)} />
            <Tab label="Student Certificate" {...a11yProps(6)} />
          </Tabs>
          <div className="w-full py-8  ">
            <TabPanel value={tabValue} index={0}>
              <StudentDetails studentID={studentID as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <StudentDocuments studentID={studentID as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              <PaymentDetails studentID={studentID as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              <Attendance />
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              <StudentReport studentID={studentID as string} />
            </TabPanel>
            <TabPanel value={tabValue} index={5}>
              <StudentAssignment />
            </TabPanel>
            <TabPanel value={tabValue} index={6}>
              <StudentCertificate studentID={studentID as string} />
            </TabPanel>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(Profile);
