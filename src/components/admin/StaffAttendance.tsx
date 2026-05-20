import {
  KeyboardDoubleArrowLeft,
  KeyboardDoubleArrowRight,
} from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { BASE_URL } from "configs";
import { useFetch, useSWRFetch } from "hooks";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import { AssignmentType } from "types/assignment";
import SingleStaffAttendance from "./SingleStaffAttendance";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
type AttendanceType = {
  data: {
    statistic: {
      totalAbsent: number;
      totalClass: number;
      totalLeave: number;
      totalPresent: number;
    };
    attendance: {
      _id: string;
      createdAt: string;
      isAbsent: boolean;
      isOnLeave: boolean;
      isPresent: boolean;
      month: number;
      updatedAt: number;
      year: number;
    }[];
  };
};
//
const StaffAttendance = ({ staffId }: { staffId?: string }) => {
  const [data, setData] = useState<any>();

  const attendanceStat = useMemo(() => {
    return [
      {
        id: 2,
        title: "Attend",
        count: data?.data?.data?.data?.statistic?.totalPresent || 0,
      },
      {
        id: 3,
        title: "Absent",
        count: data?.data?.data?.data?.statistic?.totalAbsent || 0,
      },
      {
        id: 4,
        title: "Total Leave",
        count: data?.data?.data?.data?.statistic?.totalLeave || 0,
      },
    ];
  }, [data?.data?.data?.data?.statistic]);
  const [date, setDate] = useState<any>(new Date().toISOString());

  const { mutate } = useFetch();
  useEffect(() => {
    (async () => {
      const response = await mutate({
        path: `staff/attendance/${staffId}`,
        method: "POST",
        body: JSON.stringify({
          date: date,
        }),
      });

      setData(response);
    })();
  }, [date, staffId]);

  return (
    <div>
      <div className="w-full p-4 border-[1px] border-gray-300 bg-gray-100 rounded-md">
        <div className="w-full">
          <div className="flex md:w-11/12 w-full p-2 rounded-lg">
            <div className="w-full flex items-center justify-center">
              <div className="md:w-2/3 w-full md:p-6 b  h-full  rounded-xl  flex items-center justify-center px-2">
                <div className="grid grid-cols-12">
                  {attendanceStat?.map((item: any) => (
                    <div
                      className="col-span-4 md:col-span-6 lg:col-span-4 xl:col-span-3 "
                      key={item._id}
                    >
                      <div className="flex flex-col items-center justify-center gap-1">
                        <p className="md:text-xl text-sm font-semibold ">
                          {item.title}
                        </p>
                        <p className="md:text-3xl text-lg font-bold text-theme">
                          {item.count}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col w-full">
          <SingleStaffAttendance
            loading={!data}
            date={date}
            setDate={setDate}
            attendanceData={data?.data?.data?.data?.attendance}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffAttendance;
