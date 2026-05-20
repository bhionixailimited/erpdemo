import {
  AdminPanelSettings,
  Delete,
  DesignServices,
  Email,
  Flag,
  Phone,
  Visibility,
} from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import dayjs from "dayjs";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  caste?: string;
  gender?: string;
  displayName?: string;
  completedLesson?: number;
  mutate?: () => void;
  upcomingClass?: number;
  subjectOfInterest?: string[];
  language?: string[];
  email?: string;
  phoneNumber?: string;
  countryCode?: string;
  onEditClick?: () => void;
  photoUrl?: string;
  designation?: string;
  joinedAt?: string;
  location?: string;
  _id?: string;
  onAssignModuleClick?: () => void;
};

const TeacherCards = ({
  caste,
  gender,
  countryCode,
  email,
  displayName,
  phoneNumber,
  photoUrl,
  designation,
  joinedAt,
  _id,
  onEditClick,
  onAssignModuleClick,
  mutate,
}: Props) => {
  // console.log("caset-->", caste);
  const { mutate: staffDelete } = useFetch();
  const handleDelete = (id: any) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await staffDelete({
              path: `user/${id}`,
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
  const { push } = useRouter();

  return (
    <div className="w-full flex flex-col gap-2 items-center py-6 bg-white shadow-xl rounded-xl cursor-pointer select-none hover:scale-105 scale-100  transition-all ease-in-out duration-300 border-t-8 border-theme ">
      <Avatar
        src={photoUrl}
        sx={{
          height: "4.5rem",
          width: "4.5rem",
        }}
        className="!bg-[#5b50a1] border"
      >
        {displayName?.[0]}
      </Avatar>

      <div className="flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-center break-all">
          <div className="flex flex-row">
            <Tooltip title="User Permissions">
              <IconButton
                onClick={onAssignModuleClick}
                className="!text-4xl !text-yellow-500"
              >
                <AdminPanelSettings />
              </IconButton>
            </Tooltip>
            <IconButton className="relative z-50" onClick={onEditClick}>
              <Tooltip title="Edit Staff">
                <DesignServices className="text-blue-500" />
              </Tooltip>
            </IconButton>

            <IconButton
              className="relative z-50"
              onClick={() => push(`/panel/admin/staff/${_id}`)}
            >
              <Tooltip title="View Staff">
                <Visibility className="text-green-300" />
              </Tooltip>
            </IconButton>

            <IconButton
              className="relative z-50"
              onClick={() => handleDelete(`${_id}`)}
            >
              <Tooltip title="Delete Staff">
                <Delete className="text-red-500" />
              </Tooltip>
            </IconButton>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-md text-theme  tracking-wide text-center  px-2">
          {displayName}
        </h3>
      </div>
      <div className="flex items-center justify-center">
        <small className="text-gray-400">{designation}</small>
      </div>
      <div className="flex flex-col gap-2  text-gray-600 px-2 ">
        <span className="flex items-center gap-2 font-medium  ">
          <Email />
          <small className="tracking-wide break-all">{email}</small>
        </span>
        <span className="flex items-center gap-2 font-medium ">
          <Phone />
          <small className="tracking-wide ">
            {countryCode} {phoneNumber}
          </small>
        </span>
        <span className="flex items-center gap-2 font-medium ">
          <Flag />
          <small className="tracking-wide ">
            Joined {joinedAt ? dayjs(joinedAt).format("LL") : "(Not Provided)"}
          </small>
        </span>
        <span className="flex flex-row gap-2">
          <div className="flex items-center gap-2 font-medium">
            <p>👯</p>
            <small className="tracking-wide ">{gender}</small>
          </div>
          <div className="flex items-center gap-2 font-medium">
            <p>🔶</p>
            <small className="tracking-wide ">{caste}</small>
          </div>
        </span>
      </div>
    </div>
  );
};

export default TeacherCards;
