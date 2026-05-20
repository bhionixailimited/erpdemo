import { Settings } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { StudentSkeleton } from "components/admin/skeleton";
import { LmsCard } from "components/common";
import {
  Button,
  CustomDialog,
  CustomProgress,
  Empty,
  IOSSwitch,
} from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import BatchType from "types/batch";
import SubjectType from "types/subject";
import UserType from "types/user";

type Props = {
  type: "STUDENT" | "TEACHER";
  reload?: boolean;
};

type LMSClassType = {
  batch: BatchType;
  cancelled: boolean;
  credits: number;
  isHoliday: boolean;
  startTime: string;
  endTime: string;
  subject: SubjectType;
  _id: string;
  teacher: UserType;
  type: string;
};

type ClassDataType = {
  data: LMSClassType[];
};

const ViewLms = ({ type, reload }: Props) => {
  const [activeClass, setActiveClass] = useState<LMSClassType | null>();

  const [teacherClassStartType, setTeacherClassStartType] = useState({
    allowComments: false,
    notifyStudent: false,
    joinWithoutVideo: false,
    joinWithoutAudio: false,
  });
  const [studentClassStartType, setStudentClassStartType] = useState({
    joinWithoutVideo: false,
    joinWithoutAudio: false,
  });

  const { push } = useRouter();

  const [showPopUp, setShowPopUp] = useState(false);

  const { user } = useAuth();

  const { mutate } = useFetch();

  const {
    data: classData,
    isValidating: loadingClassData,
    mutate: load,
    error,
  } = useSWRFetch<ClassDataType>(
    user?._id &&
      (user?.role === "TEACHER"
        ? `teacher/class/${user?._id}?type=ONLINE`
        : `student/lms`)
  );

  useEffect(() => {
    load?.();
  }, [reload]);

  const handleSubmit = async () => {
    try {
      if (type === "STUDENT") {
        push(`/panel/student/lms/${activeClass?._id}`);
      } else {
        push(
          `/panel/teacher/lms/${activeClass?._id}?joinWithoutVideo=${teacherClassStartType?.joinWithoutVideo}&joinWithoutAudio=${teacherClassStartType?.joinWithoutAudio}`
        );
        if (teacherClassStartType?.notifyStudent) {
          await mutate({
            path: `lms/create-notification/${activeClass?._id}`,
            method: "POST",
          });
        }
      }
    } catch (error) {}
  };

  const calculateTimeProgress = (startTime: string, endTime: string) => {
    return (
      100 -
      Math.round(
        ((dayjs(endTime).diff(dayjs(startTime)) -
          dayjs(new Date()).diff(dayjs(startTime))) /
          dayjs(endTime).diff(dayjs(startTime))) *
          100
      )
    );
  };

  return (
    <>
      <div className="w-full grid grid-cols-3  md:grid-cols-9 lg:grid-cols-12 pt-4 gap-2 md:gap-4 ">
        <CustomDialog open={showPopUp} onClose={() => setShowPopUp(false)}>
          <div className="w-full flex flex-col  ">
            <h3 className="font-semibold text-theme text-lg tracking-wide p-4 border-b">
              Live Options <Settings />
            </h3>

            {type === "TEACHER" ? (
              <div className="flex flex-col gap-4 p-4">
                <div className="flex items-start justify-between gap-4">
                  <span className=" font-medium tracking-wide text-base">
                    Notify all student about live stream.
                  </span>
                  <IconButton
                    onClick={() =>
                      setTeacherClassStartType((prev) => {
                        return {
                          ...prev,
                          notifyStudent: !prev.notifyStudent,
                        };
                      })
                    }
                  >
                    <IOSSwitch checked={teacherClassStartType.notifyStudent} />
                  </IconButton>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className=" font-medium tracking-wide text-base">
                    Join without video
                  </span>
                  <IconButton
                    onClick={() =>
                      setTeacherClassStartType((prev) => {
                        return {
                          ...prev,
                          joinWithoutVideo: !prev.joinWithoutVideo,
                        };
                      })
                    }
                  >
                    <IOSSwitch
                      checked={teacherClassStartType.joinWithoutVideo}
                    />
                  </IconButton>
                </div>
                <div className="flex items-start justify-between gap-4">
                  <span className=" font-medium tracking-wide text-base">
                    Join without audio
                  </span>
                  <IconButton
                    onClick={() =>
                      setTeacherClassStartType((prev) => {
                        return {
                          ...prev,
                          joinWithoutAudio: !prev.joinWithoutAudio,
                        };
                      })
                    }
                  >
                    <IOSSwitch
                      checked={teacherClassStartType.joinWithoutAudio}
                    />
                  </IconButton>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-start p-4 gap-4">
                <h3 className="font-medium tracking-wide text-theme  text-lg">
                  {activeClass?.subject?.title} by{" "}
                  {activeClass?.teacher?.displayName}
                </h3>
                {dayjs(activeClass?.startTime).isBefore(new Date()) ? (
                  dayjs(activeClass?.endTime).isAfter(new Date()) ? (
                    <div className="flex flex-col gap-2 w-full">
                      <div className="flex justify-between w-full">
                        <p className="text-sm text-theme font-semibold">
                          Class Progress
                        </p>
                        <p className="text-sm text-theme font-semibold">
                          {calculateTimeProgress(
                            String(activeClass?.startTime),
                            String(activeClass?.endTime)
                          )}{" "}
                          %
                        </p>
                      </div>
                      <CustomProgress
                        ProgressValue={calculateTimeProgress(
                          String(activeClass?.startTime),
                          String(activeClass?.endTime)
                        )}
                      />
                    </div>
                  ) : (
                    <div className="flex space-x-2 text-gray-400  mb-2  text-xs items-center">
                      <p>Class Ended</p>
                    </div>
                  )
                ) : (
                  <div className="flex space-x-2 text-gray-400  mb-2  text-xs items-center">
                    <p>Not Started</p>
                  </div>
                )}
              </div>
            )}

            <div className="flex w-full justify-end p-4 border-t">
              <Button
                className={`hover:ring-theme ${
                  activeClass?.cancelled ||
                  activeClass?.isHoliday ||
                  dayjs(activeClass?.startTime).isAfter(dayjs())
                    ? "!bg-gray-500 hover:ring-gray-500"
                    : "bg-theme hover:ring-theme "
                } `}
                onClick={() => handleSubmit()}
                disabled={
                  activeClass?.cancelled ||
                  activeClass?.isHoliday ||
                  dayjs(activeClass?.startTime).isAfter(dayjs()) ||
                  dayjs(activeClass?.endTime).isBefore(dayjs())
                }
              >
                {type === "STUDENT" ? "Join Class" : "Go Live"}
              </Button>
            </div>
          </div>
        </CustomDialog>
        {(!error && !classData?.data) || loadingClassData ? (
          <StudentSkeleton i={7} />
        ) : classData?.data?.length ? (
          classData?.data?.map((item) => (
            <div
              key={item._id}
              className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
              onClick={() => setActiveClass(item)}
            >
              <LmsCard
                key={item._id}
                data={item}
                onClick={() => setShowPopUp(true)}
                type={type}
              />
            </div>
          ))
        ) : (
          <div className="w-full flex items-center col-span-12 justify-center">
            <Empty title={error?.message || "No Classes Today"} />
          </div>
        )}
      </div>
    </>
  );
};

export default ViewLms;
