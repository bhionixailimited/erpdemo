import {
  CalendarToday,
  Delete,
  MenuBookRounded,
  Numbers,
  People,
  ViewStream,
} from "@mui/icons-material";
import { Skeleton } from "@mui/material";
import { EditAssignmentDialog } from "components/admin/dialog";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useAuth, useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { AssignmentType } from "types/assignment";
import { notify } from "utils";
type dataType = {
  data: AssignmentType;
};
const AssignmentDetails = () => {
  const { user } = useAuth();
  const { assignmentId } = useRouter()?.query;
  const Push = useRouter()?.push;
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    assignmentId && `assignment/stat/${assignmentId}`
  );
  const { mutate: deleteA } = useFetch();
  const handleDelete = async () => {
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
            const response = await deleteA({
              path: `assignment/delete/${assignmentId}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            Push(`/panel/${user?.role?.toLowerCase()}/assignment`);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-full flex flex-col gap-4 mb-8 bg-white shadow-lg rounded-lg p-4  ">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4 justify-between">
        <h3 className="font-semibold tracking-wide text-theme text-xl md:text-3xl w-fit  py-2 ">
          {isValidating ? (
            <Skeleton
              width={150}
              height={30}
              animation="wave"
              variant="rounded"
            />
          ) : (
            "Assignment Summary"
          )}
        </h3>

        <div className="w-fit flex items-center gap-2">
          {isValidating ? (
            <Skeleton
              width={100}
              height={40}
              animation="wave"
              variant="rounded"
            />
          ) : (
            <EditAssignmentDialog Dmutate={mutate} />
          )}
          {isValidating ? (
            <Skeleton
              width={100}
              height={40}
              animation="wave"
              variant="rounded"
            />
          ) : (
            <Button
              onClick={() => handleDelete()}
              className="hover:!ring-themeSecondary !bg-themeSecondary"
              startIcon={<Delete />}
            >
              Delete
            </Button>
          )}
        </div>
      </div>

      {isValidating ? (
        <Skeleton width={400} height={40} animation="wave" variant="rounded" />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: `${data?.data?.introduction || "Not Provided"}`,
          }}
          className="w-full tracking-wide text-sm"
        ></div>
      )}

      <div className="grid grid-cols-12  gap-4">
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            {isValidating ? (
              <Skeleton
                animation="wave"
                width={50}
                height={50}
                variant="rounded"
              />
            ) : (
              <ViewStream className="text-gray-500" />
            )}
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={50} variant="text" />
              ) : (
                "Assignments Title"
              )}
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={150} variant="text" />
              ) : (
                `${data?.data?.title || "Not Provided"}`
              )}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            {isValidating ? (
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            ) : (
              <CalendarToday className="text-gray-500" />
            )}
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={50} variant="text" />
              ) : (
                "Assignments Dates"
              )}
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={150} variant="text" />
              ) : (
                `${dayjs(data?.data?.dateOfAssignment).format("LL")} -
        ${dayjs(data?.data?.dueDate).format("LL")}`
              )}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            {isValidating ? (
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            ) : (
              <Numbers className="text-gray-500" />
            )}
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={50} variant="text" />
              ) : (
                "Total Question"
              )}
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={150} variant="text" />
              ) : (
                `${data?.data?.totalQuestions ?? "Not Provided"}`
              )}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            {isValidating ? (
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            ) : (
              <People className="text-gray-500 " />
            )}
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={50} variant="text" />
              ) : (
                "Total Submission"
              )}
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={150} variant="text" />
              ) : (
                `${data?.data?.totalSubmitted ?? "Not Provided"}`
              )}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 lg:col-span-6  xl:col-span-12 2xl:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            {isValidating ? (
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            ) : (
              <People className="text-gray-500 " />
            )}
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={50} variant="text" />
              ) : (
                " Not Submitted"
              )}
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={150} variant="text" />
              ) : (
                `${
                  data?.data?.totalStudent &&
                  data?.data?.totalStudent - data?.data?.totalSubmitted
                }`
              )}
            </h3>
          </span>
        </div>
        <div className="w-full col-span-12 md:col-span-6 flex items-center gap-4">
          <span className="flex items-center justify-center">
            {isValidating ? (
              <Skeleton
                animation="wave"
                height={50}
                width={50}
                variant="rounded"
              />
            ) : (
              <MenuBookRounded className="text-gray-500" />
            )}
          </span>
          <span className="flex flex-col gap-2">
            <h3 className="text-gray-500 tracking-wide text-sm font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={50} variant="text" />
              ) : (
                "Batch"
              )}
            </h3>
            <h3 className="text-gray-600 tracking-wide text-lg   font-medium">
              {isValidating ? (
                <Skeleton animation="wave" width={150} variant="text" />
              ) : (
                `${
                  data?.data?.batch
                    ? `${data?.data?.batch?.course?.title} ${data?.data?.batch?.branch?.title} (${data?.data?.batch?.session?.title})`
                    : ""
                }`
              )}
            </h3>
          </span>
        </div>
      </div>
    </div>
  );
};

export default AssignmentDetails;
