import { ICONS } from "assets";
import { ClassIcon } from "assets/static-icon";
import { Button } from "components/core";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import { ClassType } from "types/class";
import { notify } from "utils";

type ClassDataType = {
  data: ClassType;
};

type AttendanceReportData = {
  data: {
    isAbsent: boolean;
    isOnLeave: boolean;
    isPresent: boolean;
    student: {
      displayName: string;
      email: string;
      gender: string;
      rollNumber: string;
      _id: string;
      photoUrl: string;
    };
  }[];
  totalCount?: number;
  perPage?: number;
};

const ClassDetails = ({ reload }: { reload?: () => void }) => {
  const [isPresentLoading, setIsPresentLoading] = useState(false);
  const [isAbsentLoading, setIsAbsentLoading] = useState(false);

  const { query } = useRouter();

  const { classId } = query;

  const { data } = useSWRFetch<ClassDataType>(classId && `class/${classId}`);

  const { data: allStudent } = useSWRFetch<AttendanceReportData>(
    classId && `attendance/${classId}`
  );

  const { mutate } = useFetch();

  const handleAllPresent = async () => {
    try {
      setIsPresentLoading(true);

      const response = await mutate({
        path: "attendance/create",
        method: "POST",
        body: JSON.stringify({
          classId: classId,
          user: allStudent?.data?.map((item) => item?.student?._id),
          isPresent: true,
          isAbsent: false,
          isLeave: false,
        }),
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      notify.success(response?.data?.message);
      reload?.();
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! Something went wrong");
      }
    } finally {
      setIsPresentLoading(false);
    }
  };
  const handleAbsent = async () => {
    try {
      setIsAbsentLoading(true);
      const response = await mutate({
        path: "attendance/create",
        method: "POST",
        body: JSON.stringify({
          classId: classId,
          user: allStudent?.data?.map((item) => item?.student?._id),
          isPresent: false,
          isAbsent: true,
          isLeave: false,
        }),
      });

      if (response?.data?.error) throw new Error(response?.data?.error);

      notify.success(response?.data?.message);
      reload?.();
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! Something went wrong");
      }
    } finally {
      setIsAbsentLoading(false);
    }
  };

  return (
    <div className="w-full flex items-center justify-between bg-white shadow-lg  rounded-lg p-4 ">
      <div className="flex items-center justify-start gap-4 w-full ">
        <div className="w-fit h-fit">
          <img
            src={ClassIcon.src}
            alt="icon"
            className="h-16 w-16 object-contain bg-gray-50 shadow-md rounded-md"
          />
        </div>
        <div className="flex flex-col gap-3 w-full ">
          <h3 className="font-medium tracking-wide text-lg w-full ">
            {data?.data?.subject?.title} Class By{" "}
            {data?.data?.teacher?.displayName}
          </h3>
          <small className="tracking-wide w-full ">
            {data?.data?.batch?.branch?.title} |{" "}
            {data?.data?.batch?.course?.title} |{" "}
            {data?.data?.batch?.session?.title} |{" "}
            {data?.data?.credits && `Credit - ${data?.data?.credits}`}
          </small>
        </div>
      </div>
      <div className="flex items-center justify-end w-full gap-4 ">
        <Button
          className="hover:ring-theme"
          startIcon={
            isPresentLoading && (
              <ICONS.Loading className="animate-spin h-5 w-5 " />
            )
          }
          onClick={handleAllPresent}
        >
          Mark All Present
        </Button>
        <Button
          className="hover:ring-themeSecondary !bg-themeSecondary"
          onClick={handleAbsent}
          startIcon={
            isAbsentLoading && (
              <ICONS.Loading className="animate-spin h-5 w-5" />
            )
          }
        >
          Mark All Absent
        </Button>
      </div>
    </div>
  );
};

export default ClassDetails;
