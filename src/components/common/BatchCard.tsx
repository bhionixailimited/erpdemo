import { ContentCopy } from "@mui/icons-material";
import { Avatar, Divider, IconButton } from "@mui/material";
import { StudentsIcon } from "assets/static-icon";
import { Button } from "components/core";
import { useAuth } from "hooks";
import { useRouter } from "next/router";
import { notify } from "utils";

const BatchCard = ({ data, mutate }: any) => {
  const { push } = useRouter();

  const { user } = useAuth();
  // console.log("data BatchCard--->", data?.isExBatch);
  const handleCopy = () => {
    navigator.clipboard
      .writeText(data?._id)
      .then(() => notify.success("Copied successfully"))
      .catch((e) =>
        notify.error(e instanceof Error ? e?.message : "Could not copy")
      );
  };

  return (
    <div className="w-full rounded-lg shadow-xl flex flex-col gap-4 items-center tracking-wide p-4 bg-white ">
      <Avatar
        src={data?.iconUrl || StudentsIcon.src}
        className="!h-20 p-2 !w-20 !bg-gray-200"
      >
        Batch
      </Avatar>
      <h3 className="font-medium tracking-wide text-lg">
        {data?.course?.title
          ? data?.course?.title + " " + (data?.branch?.title || "")
          : ""}
      </h3>
      <small className="tracking-wide font-medium text-xl text-gray-500">
        {data?.session?.title ? `${data?.session?.title}` : ""}
      </small>
      {/* {data?.isExBatch && (
        <div className="flex gap-3">
          <h3 className="text-gray-500 tracking-wide text-sm font-medium">
            ( EX-BATCH )
          </h3>
        </div>
      )} */}
      <div className="flex items-center gap-4">
        <small className="font-bold tracking-wide">ID : {data?._id}</small>
        <IconButton onClick={handleCopy}>
          <ContentCopy />
        </IconButton>
      </div>

      <div className="flex gap-4">
        <Button
          className="hover:!ring-theme"
          onClick={() =>
            push(
              `/panel/${
                user?.role?.toLowerCase() === "teacher" ? "teacher" : "admin"
              }/batch/${data?._id}`
            )
          }
        >
          View Details
        </Button>
      </div>

      <Divider />
      {/* <div className="flex gap-4 items-start">
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-medium tracking-wide text-sm">Total Student</h3>
          <small className="tracking-wide font-semibold text-gray-600">
            {data?.student}
          </small>
        </div>
        <div className="flex flex-col items-center gap-4">
          <h3 className="font-medium tracking-wide text-sm">Total Classes</h3>
          <small className="tracking-wide font-semibold text-gray-600">
            {data?.totalClasses}
          </small>
        </div>
      </div> */}
    </div>
  );
};

export default BatchCard;
