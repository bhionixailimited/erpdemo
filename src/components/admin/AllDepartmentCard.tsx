import {
  AssignmentTurnedIn,
  Badge,
  Delete,
  Edit,
  Visibility,
} from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { Alert } from "components/core";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

import AssignModuleDrawer from "./AssignModuleDrawer";
import ViewEmployeeDrawer from "./ViewEmployeeDrawer";
type Props = {
  title: string;
  description: string;
  className?: string;
  avatarSrc?: string;
  duration?: string | number;
  editDepartment: () => void;
  _id: string;
  mutate?: KeyedMutator<any>;
};

export default function AllDepartmentCard({
  title,
  description,
  avatarSrc,
  duration,
  className = "",
  editDepartment,
  _id,
  mutate,
}: //   onClick,
Props) {
  const { mutate: department } = useFetch();
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
            const response = await department({
              path: `department/delete/${id}`,
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
    <div className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-white rounded-xl ">
      <div
        className={`flex flex-col 2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-44`}
      >
        <Avatar
          src={
            avatarSrc ||
            `https://cdn-icons-png.flaticon.com/128/2666/2666475.png`
          }
          variant="rounded"
          sx={{
            mt: 0,
            height: 50,
            width: 50,
          }}
        />
        <h2 className="text-theme font-bold mt-2 text-center">{title}</h2>
        <p className=" text-theme font-medium">{duration}</p>
        <p className="truncate w-full text-theme font-medium text-center">
          {description}
        </p>
      </div>
      <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
        <div className="w-fit flex h-full flex-col">
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
            onClick={editDepartment}
          >
            <Tooltip title="Edit Department">
              <Edit />
            </Tooltip>
          </span>
          <ViewEmployeeDrawer open={_id} />
          <AssignModuleDrawer open={_id} />
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => handleDelete(_id)}
          >
            <Delete />
          </span>{" "}
        </div>
      </div>
    </div>
  );
}
