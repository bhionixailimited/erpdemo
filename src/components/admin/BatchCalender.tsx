import { Delete, Print } from "@mui/icons-material";
import { IconButton, Skeleton } from "@mui/material";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import Swal from "sweetalert2";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import SubjectType from "types/subject";
import { notify } from "utils";
import { TimeTableConfigDialog, TimeTableEditDialog } from "./dialog";

const days = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

type TimetableType = {
  data: {
    day: string;
    _id: string;

    timetable: {
      teacher: {
        _id: string;
        displayName: string;
      };
      batch: {
        _id: string;
        branch: BranchType;
        course: CourseType;
        session: SessionType;
      };
      _id: string;
      classRoom: string;
      credits: number;
      endTime: string;
      startTime: string;
      subject: SubjectType;
    }[];
  }[];
};

export default function BatchCalender({
  day,
  refetch,
  selectBatchSectionName,
  viewOnly = false,
}: any) {
  const { batchId } = useRouter().query;
  const { mutate: timetableD } = useFetch();
  const {
    data: batchTime,
    isValidating,
    mutate,
  } = useSWRFetch<TimetableType>(
    batchId &&
      `batch/${batchId}/timetable${
        selectBatchSectionName ? "?section=" + selectBatchSectionName : ""
      }`
  );
  const handleDelete = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await timetableD({
              path: `batch/timetable/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    mutate?.();
  }, [refetch]);
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    bodyClass: "px-4",
  });

  const queryData = useRouter().query?.batchId;

  const handleDeleteTimeTable = async (queryData: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await timetableD({
              path:
                `delete/auto/time-table/${queryData}` +
                (selectBatchSectionName
                  ? `?section=${selectBatchSectionName}`
                  : ""),
              // path: `batch/timetable/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full shadow-xl bg-white rounded-lg p-4 mt-8 border my-8 overflow-hidden overflow-x-auto">
      <div className="flex w-full items-center justify-between">
        <span className="flex items-center">
          <h3 className="font-semibold tracking-wide text-themeSecondary text-2xl">
            Timetable
          </h3>
          {!viewOnly ? (
            <TimeTableConfigDialog
              mutate={mutate}
              selectBatchSectionName={selectBatchSectionName}
            />
          ) : null}

          {viewOnly ? (
            <IconButton onClick={handlePrint}>
              <Print />
            </IconButton>
          ) : null}
          {!viewOnly ? (
            <IconButton
              className="!text-red-500"
              onClick={() => handleDeleteTimeTable(queryData)}
            >
              <Delete />
            </IconButton>
          ) : null}
        </span>
      </div>
      <section ref={componentRef}>
        {/* Day names map here */}
        <div className="w-full grid  grid-cols-6 gap-4 px-4 mt-4 min-w-[768px] ">
          {days?.map((item) => (
            <h3
              className="font-semibold tracking-wide text-theme text-base text-center "
              key={item}
            >
              {item}
            </h3>
          ))}
        </div>
        {/* Timetable Cards Map Here */}
        <div className="w-full  grid grid-cols-6 gap-2 xl:gap-4 py-4 min-w-[768px] ">
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
                <div className="flex flex-col gap-2 xl:gap-4 w-full" key={item}>
                  {batchTime?.data?.map((innerItem) => {
                    if (innerItem?._id?.toLowerCase() === item?.toLowerCase()) {
                      return innerItem?.timetable?.map((classItem) => (
                        <span
                          className={`grid gap-1 p-2 2xl:p-4 justify-between bg-white shadow-xl rounded-lg border ${
                            index > 30 ? "!bg-themeSecondary/20" : ""
                          } `}
                          key={classItem?.startTime}
                        >
                          <div className="flex gap-2 w-full justify-between">
                            <>
                              <h3
                                className={`font-medium text-themeSecondary tracking-wide  text-[0.6rem] mt-3 hover:scale-110 transition-all`}
                              >
                                {dayjs(classItem?.startTime).format("hh:mm A")}-{" "}
                                {dayjs(classItem?.endTime).format("hh:mm A")}
                              </h3>
                              {day && (
                                <div className="">
                                  <TimeTableEditDialog
                                    item={classItem}
                                    mutate={mutate}
                                  />
                                  <IconButton
                                    onClick={() => handleDelete(classItem?._id)}
                                  >
                                    <Delete
                                      fontSize={"small"}
                                      className="text-red-600"
                                    />
                                  </IconButton>
                                </div>
                              )}
                            </>
                          </div>
                          <span className="flex flex-col gap-2 items-start">
                            <small className="text-theme tracking-wide font-medium text-xs md:text-base">
                              {classItem?.teacher?.displayName}
                            </small>
                            <small className="text-gray-900 tracking-wide font-medium text-xs">
                              {classItem?.batch?.session?.title}
                            </small>
                            <span className="flex flex-wrap items-center gap-1">
                              <small className="xl:text-xs text-[10px] tracking-wide text-white bg-theme w-fit px-2 py-1 rounded-md ">
                                {classItem?.subject?.title}
                              </small>
                              {classItem?.classRoom && (
                                <small className="xl:text-xs text-[10px] tracking-wide text-white bg-themeSecondary w-fit px-2 py-1 rounded-md ">
                                  {classItem?.classRoom}
                                </small>
                              )}
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
      </section>
    </div>
  );
}
