import { Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import SubjectType from "types/subject";
import UserType from "types/user";

type TimetableType = {
  data: {
    day: string;
    _id: string;
    classes: {
      batch: {
        _id: string;
        branch: BranchType;
        course: CourseType;
        session: SessionType;
      };
      classRoom: string;
      credits: number;
      endTime: string;
      startTime: string;
      subject: SubjectType;
    }[];
    timetable: {
      classRoom: string;
      credits: number;
      endTime: string;
      startTime: string;
      subject: SubjectType;
      teacher: UserType;
    }[];
  }[];
};

const Calendar = () => {
  const { user } = useAuth();

  const { data, isValidating } = useSWRFetch<TimetableType>(
    user?.role &&
      user?._id &&
      (user?.role === "TEACHER"
        ? `teacher/timetable/${user?._id}`
        : `student/timetable`)
  );

  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return (
    <div className="w-full  shadow-xl bg-white rounded-lg p-4 mt-8 border my-8 overflow-hidden overflow-x-auto ">
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center">
          <h3 className="font-semibold tracking-wide text-themeSecondary text-2xl">
            Timetable
          </h3>
        </span>
      </div>
      <div className="w-full grid min-w-[768px]  grid-cols-6 gap-4 px-4 mt-4 ">
        {days?.map((item) => (
          <h3
            className="font-semibold tracking-wide text-theme text-base text-center "
            key={item}
          >
            {item}
          </h3>
        ))}
      </div>
      <div className="w-full min-w-[768px]   grid grid-cols-6 gap-2 xl:gap-4 py-4">
        {isValidating ? (
          <>
            {Array(9)
              .fill(0)
              .map((item, index) => (
                <Skeleton height={300} key={index} animation="wave" />
              ))}
          </>
        ) : (
          <>
            {days?.map((item, index) => (
              <div className="flex flex-col gap-2 xl:gap-4" key={item}>
                {data?.data?.map((innerItem) => {
                  if (innerItem?.day?.toLowerCase() === item?.toLowerCase()) {
                    return innerItem?.classes?.map((classItem) => (
                      <span
                        className={`flex flex-col p-2 2xl:p-4  justify-between h-30 xl:h-36 2xl:h-44 bg-white shadow-xl rounded-lg  border  ${
                          index > 30 ? "!bg-themeSecondary/20" : ""
                        } `}
                        key={classItem?.startTime}
                      >
                        <h3
                          className={`font-medium text-themeSecondary tracking-wide text-xs  md:text-[12px]  `}
                        >
                          {dayjs(classItem?.startTime).format("hh:mm A")}-{" "}
                          {dayjs(classItem?.endTime).format("hh:mm A")}
                        </h3>
                        <span className="flex flex-col gap-2 items-start">
                          <small className="text-theme tracking-wide font-medium text-xs lg:text-sm  xl:text-base 2xl:text-xl">
                            {classItem?.batch?.course?.title}-
                            {classItem?.batch?.branch?.title}
                          </small>
                          <small className="text-gray-900 tracking-wide font-medium text-xs ">
                            {classItem?.batch?.session?.title}
                          </small>
                          <span className="flex items-center flex-wrap gap-2 md:gap-4">
                            <small className="xl:text-xs text-[10px] tracking-wide text-white bg-theme w-fit px-2 py-1 rounded-md ">
                              {classItem?.subject?.title}
                            </small>

                            <small className="xl:text-xs text-[10px] tracking-wide text-white bg-themeSecondary w-fit px-2 py-1 rounded-md ">
                              {classItem?.classRoom}
                            </small>
                          </span>
                        </span>
                      </span>
                    ));
                  } else if (
                    innerItem?._id?.toLowerCase() === item?.toLowerCase()
                  ) {
                    return innerItem?.timetable?.map((classItem) => (
                      <span
                        className={`flex flex-col p-2 2xl:p-4  justify-between h-30 xl:h-36 2xl:h-44 bg-white shadow-xl rounded-lg  border  ${
                          index > 30 ? "!bg-themeSecondary/20" : ""
                        } `}
                        key={classItem?.startTime}
                      >
                        <h3
                          className={`font-medium text-themeSecondary tracking-wide  text-[12px]  `}
                        >
                          {dayjs(classItem?.startTime).format("hh:mm A")}-{" "}
                          {dayjs(classItem?.endTime).format("hh:mm A")}
                        </h3>
                        <span className="flex flex-col gap-2 items-start">
                          <small className="text-gray-900 tracking-wide font-medium text-xs ">
                            {classItem?.teacher?.displayName}{" "}
                            {classItem?.teacher?.displayName
                              ? classItem?.teacher?.gender === "MALE"
                                ? "Sir"
                                : "Mam"
                              : "Not Available"}
                          </small>
                          <span className="flex flex-wrap items-center gap-1 md:gap-4">
                            <small className="xl:text-xs text-[10px] tracking-wide text-white bg-theme w-fit px-2 py-1 rounded-md ">
                              {classItem?.subject?.title}
                            </small>

                            <small className="xl:text-xs text-[10px] tracking-wide text-white bg-themeSecondary w-fit px-2 py-1 rounded-md ">
                              {classItem?.classRoom || "N/A"}
                            </small>
                          </span>
                        </span>
                      </span>
                    ));
                  } else {
                    <></>;
                  }
                })}
              </div>
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Calendar;
