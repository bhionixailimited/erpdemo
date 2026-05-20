import {
  Email,
  HistoryEdu,
  LocalPhone,
  Paid,
  School,
  Stream,
  Timelapse,
  Transgender,
} from "@mui/icons-material";
import AccessibleForwardIcon from "@mui/icons-material/AccessibleForward";
import AddLocationAltIcon from "@mui/icons-material/AddLocationAlt";
import BloodtypeIcon from "@mui/icons-material/Bloodtype";
import EventIcon from "@mui/icons-material/Event";
import LanguageIcon from "@mui/icons-material/Language";
import { Avatar, Skeleton, Tab, Tabs, Tooltip } from "@mui/material";
import { SendMailDialog } from "components/admin/dialog";
import { PaymentForm } from "components/apply/registration";
import AcceptForm from "components/apply/registration/AcceptForm";

import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import {
  AcceptRejectButton,
  ChangeStatusBtn,
} from "components/apply/registration/ManageRegistration";
import AttachedDocuments from "components/apply/registration/registered-student/AttachedDocuments";
import RegistrationDetails from "components/apply/registration/registered-student/RegistrationDetails";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { AcademicDetailsType } from "types/academic";
import UserType from "types/user";

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
  // data: DataType;
  data: any[];
};
const StudentProfile = () => {
  const { mutate, loading } = useFetch();
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };
  const router = useRouter();
  const { push } = useRouter();
  const {
    data,
    isValidating,
    mutate: userMutate,
  } = useSWRFetch<dataType>(
    `registration/admin?registrationId=${router?.query?.registerID}`
  );
  console.log("profile data:--->", data);
  const [openMethodDrawer, setOpenMethodDrawer] = useState(false);
  const [openDetailDrawer, setOpenDetailDrawer] = useState(false);
  const [singleStudentData, setSingleStudentData] = useState(null);
  const [singleStudentDetailData, setSingleStudentDetailData] = useState(null);
  const [AcceptData, setAcceptData] = useState<string | null>(null);

  const handleMethod = (row: any) => {
    setSingleStudentData(row);
    setOpenMethodDrawer(true);
  };
  const handleDetailMethod = (row: any) => {
    setSingleStudentDetailData(row);
    setOpenDetailDrawer(true);
  };

  return (
    <PrivateLayout>
      <div className="w-full">
        <div>
          {/* <PaymentForm
            data={singleStudentData}
            open={openMethodDrawer}
            onClose={() => {
              setOpenMethodDrawer(false);
              setSingleStudentData(null);
            }}
          /> */}
          {/* <AcceptForm
            data={data}
            open={openDetailDrawer}
            onClose={() => {
              setOpenDetailDrawer(false);
            }}
          /> */}
        </div>
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
                    data?.data[0]?.passportSizePhotoUrl ||
                    "https://cdn-icons-png.flaticon.com/128/2784/2784461.png"
                  }
                  className="md:!h-40 md:!w-40 !h-28 !w-28"
                />
              )}
              <div className="flex flex-col gap-2 md:gap-4 ">
                <div className="w-full flex flex-col gap-2 items-center md:items-start">
                  <h3 className="font-medium text-2xl tracking-wide capitalize">
                    {isValidating ? (
                      <Skeleton variant="text" animation={"wave"} width={170} />
                    ) : data?.data[0]?.studentFirstName ? (
                      data?.data[0]?.studentFirstName +
                      " " +
                      data?.data[0]?.studentMiddleName +
                      " " +
                      data?.data[0]?.studentLastName
                    ) : (
                      "Name Not Provided"
                    )}
                  </h3>
                  <h3 className="text-gray-400 font-medium tracking-wide">
                    {isValidating ? (
                      <Skeleton variant="text" animation={"wave"} width={250} />
                    ) : (
                      <>
                        Joined on{" "}
                        {data?.data[0]?.createdAt
                          ? dayjs(data?.data[0]?.createdAt).format(
                              "DD MMM YYYY"
                            )
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
                      ) : data?.data[0]?.studentPhoneNumber ? (
                        `+` +
                        data?.data[0]?.countryCode +
                        " " +
                        data?.data[0]?.studentPhoneNumber
                      ) : (
                        "Phone Number Not Provided"
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
                        data?.data[0]?.email || "Email Not Provided"
                      )}
                    </small>
                    {/* <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <PhoneAndroid className="text-gray-600" />{" "}
                      {data?.data?.deviceName || "unknown"}
                    </small> */}
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <EventIcon className="text-green-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        dayjs(
                          data?.data[0]?.studentDateOfBirth ||
                            "Date of Birth Not Provided"
                        ).format(" ddd, MMM D, YYYY ")
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
                        data?.data[0]?.studentGender || "Gender Not Provided"
                      )}
                    </small>
                    {/*  */}
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <AddLocationAltIcon className="text-yellow-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data[0]?.studentNationality ||
                        "Nationality Not Provided"
                      )}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <AccessibleForwardIcon className="text-purple-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : data?.data[0]?.isDifferentlyAble ? (
                        "YES"
                      ) : (
                        "NO"
                      )}
                    </small>
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
                      ) : (
                        data?.data[0]?.studentReligion ||
                        "Religion Not Provided"
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
                      ) : (
                        data?.data[0]?.programme?.title ||
                        "Programme Not Provided"
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
                        data?.data[0]?.programmeYear || "Year Not Provided"
                      )}
                    </small>
                    {/*  */}
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <BloodtypeIcon className="text-red-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data[0]?.studentBloodGroup ||
                        "Blood Group Not Provided"
                      )}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <LanguageIcon className="text-blue-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data[0]?.studentMotherTongue ||
                        "Mother Tongue Not Provided"
                      )}
                    </small>
                    <small className=" text-sm  font-medium tracking-wide flex items-center gap-8  ">
                      <HistoryEdu className="text-emerald-500" />{" "}
                      {isValidating ? (
                        <Skeleton
                          variant="text"
                          animation={"wave"}
                          width={100}
                        />
                      ) : (
                        data?.data[0]?.studentStudyMedium ||
                        "Medium Not Provided"
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
                  <>
                    <div className="flex gap-2 items-center justify-center">
                      {/* {data?.data[0]?.isMovedToStudent ||
                      data?.data[0]?.isRejected ? (
                        <AcceptRejectButton
                          data={{
                            _id: data?.data?.[0]?._id,
                          }}
                        />
                      ) : (
                        ""
                      )} */}

                      {data?.data[0]?.isMovedToStudent ? (
                        <Button
                          className="!bg-green-500 hover:!ring-green-500"
                          disabled
                        >
                          <Tooltip title="Already accepted">
                            <div className="flex gap-2">
                              <ThumbUpAltIcon className="text-white" />
                              <p>ACCEPTED</p>
                            </div>
                          </Tooltip>
                        </Button>
                      ) : data?.data[0]?.isRejected ? (
                        <Button
                          className="!bg-red-500 hover:!ring-red-500"
                          disabled
                        >
                          <Tooltip title="Already rejected">
                            <div className="flex gap-2">
                              <ThumbDownAltIcon className="text-white" />
                              <p>REJECTED</p>
                            </div>
                          </Tooltip>
                        </Button>
                      ) : (
                        <AcceptRejectButton
                          data={{
                            _id: data?.data?.[0]?._id,
                          }}
                        />
                      )}
                    </div>
                  </>
                )}
                {isValidating ? (
                  <Skeleton
                    variant="rounded"
                    animation={"wave"}
                    width={190}
                    height={50}
                  />
                ) : (
                  <div className="flex items-center justify-center">
                    {data?.data[0]?.isPaymentDone ? (
                      <Button
                        className="!bg-green-500 hover:!ring-green-500"
                        disabled
                      >
                        <Tooltip title="Already paid">
                          <div className="flex gap-2">
                            <Paid className="text-white" />
                            <p>PAID</p>
                          </div>
                        </Tooltip>
                      </Button>
                    ) : data?.data[0]?.isRejected ? (
                      <Button
                        className="!bg-red-300 hover:!ring-red-300"
                        disabled
                      >
                        <Tooltip title="Not paid">
                          <div className="flex gap-2">
                            <Paid className="text-white" />
                            <p>NOT PAID</p>
                          </div>
                        </Tooltip>
                      </Button>
                    ) : data?.data[0]?.isMovedStudent ? (
                      <Button
                        className="!bg-red-300 hover:!ring-red-300"
                        disabled
                      >
                        <Tooltip title="Not paid">
                          <div className="flex gap-2">
                            <Paid className="text-white" />
                            <p>NOT PAID</p>
                          </div>
                        </Tooltip>
                      </Button>
                    ) : (
                      <ChangeStatusBtn
                        data={{
                          _id: data?.data?.[0]?._id,
                        }}
                      />
                    )}
                  </div>
                )}
                {/* {isValidating ? (
                  <Skeleton
                    variant="rounded"
                    animation={"wave"}
                    width={190}
                    height={50}
                  />
                ) : (
                  <SendMailDialog />
                )} */}
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
            <Tab label="Attached Documents" {...a11yProps(1)} />
          </Tabs>
          <div className="w-full py-8  ">
            <TabPanel value={tabValue} index={0}>
              <RegistrationDetails
                registerID={router?.query?.registerID as string}
              />
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              <AttachedDocuments />
            </TabPanel>
          </div>
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(StudentProfile);
