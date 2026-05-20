import { Category, Delete, Edit } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import { CourseViewDialog } from "./dialog";

type Props = {
  _id: string;
  title: string;
  description: string;
  className?: string;
  iconUrl?: string;
  duration?: string | number;
  editCourse: () => void;
  mutate?: KeyedMutator<any>;
  refetch?: boolean;
};

export default function AllCourseCard({
  _id,
  title,
  description,
  iconUrl,
  duration,
  className = "",
  editCourse,
  mutate,
  refetch,
}: //   onClick,
Props) {
  const router = useRouter();

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
              path: `course/delete/${id}`,
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
    <div className=" w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-white rounded-xl">
      <div className="flex justify-center items-center  h-full bg-theme">
        <div
          className={`flex flex-row gap-1 md:gap-2 lg:gap-2 bg-twitter py-2 w-full `}
        >
          <div className=" flex justify-center items-center  px-2 rounded-sm mt-2">
            <Avatar
              src={
                iconUrl ||
                `https://cdn-icons-png.flaticon.com/128/11879/11879136.png`
              }
              variant="square"
              sx={{
                mt: 0,
                height: 70,
                width: 50,
              }}
            />
          </div>
          <div className="text-white flex flex-col gap-1  ">
            <h2 className=" text-lg font-bold mt-2 ">{title}</h2>
            <p className=" font-medium">{duration} years</p>
            <p className=" font-semibold w-full ">
              {description.length > 20
                ? description.slice(0, 20) + "..."
                : description}
            </p>
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
        <div className="w-fit flex h-full flex-col">
          <CourseViewDialog courseInfo={_id} refetch={refetch} />

          <span
            className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
            onClick={editCourse}
          >
            <Tooltip title="Edit Course">
              <Edit />
            </Tooltip>
          </span>

          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-teal-600  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => router.push(`/panel/admin/config/${_id}`)}
          >
            <Tooltip title="View Branches">
              <Category />
            </Tooltip>
          </span>
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => handleDelete(_id)}
          >
            <Tooltip title="Delete Course">
              <Delete />
            </Tooltip>
          </span>
        </div>
      </div>
    </div>
  );
}
