import { Skeleton } from "@mui/material";
import { ClassCard } from "components/common";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";

type Props = {
  type?: "STUDENT" | "TEACHER";
};

type UpcomingTimetableTypes = {
  data: any[];
};

const UpcomingTimetableClass = ({ type }: Props) => {
  const { user } = useAuth();

  const { data, isValidating } = useSWRFetch<UpcomingTimetableTypes>(
    type === "STUDENT"
      ? `dashboard/student/get-upcoming-class`
      : user?._id && `teacher/class/${user?._id}`
  );

  const { push } = useRouter();

  return (
    <div className="w-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-xl tracking-wide xl:mt-8 p-4">
      <h3 className="font-semibold tracking-wide  text-theme text-lg">
        Class List
      </h3>
      <small className="tracking-wide text-gray-500 font-medium">
        Upcoming class today
      </small>
      <div className="flex gap-4 pt-4  flex-wrap">
        {!user?._id || !data || isValidating ? (
          Array(4)
            .fill(0)
            .map((item, index) => (
              <div
                className="w-full flex flex-col shadow-xl max-w-[380px] rounded-xl overflow-hidden relative bg-white cursor-pointer select-none scale-100 duration-300 ease-in-out hover:scale-95 border-b-8 border-b-theme "
                key={index}
              >
                <div className="w-full p-4">
                  <Skeleton height={70} animation="wave" />
                </div>

                <div className="w-full  px-4 pb-4 flex flex-col gap-2 ">
                  {<Skeleton width={100} animation="wave" />}
                  <h3 className="font-semibold  tracking-wide text-xl">
                    {<Skeleton width={200} height={40} animation="wave" />}{" "}
                    <Skeleton animation="wave" />
                  </h3>
                  <div className="flex items-center gap-4">
                    <Skeleton width={80} animation="wave" />
                  </div>
                </div>
              </div>
            ))
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <ClassCard
              key={item?._id}
              batch={item?.batch}
              cancelled={item?.cancelled}
              classRoom={item?.classRoom}
              endTime={item?.endTime}
              isHoliday={item?.isHoliday}
              startTime={item?.startTime}
              subject={item?.subject}
              type={item?.type}
              teacher={item?.teacher}
              onClick={() => {
                if (type !== "STUDENT") {
                  push(`/panel/teacher/class/${item?._id}`);
                }
              }}
            />
          ))
        ) : (
          <Empty title="No class Today" height={200} width={200} />
        )}
      </div>
    </div>
  );
};

export default UpcomingTimetableClass;
