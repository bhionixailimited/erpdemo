import { Delete } from "@mui/icons-material";
import { Avatar, Checkbox, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

import AddMouDrawer from "./AddMouDrawer";
import dayjs from "dayjs";
import MouDocumentDrawer from "./MouDocumentDrawer";
import { CompanyViewDialog, MouViewDialog } from "./dialog";
type Props = {
  _id: string;
  title: string;
  description: string;
  className?: string;
  avatarSrc?: string;
  signBy?: string;
  signUnderWhom?: string;
  dateOfSigning?: string;
  dateOfExpire?: string;
  includeDepartment?: string | number;
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
  includeDepartment,
  className = "",
  editDepartment,
  mutate,
  signBy,
  signUnderWhom,
  dateOfSigning,
  dateOfExpire,
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
  //L--------------------------------------------------------
  return (
    <div className="w-full flex flex-col gap-1 scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-white rounded-xl ">
      <div className=" h-ful w-full p-1 flex flex-row items-center justify-around  shadow-md shadow-slate-500 bg-theme text-white">
        <span className="">
          <AddMouDrawer feeName={"Edit"} open={_id} Dmutate={mutate} />
        </span>
        <span className="">
          <MouViewDialog
            mouInfo={_id}
            title={title}
            signUnderWhom={signUnderWhom}
            signBy={signBy}
            dateOfSigning={dateOfSigning}
            dateOfExpire={dateOfExpire}
            includeDepartment={includeDepartment}
            description={description}
          />
        </span>
        <span className="">
          <MouDocumentDrawer open={_id} Dmutate={mutate} />
        </span>
        <span className="cursor-pointer " onClick={() => handleDelete(_id)}>
          <Tooltip title="Delete MOU">
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

      <div className={`flex flex-col p-2 2xl:p-4`}>
        <div className="">
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
        </div>

        <div className="">
          <h2 className="text-xl font-semibold mt-2">{title}</h2>
          <p className="text-gray-600 mt-1 font-semibold">
            Department: {includeDepartment}
          </p>
          <p className="text-gray-700 font-medium truncate w-full ">
            Description:{" "}
            {description?.length > 20
              ? description?.slice(0, 20) + "..."
              : description}
          </p>
          <p className="text-gray-600 font-medium">Signed By: {signBy}</p>
          <p className="text-gray-600 font-medium">
            Signed Under: {signUnderWhom}
          </p>
          <p className="text-gray-600 font-medium">
            Date of Signing:{" "}
            {dateOfSigning ? dayjs(dateOfSigning).format("MMM D, YYYY") : ""}
          </p>
          <p className="text-gray-600 font-medium">
            Date of Expiry:{" "}
            {dateOfExpire ? dayjs(dateOfExpire).format("MMM D, YYYY") : ""}
          </p>
        </div>
      </div>

      {/* <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
        <div className="w-fit flex h-full flex-col">
          <span className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  ">
            <Tooltip title="Check to export">
              <Checkbox checked={checked} onChange={onChange} />
            </Tooltip>
          </span>
          <AddMouDrawer feeName={"Edit"} open={_id} Dmutate={mutate} />
          <MouViewDialog
            mouInfo={_id}
            title={title}
            signUnderWhom={signUnderWhom}
            signBy={signBy}
            dateOfSigning={dateOfSigning}
            dateOfExpire={dateOfExpire}
            includeDepartment={includeDepartment}
            description={description}
          />
          <MouDocumentDrawer open={_id} Dmutate={mutate} />

          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => handleDelete(_id)}
          >
            <Tooltip title="Delete MOU">
              <Delete />
            </Tooltip>
          </span>
        </div>
      </div> */}
    </div>
  );
}
