import {
  Delete,
  Email,
  LocalPhone,
  School,
  Verified,
  Wysiwyg,
} from "@mui/icons-material";
import { Avatar, Divider, IconButton, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import { notify } from "utils";

const StudentPlacementCard = ({
  item,
  onClick,
  applicationId,
  isSelected,
  mutate: reload,
}: {
  item: any;
  onClick?: () => void;
  applicationId: string;
  isSelected: boolean;
  mutate?: () => void;
}) => {
  const { mutate } = useFetch();

  const handleMovedStudent = async () => {
    try {
      const response = await mutate({
        path: `placement-report/move/${applicationId}`,
        method: "POST",
        isFormData: false,
      });

      if (response?.status !== 200) throw new Error(response?.data?.error);

      notify.success("Student added to placed student");
      reload?.();
    } catch (error) {
      if (error instanceof Error) {
        return notify.error(error?.message);
      }
      notify.error("something went wrong!");
    }
  };
  const handleDeleteApplication = async () => {
    try {
      const response = await mutate({
        path: `placement/apply/${applicationId}`,
        method: "DELETE",
        isFormData: false,
      });

      if (response?.status !== 200) throw new Error(response?.data?.error);
      notify.success("Application Deleted");
      reload?.();
    } catch (error) {
      if (error instanceof Error) {
        return notify.error(error?.message);
      }
      notify.error("something went wrong!");
    }
  };

  return (
    <div className="w-full bg-white shadow-xl rounded-lg p-4 scale-100 hover:scale-95 duration-300 ease-in-out transition-all cursor-pointer select-none ">
      <div className="w-full flex gap-4 items-start">
        <div className="flex items-center justify-center w-fit">
          <Avatar
            src={item?.photoUrl}
            sx={{
              height: "5rem",
              width: "5rem",
            }}
            className="!bg-gray-100 !shadow-lg "
          >
            {item?.displayName?.[0]}
          </Avatar>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="font-semibold tracking-wide text-xl">
            {item?.displayName}
          </h3>
          <small className="tracking-wide text-gray-500">
            {item?.["academic-details"]?.registrationNumber}
          </small>
          <small className="tracking-wide bg-theme px-2 py-1 text-white rounded-md !shadow-lg">
            {`${item?.["academic-details"]?.batch?.course?.title} ${item?.["academic-details"]?.batch?.branch?.title} ${item?.["academic-details"]?.batch?.session?.title}`}
          </small>
        </div>
      </div>
      <Divider className="!my-4" />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold tracking-wide text-base">
          Contact Info -
        </h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-4">
            <Email className="text-theme" />
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {item?.email}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <LocalPhone className="text-theme" />
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {item?.phoneNumber}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center flex-wrap gap-2">
        {isSelected ? (
          <div className="flex gap-2 bg-instagram px-4 py-2 mt-4  w-fit items-center rounded-full">
            <small className="text-gray-50">Selected</small>
            <Verified className="!text-yellow-500" />
          </div>
        ) : null}
        <div className="flex flex-col gap-2 mt-4">
          <Tooltip title="View Resume">
            <IconButton onClick={onClick}>
              <Wysiwyg className="!text-theme !text-4xl" />
            </IconButton>
          </Tooltip>
        </div>

        <div className="flex flex-col gap-2 mt-4">
          <Tooltip title="Move to placed student">
            <IconButton onClick={handleMovedStudent}>
              <School className="!text-whatsapp !text-4xl" />
            </IconButton>
          </Tooltip>
        </div>
        <div className="flex flex-col gap-2 mt-4">
          <Tooltip title="Delete Application">
            <IconButton onClick={handleDeleteApplication}>
              <Delete className="text-red-500 !text-4xl" />
            </IconButton>
          </Tooltip>
        </div>
      </div>
    </div>
  );
};

export default StudentPlacementCard;
