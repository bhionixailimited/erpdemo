import { ChevronRight } from "@mui/icons-material";
import { Button, Divider, Skeleton } from "@mui/material";
import { UpcomingNewIcon } from "assets/static-icon";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import BatchType from "types/batch";
import SubjectType from "types/subject";

type UpcomingClassType = {
  data: {
    batch: BatchType;
    cancelled: boolean;
    endTime: string;
    isHoliday: boolean;
    startTime: string;
    subject: SubjectType;
    type: "ONLINE" | "OFFLINE";
    _id: string;
  }[];
};

const UpComingCommon = () => {
  const router = useRouter();

  const { user } = useAuth();

  const { data, isValidating } = useSWRFetch<UpcomingClassType>(
    user?._id && `teacher/class/${user?._id}`
  );

  return (
    <div className="flex flex-col border shadow-xl rounded-xl overflow-hidden p-6 w-full gap-3 relative ">
      <h3 className="font-semibold tracking-wide text-lg ">Upcoming Classes</h3>
      <div className="flex flex-col gap-4">
        {isValidating || !data ? (
          Array(3)
            .fill(0)
            .map((item, index) => (
              <div className="flex gap-4 h-20 items-center" key={index}>
                <Skeleton height={100} width={100} animation="wave" />
                <div className="flex flex-col  gap-4">
                  <Skeleton width={250} animation="wave" />
                  <Skeleton width={350} animation="wave" />
                </div>
              </div>
            ))
        ) : data?.data && data?.data?.length ? (
          data?.data?.slice(0, 5)?.map((item) => (
            <div
              key={item?._id}
              className="flex flex-row gap-4 items-center  border p-2 rounded-md"
            >
              <div className="w-1/4 rounded-lg flex items-center justify-center">
                <img
                  src={UpcomingNewIcon.src}
                  alt="upcoming class"
                  className="w-16 h-16"
                />
              </div>
              <div className="flex flex-col items-start w-3/4">
                <h3 className="font-medium tracking-wide text-sm">
                  {item?.subject?.title}
                </h3>
                <small className="text-gray-400 tracking-wide">
                  Start At {dayjs(item?.startTime).format("h:mm A")}
                </small>
              </div>
            </div>
          ))
        ) : (
          <Empty title="Empty 🙂" />
        )}
      </div>
      <div className="!text-right p-4 absolute left-0 w-full bottom-0  bg-white">
        <Divider />
        <Button
          onClick={() => router.push("/panel/teacher/timetable")}
          size="small"
          className="!font-bold !text-slate-600 !ml-0!text-xs normal-case mt-2"
          endIcon={<ChevronRight className=" !text-2xl " />}
        >
          View All
        </Button>
      </div>
    </div>
  );
};

export default UpComingCommon;
