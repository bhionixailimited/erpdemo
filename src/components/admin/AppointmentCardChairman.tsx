import { Delete } from "@mui/icons-material";
import { Avatar, Tooltip, Checkbox } from "@mui/material";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

import AddMouDrawer from "./AddMouDrawer";
import dayjs from "dayjs";
import MouDocumentDrawer from "./MouDocumentDrawer";
import { AppointmentChairmaViewDialog } from "./dialog";
type Props = {
  _id: string;
  name: string;
  phoneNumber: string;
  whomToMeet: string;
  reason: string;
  timeOfAppointment: Date;
  passType: string;
  instituteId: string;
  //   editDepartment: () => void;
  mutate?: KeyedMutator<any>;
  checked?: boolean;
  onChange?: () => void;
};
export default function AppointmentCardChairman({
  _id,
  name,
  phoneNumber,
  whomToMeet,
  reason,
  timeOfAppointment,
  passType,
  instituteId,
  mutate,
  checked,
  onChange,
}: Props) {
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
              path: `appointment/${id}`,
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
    <div className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out overflow-hidden  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-white rounded-xl ">
      <div className="h-ful w-full p-1 flex flex-row items-center justify-around  shadow-md shadow-slate-500 bg-theme">
        <span>
          <AppointmentChairmaViewDialog appointmentInfo={_id} />
        </span>
        <span
          className="cursor-pointer  text-red-500 px-8 h-full  flex items-center justify-center rounded-bl-lg  "
          onClick={() => handleDelete(_id)}
        >
          <Tooltip title="Delete Appointment">
            <Delete />
          </Tooltip>
        </span>
        <span className="">
          <Tooltip title="Check to export">
            <Checkbox checked={checked} onChange={onChange} />
          </Tooltip>
        </span>
      </div>
      <div className={`flex flex-row 2xl:p-4  `}>
        <div className="flex items-center ">
          <Avatar
            src={`https://cdn-icons-png.flaticon.com/128/8131/8131437.png`}
            variant="rounded"
            sx={{
              mt: 0,
              height: 70,
              width: 70,
            }}
          />
        </div>
        <div className="flex flex-col gap-1 pl-5">
          <h2 className="text-xl font-semibold mt-2">Name: {name}</h2>
          <p className="text-gray-600 mt-1 font-semibold">
            Phone: {phoneNumber}
          </p>
          <p className="text-gray-600 font-medium">
            Date: {dayjs(timeOfAppointment).format("MMM D, YYYY")}
          </p>

          <p className="text-gray-600 font-medium">
            Whom To Meet: {whomToMeet}
          </p>
          <p className="text-gray-600 font-medium">
            Pass Type:{" "}
            {passType === "Normal"
              ? "Normal"
              : passType === "AdmissionGatePass"
              ? "Admission Gate Pass"
              : passType === "InventoryGatePass"
              ? "Inventory Gate Pass"
              : passType}
          </p>
          <p className="text-gray-600 font-medium truncate  w-full ">
            Reason: {reason.length > 15 ? reason.slice(0, 15) + "..." : reason}
          </p>
        </div>
      </div>
    </div>
  );
}
