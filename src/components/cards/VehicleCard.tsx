import { Delete } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { EditVehicleDrawer } from "components/admin";
import { VehicleInfoDialog } from "components/admin/dialog";
import { Button } from "components/core";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  title?: string;
  vehicleNumber?: string;
  imgSrc?: string;
  assigned?: boolean;
  status?: string;
  vehicle?: any;
  mutate?: any;
};

const VehicleCard = ({
  imgSrc,
  title,
  vehicleNumber,
  assigned,
  status,
  vehicle,
  mutate,
}: Props) => {
  const { mutate: vehicleDelete } = useFetch();
  const { push } = useRouter();
  const handleDeleteVehicle = () => {
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
            const response = await vehicleDelete({
              path: `vehicle/delete/${vehicle?._id}`,
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
    <>
      <div
        style={{
          backgroundImage: `url('')`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          // height: "100%",
          // width: "100%",
        }}
        className="w-full scale-100 col-span-12 md:col-span-3 shadow-md rounded-xl mt-2 gap-4 border relative group  overflow-hidden hover:scale-105  "
      >
        <div className="text-center flex justify-center p-2 mb-3  ">
          <Avatar
            className="!h-32 !w-32 !object-contain"
            variant="rounded"
            alt="car-image"
            src={`${
              imgSrc ||
              `https://cdn-icons-png.flaticon.com/128/2554/2554893.png`
            }`}
            // width="300"
            // height="300"
          />
        </div>
        <div className="text-center flex justify-center -translate-y-5 uppercase">
          <h2 className="font-semibold text-theme">{title}</h2>
        </div>
        <div className="text-center flex justify-center -translate-y-5 ">
          <h2 className="font-semibold text-theme">{vehicleNumber}</h2>
        </div>
        <div className="text-center flex  -translate-y-3 gap-4 justify-center px-2">
          <Button
            className={`${
              assigned
                ? `!bg-themeSecondary !shadow-none text-xs   hover:ring-transparent cursor-default`
                : `!bg-gray-600 !shadow-none text-xs   hover:ring-transparent cursor-default`
            }`}
          >
            {assigned ? "Assigned" : "Not Assigned"}
          </Button>
          <Button
            className={`${
              status === "ACTIVE"
                ? `!shadow-none text-xs bg-green-700 hover:ring-transparent cursor-default`
                : `!shadow-none text-xs bg-gray-600 hover:ring-transparent cursor-default`
            }`}
          >
            {status === "ACTIVE" ? "Active" : "In Active"}
          </Button>
        </div>
        <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
          <div className="w-fit flex h-full flex-col">
            <EditVehicleDrawer open={vehicle} mutate={mutate} />
            <VehicleInfoDialog vehicle={vehicle} />
            <span
              className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
              onClick={handleDeleteVehicle}
            >
              <Tooltip title="Delete Vehicle">
                <Delete />
              </Tooltip>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default VehicleCard;
