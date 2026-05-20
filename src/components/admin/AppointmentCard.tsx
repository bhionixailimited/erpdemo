import { Delete } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

import AddMouDrawer from "./AddMouDrawer";
import dayjs from "dayjs";
import MouDocumentDrawer from "./MouDocumentDrawer";
type Props = {
  _id: string;
  title: string;
  description: string;
  className?: string;
  avatarSrc?: string;
  signBy?: string;
  signedUnder?: string;
  dateOfSigning?: string;
  duration?: string | number;
  editDepartment: () => void;
  mutate?: KeyedMutator<any>;
};

export default function AppointmentCard({
  _id,
  title,
  description,
  avatarSrc,
  duration,
  className = "",
  editDepartment,
  mutate,
  signBy,
  signedUnder,
  dateOfSigning,
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
              path: `mou/${id}`,
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
    <div className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-white rounded-xl ">
      <div className={`flex flex-col 2xl:p-4 items-center justify-center `}>
        <Avatar
          src={
            avatarSrc ||
            `https://cdn-icons-png.flaticon.com/128/8131/8131437.png`
          }
          variant="rounded"
          sx={{
            mt: 0,
            height: 50,
            width: 50,
          }}
        />
        <h2 className="text-xl font-semibold mt-2">{title}</h2>
        <p className="text-gray-600 mt-1 font-semibold">{duration}</p>
        <p className="text-gray-700 font-medium truncate text-center w-full ">
          {description?.slice(0, 20)}
        </p>
        <p className="text-gray-600 font-medium">Signed By: {signBy}</p>
        <p className="text-gray-600 font-medium">Signed Under: {signBy}</p>
        <p className="text-gray-600 font-medium">
          Date: {dayjs(dateOfSigning).format("MMM D, YYYY h:mm A")}
        </p>
      </div>
      <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
        <div className="w-fit flex h-full flex-col">
          <AddMouDrawer feeName={"Edit"} open={_id} Dmutate={mutate} />
          <MouDocumentDrawer open={_id} Dmutate={mutate} />
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => handleDelete(_id)}
          >
            <Tooltip title="Delete Appointment">
              <Delete />
            </Tooltip>
          </span>
        </div>
      </div>
    </div>
  );
}
