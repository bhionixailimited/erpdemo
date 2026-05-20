import { Delete } from "@mui/icons-material";
import { Avatar, Checkbox, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

import AddMouDrawer from "./AddMouDrawer";
import dayjs from "dayjs";
import MouDocumentDrawer from "./MouDocumentDrawer";
import AddEventDrawer from "./AddEventDrawer";
import { EventDocumentDrawer, GuestDrawer } from ".";
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
  checked?: boolean;
  onChange?: () => void;
};

export default function MouCard({
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
  checked,
  onChange,
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
              path: `event/${id}`,
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
      <div
        // style={{
        //   backgroundImage: `url("https://as1.ftcdn.net/v2/jpg/06/29/92/08/1000_F_629920852_RO5pFGgZntT37mstlv7OZL2WlDp70NfT.jpg")`,
        // }}
        className="h-ful w-full flex flex-row items-center justify-around  shadow-md shadow-slate-700 text-white bg-theme"
      >
        <span>
          <AddEventDrawer feeName={"Edit"} open={_id} Dmutate={mutate} />
        </span>
        <span>
          <EventDocumentDrawer open={_id} Dmutate={mutate} />
        </span>
        <span>
          <GuestDrawer open={_id} Dmutate={mutate} />
        </span>
        <span className="">
          <Tooltip title="Delete Event" onClick={() => handleDelete(_id)}>
            <Delete />
          </Tooltip>
        </span>
        <span className="">
          <Tooltip title="Check to export">
            <Checkbox
              sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
              className="!text-white"
              checked={checked}
              onChange={onChange}
            />
          </Tooltip>
        </span>
      </div>
      <div className={`flex flex-row gap-6 2xl:p-4 mt-3`}>
        <div className="flex justify-center items-center">
          <Avatar
            src={
              avatarSrc ||
              `https://cdn-icons-png.flaticon.com/128/11839/11839200.png`
            }
            variant="rounded"
            sx={{
              mt: 0,
              height: 65,
              width: 65,
            }}
          />
        </div>
        <div>
          <h2 className="text-xl font-semibold mt-2">{title}</h2>
          <p className="text-gray-600 mt-1 font-semibold">
            Venue : {duration ? duration : "Not Provided"}
          </p>
          <p className="text-gray-700 font-medium truncate w-full ">
            Description :{" "}
            {description ? description?.slice(0, 20) : "Not Provided"}
          </p>
          {/* <p className="text-gray-600 font-medium">Signed By: {signBy}</p>
        <p className="text-gray-600 font-medium">Signed Under: {signBy}</p> */}
          <p className="text-gray-600 font-medium">
            Date :{" "}
            {dateOfSigning
              ? dayjs(dateOfSigning).format("MMM D, YYYY ")
              : "Not Provided"}
          </p>
        </div>
      </div>
    </div>
  );
}
