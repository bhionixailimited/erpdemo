import {
  AdminPanelSettings,
  Delete,
  DesignServices,
  Email,
  Flag,
  Home,
  Phone,
  Visibility,
} from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Button } from "components/core";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  caste?: string;
  gender?: string;
  _id?: string;
  countryCode?: string;
  email?: string;
  name?: string;
  phoneNumber?: string;
  joinDate?: string;
  role?: string;
  photoUrl?: string;
  onEditClick?: () => void;
  city?: string;
  mutate?: () => void;
  onAssignModuleClick?: () => void;
};

const NonTeachingStaffCard = ({
  caste,
  gender,
  countryCode,
  email,
  joinDate,
  name,
  phoneNumber,
  role,
  photoUrl,
  onEditClick,
  city,
  mutate,
  _id,
  onAssignModuleClick,
}: Props) => {
  const { push } = useRouter();
  const { mutate: staffDelete } = useFetch();
  const handleDelete = (id: any) => {
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
  return (
    <div className="w-full bg-white shadow-xl rounded-xl flex flex-col overflow-hidden ">
      <div className="bg-theme flex gap-4 p-4 items-center ">
        <div
          className="w-fit"
          onClick={() => push(`/panel/admin/staff/${_id}`)}
        >
          <Avatar
            src={`${photoUrl}`}
            sx={{
              height: "5rem",
              width: "5rem",
            }}
            className="!bg-gray-50/10 border"
          >
            {name?.[0]}
          </Avatar>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <div className="flex break-all">
            <h3 className="font-semibold text-white tracking-wide text-2xl break-all">
              {name}
            </h3>{" "}
          </div>
          <small className="tracking-wide text-gray-200 lowercase first-letter:uppercase break-all">
            {role}
          </small>
        </div>
        {/* <div>
          <IconButton onClick={() => handleDelete(`${_id}`)}>
            <Tooltip title="Delete Staff">
              <Delete className="text-red-500 text-2xl" />
            </Tooltip>
          </IconButton>
        </div> */}
      </div>
      <div className="flex flex-col gap-2 p-4 text-gray-600 ">
        <span className="flex items-center gap-4 font-medium break-all">
          <Email />
          <small className="tracking-wide ">{email}</small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <Phone />
          <small className="tracking-wide ">
            {countryCode} {phoneNumber}
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <Flag />
          <small className="tracking-wide break-all">Joined {joinDate}</small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <Home />
          <small className="tracking-wide break-all">{city}</small>
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
      <div className="flex items-center gap-4 flex-wrap justify-center pb-4 ">
        <Tooltip title="View User">
          <IconButton
            onClick={() => push(`/panel/admin/staff/${_id}`)}
            className="!text-4xl !text-green-500"
          >
            <Visibility />
          </IconButton>
        </Tooltip>
        <Tooltip title="User Permissions">
          <IconButton
            onClick={onAssignModuleClick}
            className="!text-4xl !text-yellow-500"
          >
            <AdminPanelSettings />
          </IconButton>
        </Tooltip>
        <Tooltip title="Edit User">
          <IconButton
            onClick={onEditClick}
            className="!text-4xl !text-blue-500"
          >
            <DesignServices />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete User">
          <IconButton
            onClick={() => handleDelete(`${_id}`)}
            className="!text-4xl !text-red-500"
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default NonTeachingStaffCard;
