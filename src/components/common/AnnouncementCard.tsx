import { Delete } from "@mui/icons-material";
import { Avatar, IconButton } from "@mui/material";
import { AnnouncementIcon } from "assets/static-icon";
import dayjs from "dayjs";
import { useAuth, useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";

type Props = {
  title?: string;
  desc?: string;
  createdAt?: string;
  createdBy?: string;
  forWhom?: string;
  startTime?: string | Date;
  endTime?: string | Date;
  _id?: string;
  mutate?: KeyedMutator<any>;
};

const AnnouncementCard = ({
  title,
  desc,
  createdAt,
  createdBy,
  forWhom,
  startTime,
  endTime,
  _id,
  mutate,
}: Props) => {
  const { batchId } = useRouter().query;
  const { mutate: designation } = useFetch();
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
            const response = await designation({
              path: batchId
                ? `batch/announcement/delete/${id}`
                : `notice/delete/${id}`,
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

  const { user } = useAuth();

  return (
    <div className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 rounded-lg flex justify-between px-3 items-center">
      <div className="flex gap-2 justify-between items-start w-full">
        <div className="gap-4 flex">
          <div className="w-12 h-12 flex items-center justify-center text-theme rounded-full bg-gray-100">
            <Avatar src={AnnouncementIcon.src} className="!h-12 !w-12 " />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold tracking-wide text-sm md:text-lg ">
              {title}
            </p>
            {/* <p className="text-xs md:text-sm font-semibold tracking-wide mb-1 md:mb-4 ">{`${dayjs(
              startTime
            ).format("LL")} to ${dayjs(endTime).format("LL")}`}</p> */}
            <p
              className="text-sm md:text-md font-semibold tracking-wide"
              dangerouslySetInnerHTML={{
                __html: desc && (desc as any),
              }}
            />

            <p className="text-xs md:text-sm font-medium text-gray-400 mt-4 ">
              {`By ${createdBy} for ${forWhom}`}
            </p>
          </div>
        </div>
        <div className="text-sm font-semibold whitespace-nowrap text-theme flex items-center">
          {["SUPER_ADMIN", "ADMIN", "STAFF"].includes(
            user?.role ? user?.role : ""
          ) && (
            <IconButton onClick={() => handleDelete(_id as string)}>
              <Delete className="text-red-500" />
            </IconButton>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnouncementCard;
