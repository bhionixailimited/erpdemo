import { Delete } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { EditDriverDrawer } from "components/admin";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  name?: string;
  phoneNumber?: string;
  imgSrc?: string;
  assigned?: boolean;
  // active?: boolean;
  licenseNo?: string;
  expiry?: Date;
  data?: any;
  mutate?: any;
};

const DriverCard = ({
  imgSrc,
  name,
  phoneNumber,
  licenseNo,
  expiry,
  assigned,
  data,
  mutate,
}: Props) => {
  const { mutate: driver } = useFetch();
  const { push } = useRouter();
  const handleDeleteDriver = () => {
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
            const response = await driver({
              path: `driver/delete/${data?._id}`,
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
      <div className="w-full col-span-12 scale-100 xl:col-span-3 lg:col-span-4 md:col-span-6 sm:col-span-12 xs:col-span-12 bg-indigo-50 border-indigo-200 shadow-md rounded-md mt-2 gap-2 border relative group  overflow-hidden hover:scale-105  ">
        <div className="text-center flex  gap-2 py-3 px-2  ">
          <div className="">
            <Avatar
              className="!h-32 !w-32 !object-contain"
              variant="rounded"
              alt="car-image"
              src={`${
                imgSrc ||
                `https://cdn-icons-png.flaticon.com/128/9365/9365931.png`
              }`}
              // width="300"
              // height="300"
            />
          </div>
          <div className="text-left mt-1 w-full">
            <p className="font-bold !text-theme text-lg">{name}</p>
            <p className="font-bold !text-theme text-md">{phoneNumber}</p>
            <p className="font-semibold !text-theme text-sm">
              License no
              <p className="font-bold text-xs">{licenseNo}</p>
            </p>
            <div className="flex flex-col flex-wrap md:flex-row gap-1 md:items-center justify-between ">
              <p className="font-semibold !text-theme text-sm ">
                Expiry
                <p className="font-bold md:whitespace-nowrap text-xs">
                  {dayjs(expiry).format("ll")}
                </p>
              </p>

              <Button className=" !shadow-none   !whitespace-nowrap text-xs md:text-sm">
                {assigned ? "Assigned" : "Not Assigned"}
              </Button>
            </div>
          </div>
        </div>

        <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
          <div className="w-fit flex h-full flex-col">
            <EditDriverDrawer open={data} mutate={mutate} />

            <span
              className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
              onClick={handleDeleteDriver}
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

export default DriverCard;
