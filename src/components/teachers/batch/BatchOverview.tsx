import {
  ArrowUpward,
  BatchPrediction,
  CalendarToday,
  CastForEducation,
  ContentCopy,
  Delete,
  DesignServices,
  DoneAll,
  Numbers,
  People,
  School,
  Timelapse,
  ViewStream,
} from "@mui/icons-material";
import { IconButton, Skeleton, Chip } from "@mui/material";
import { AddBatchPromoteDialog } from "components/admin/dialog";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import BranchType from "types/branch";
import CourseType from "types/course";
import SessionType from "types/session";
import UserType from "types/user";
import { notify } from "utils";
type singleBatchType = {
  data: {
    _id: string;
    branch: BranchType;
    course: CourseType;
    description: string;
    headOfDepartment: UserType;
    isBatchCompleted: boolean;
    maximumStudent: number;
    session: SessionType;
    totalClasses: number;
    totalStudents: number;
    createdAt: string;
    batchSection: any;
    isExBatch: boolean;
  };
};
const BatchOverview = () => {
  const { query, push } = useRouter();

  const { batchId } = query;
  const {
    data: batch,
    mutate,
    isValidating,
  } = useSWRFetch<singleBatchType>(`batch/${batchId}`);
  const { mutate: teacher } = useFetch();

  const { user } = useAuth();

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
            const response = await teacher({
              path: `batch/delete/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            push(
              `/panel/${
                user?.role?.toLowerCase() === "teacher" ? "teacher" : "admin"
              }/batch`
            );
            resolve(response?.data?.message);
          });
      });
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Oops! Something went wrong. Please try again.");
      }
    }
  };

  const handleBatchCompleted = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Complete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await teacher({
              path: `batch/update/${id}`,
              method: "PUT",
              body: JSON.stringify({
                isBatchCompleted: true,
              }),
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
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Oops! Something went wrong. Please try again.");
      }
    }
  };
  const handlePromote = async (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, Complete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await teacher({
              path: `batch/class-promote/${id}`,
              method: "POST",
              // body: JSON.stringify({
              //   isBatchCompleted: true,
              // }),
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
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error.message);
      } else {
        notify.error("Oops! Something went wrong. Please try again.");
      }
    }
  };
  const handleCopy = () => {
    batch?.data?._id &&
      navigator.clipboard
        .writeText(batch?.data?._id)
        .then(() => notify.success("Copied successfully"))
        .catch((e) =>
          notify.error(e instanceof Error ? e?.message : "Could not copy")
        );
  };

  if (isValidating) {
    return (
      <div className="w-full flex flex-col gap-4 mb-8 bg-white shadow-lg rounded-lg p-4  ">
        <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
          <h3 className="font-semibold tracking-wide text-theme  text-3xl w-fit  py-2 ">
            <Skeleton
              width={150}
              height={30}
              animation="wave"
              variant="rounded"
            />
          </h3>

          <div className="w-fit flex items-center gap-2">
            <Skeleton
              width={100}
              height={40}
              animation="wave"
              variant="rounded"
            />

            <Skeleton
              width={100}
              height={40}
              animation="wave"
              variant="rounded"
            />
          </div>
        </div>

        <Skeleton width={400} height={40} animation="wave" variant="rounded" />

        <div className="grid grid-cols-12  gap-4">
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <Skeleton
                animation="wave"
                width={50}
                height={50}
                variant="rounded"
              />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                <Skeleton animation="wave" width={50} variant="text" />
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                <Skeleton animation="wave" width={150} variant="text" />
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                <Skeleton animation="wave" width={50} variant="text" />
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                <Skeleton animation="wave" width={150} variant="text" />
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                <Skeleton animation="wave" width={50} variant="text" />
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                <Skeleton animation="wave" width={150} variant="text" />
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                <Skeleton animation="wave" width={50} variant="text" />
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                <Skeleton animation="wave" width={150} variant="text" />
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                <Skeleton animation="wave" width={50} variant="text" />
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                <Skeleton animation="wave" width={150} variant="text" />
              </h3>
            </span>
          </div>
          <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                <Skeleton animation="wave" width={50} variant="text" />
              </h3>
              <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
                <Skeleton animation="wave" width={150} variant="text" />
              </h3>
            </span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-4 mb-8 bg-white shadow-lg rounded-lg p-4  ">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <div className="flex items-center gap-8">
          <h3 className="font-semibold tracking-wide text-theme  text-3xl w-fit  py-2 ">
            Batch Summary
          </h3>
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-4">
              <small className="font-bold tracking-wide">
                ( ID : {batch?.data?._id})
              </small>
              <IconButton onClick={handleCopy}>
                <ContentCopy fontSize="small" />
              </IconButton>
            </div>
            {/* {batch?.data?.isExBatch && (
              <div className="flex gap-3">
                <span className="">
                  <h3 className="text-gray-700 tracking-wide text-sm font-medium">
                    ( EX-BATCH )
                  </h3>
                </span>
              </div>
            )} */}
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-4">
          {(["SUPER_ADMIN", "ADMIN"]?.includes(String(user?.role)) ||
            batch?.data?.headOfDepartment?._id === user?._id) && (
            <Button
              disabled={batch?.data && batch?.data?.isBatchCompleted}
              className="whitespace-nowrap"
              startIcon={<DoneAll />}
              onClick={() => handleBatchCompleted(batch?.data?._id as string)}
            >
              Batch Completed
            </Button>
          )}
          {user?.role !== "TEACHER" && (
            <div className="w-fit flex items-center gap-2">
              <Button
                startIcon={<DesignServices />}
                type="button"
                className="!shadow-none"
                onClick={() =>
                  push(
                    `/panel/admin/batch/create?edit=true&batchId=${batch?.data?._id}`
                  )
                }
              >
                Edit
              </Button>
              {(["SUPER_ADMIN", "ADMIN"]?.includes(String(user?.role)) ||
                batch?.data?.headOfDepartment?._id === user?._id) && (
                <Button
                  startIcon={<Delete />}
                  className="hover:!ring-themeSecondary !bg-themeSecondary"
                  onClick={() => handleDelete(batch?.data?._id as string)}
                >
                  Delete
                </Button>
              )}
              {(["SUPER_ADMIN", "ADMIN"]?.includes(String(user?.role)) ||
                batch?.data?.headOfDepartment?._id === user?._id) && (
                <AddBatchPromoteDialog mutate={mutate} />
              )}
            </div>
          )}
        </div>
      </div>

      <p className="w-full tracking-wide text-sm">
        {batch?.data?.description && batch?.data?.description}
      </p>

      <div className="grid grid-cols-12  gap-4">
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <ViewStream className="text-gray-500" />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Batch Title
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {batch?.data?.course?.title
                ? batch?.data?.course?.title +
                  " " +
                  (batch?.data?.branch?.title || "")
                : ""}
            </h3>
          </span>
        </div>

        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <CalendarToday className="text-gray-500" />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Created Date
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {dayjs(batch?.data?.createdAt).format("ll")}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <School className="text-gray-500" />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Course
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {batch?.data?.course?.title}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <Timelapse className="text-gray-500" />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Sessions
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {batch?.data?.session?.title}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <Numbers className="text-gray-500" />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Total Class
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {batch?.data?.totalClasses && batch?.data?.totalClasses}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4 ">
          <span className="flex items-center justify-center">
            <People className="text-gray-500 " />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Total Students
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {batch?.data?.totalStudents && batch?.data?.totalStudents}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <CastForEducation className="text-gray-500 " />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              H.O.D.
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {batch?.data?.headOfDepartment?.displayName ?? "Not Available"}
            </h3>
          </span>
        </div>
        {/*---------------------- batch section -----------------------*/}
        <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            <BatchPrediction className="text-gray-500" />
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              Batch-Sections
            </h3>
            {batch?.data?.batchSection?.length > 0 ? (
              <small className="flex flex-row">
                {batch?.data?.batchSection?.map((item: any, i: number) => (
                  <Chip
                    key={i}
                    className="m-1 !bg-theme !text-white"
                    label={item}
                  />
                ))}
              </small>
            ) : (
              "No Section Available"
            )}
          </span>
        </div>
        {/*---------------------- EX- Batch -----------------------*/}
        {/* {batch?.data?.isExBatch && (
          <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
            <span className="flex items-center justify-center">
              <CastForEducation className="text-gray-500 " />
            </span>
            <span className="flex flex-col gap-2">
              <h3 className="text-gray-500 tracking-wide text-sm font-medium">
                ( EX-BATCH )
              </h3>
            </span>
          </div>
        )} */}
      </div>
    </div>
  );
};

export default BatchOverview;
