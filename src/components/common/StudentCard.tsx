import {
  AccessTime,
  AccountBalance,
  Delete,
  Edit,
  Email,
  Phone,
  School,
  Transgender,
  Visibility,
} from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { CustomProgress } from "components/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import UserType from "types/user";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFetch } from "hooks";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import { ICONS } from "assets";

interface Props {
  data: any;
  onClick?: () => void;
  studentDrawer?: any;
  type?: "ALUMNI" | "STUDENT";
  mutate?: KeyedMutator<any>;
  noDrawer?: boolean;
}

const StudentCard = ({
  data,
  onClick,
  studentDrawer,
  type,
  mutate,
  noDrawer,
}: Props) => {
  const [examId, setExamId] = useState<any>("");
  const router = useRouter();
  const { mutate: exam } = useFetch();
  const handleDeleteStudent = (id: string) => {
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
            const response = await exam({
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
            setExamId("");
          });
        setExamId("");
      });
      setExamId("");
    } catch (err) {
      console.log(err);
    } finally {
      setExamId("");
    }
  };
  return (
    <>
      <div
        className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 rounded-xl shadow-xl ease-in-out relative group  overflow-hidden "
        onClick={onClick}
      >
        <div className="relative bg-white  py-6 px-6  w-full  ">
          <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
            <div className=" text-white flex items-center w-fit rounded-full  shadow-xl bg-theme left-4 ">
              <Avatar
                className="object-cover "
                src={data?.photoUrl || data?.user?.photoUrl}
                sx={{
                  height: "4rem",
                  width: "4rem ",
                  objectFit: "cover",
                }}
              ></Avatar>
            </div>
            <span className="w-fit">
              <p className="bg-themeSecondary/10 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1">
                <AccessTime fontSize="small" />
                {data?.createdAt
                  ? `Joined on ${dayjs(data?.createdAt).format("DD MMM YYYY")}`
                  : "Not Provided"}
              </p>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xl font-semibold my-2">
              {data?.displayName ||
                (data?.user?.displayName && data?.user?.displayName)}
            </p>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1 ">
              <Email />
              <p>
                {data?.email ||
                  (data?.user?.email && data?.user?.email) ||
                  "Not Provided"}
              </p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1 ">
              <Phone />
              <p>
                {data?.phoneNumber ||
                  (data?.user?.phoneNumber && data?.user?.phoneNumber) ||
                  "Not Provided"}
              </p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1">
              <Transgender />
              <p>
                {data?.gender ||
                  (data?.user?.gender && data?.user?.gender) ||
                  "Not Provided"}
              </p>
            </div>
            {!data?.user && (
              <div className="flex space-x-2 text-gray-400 text-xs items-center  mb-3">
                <School />
                {/* <p>BTech 3rd year</p> */}
                <p>
                  {data?.batch?.course?.title
                    ? `${
                        data?.batch?.course?.title
                          ? data?.batch?.course?.title
                          : ""
                      } ${
                        data?.batch?.branch?.title
                          ? data?.batch?.branch?.title
                          : ""
                      } `
                    : "Not Provided"}
                </p>
              </div>
            )}
            {type === "ALUMNI" ? (
              <div className="flex space-x-2 text-gray-400 text-xs items-center  mb-3">
                <AccountBalance />
                <p>Pass out year 2022 </p>
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {/* <div className="flex justify-between w-full">
                  <p className="text-sm text-theme font-semibold">
                    Fees Payment
                  </p>
                  <p className="text-sm text-theme font-semibold">
                    {data.progress} %
                  </p>
                </div>
                <CustomProgress ProgressValue={data.progress} /> */}
              </div>
            )}
          </div>
          {!noDrawer && (
            <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
              <div className="w-fit flex h-full flex-col">
                <span
                  className="bg-gradient-to-r from-transparent cursor-pointer to-slate-400 text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
                  onClick={() => {
                    if (type === "ALUMNI") {
                      router.push(
                        `/panel/admin/alumni/${
                          data?.user ? data?.user?._id : data?._id
                        }`
                      );
                    } else {
                      router.push(
                        `/panel/admin/student/${
                          data?.user ? data?.user?._id : data?._id
                        }`
                      );
                    }
                  }}
                >
                  <Tooltip title="View Student Details">
                    <Visibility />
                  </Tooltip>
                </span>{" "}
                {type !== "ALUMNI" && (
                  <span
                    className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
                    onClick={studentDrawer}
                  >
                    <Edit />
                  </span>
                )}
                <span
                  className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
                  onClick={() => {
                    handleDeleteStudent(
                      data?.user ? data?.user?._id : data?._id
                    );
                    setExamId(data?.user ? data?.user?._id : data?._id);
                  }}
                >
                  <Tooltip title={"Delete Student"}>
                    {examId === (data?.user ? data?.user?._id : data?._id) ? (
                      <ICONS.Loading className="animate-spin text-white h-6 w-6" />
                    ) : (
                      <Delete />
                    )}
                  </Tooltip>
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default StudentCard;
