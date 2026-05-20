import { Close, Edit } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { useFetch } from "hooks";
import { useState } from "react";
import { notify } from "utils";

type Props = {
  employeeId?: string;
  name?: string;
  email?: string;
  role?: string;
  photoUrl: string;
  isAbsent: boolean;
  isOnLeave: boolean;
  isPresent: boolean;
  reload?: () => void;
  loading?: boolean;
};

const AttendanceCard = ({
  name,
  employeeId,
  email,
  role,
  photoUrl,
  isAbsent,
  isPresent,
  isOnLeave,
  reload,
  loading,
}: Props) => {
  const [viewAll, setViewAll] = useState(false);
  const { mutate } = useFetch();

  const handlePresent = async (key: string, value: boolean) => {
    try {
      const response = await mutate({
        path: "staff/attendance/create",
        method: "POST",
        body: JSON.stringify({
          user: employeeId,
          isPresent: key === "isPresent" ? value : false,
          isAbsent: key === "isAbsent" ? value : false,
          isLeave: key === "isLeave" ? value : false,
          date: new Date().toISOString(),
        }),
      });
      if (response?.data?.error) throw new Error(response?.data?.error);
      reload?.();
    } catch (error) {
      if (error instanceof Error) {
        notify.error(error?.message);
      } else {
        notify.error("Oops! Something went wrong");
      }
    } finally {
      setViewAll(false);
    }
  };
  return (
    <div className="w-full flex flex-col gap-2 items-center bg-white shadow-lg rounded-lg p-4 ">
      <Avatar
        className=" border"
        src={photoUrl}
        sx={{
          height: "5rem",
          width: "5rem",
        }}
      >
        {name?.[0]}
      </Avatar>

      <div className="flex flex-col items-center justify-center">
        <h3 className="font-medium tracking-wide text-lg break-all">{name}</h3>
        <small className="font-medium tracking-wide text-md break-all">
          {email}
        </small>
        <p className="font-medium tracking-wide text-xs text-gray-400">
          #{role}
        </p>
      </div>

      {(viewAll || (!isAbsent && !isPresent && !isOnLeave)) && (
        <div className="flex items-center gap-3 justify-center ">
          <span
            className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-green-500 text-white justify-center"
            onClick={() => handlePresent("isPresent", true)}
          >
            <p className="font-medium text-center text-sm ">P</p>
          </span>
          <span
            className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-red-500 text-white justify-center"
            onClick={() => handlePresent("isAbsent", true)}
          >
            <p className="font-medium text-center text-sm ">A</p>
          </span>
          <span
            className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-yellow-500 text-white justify-center"
            onClick={() => handlePresent("isLeave", true)}
          >
            <p className="font-medium text-center text-sm ">L</p>
          </span>
        </div>
      )}

      <div className="flex items-center gap-4">
        {!viewAll && isPresent && (
          <span className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-green-500 text-white justify-center">
            <p className="font-medium text-center text-sm ">P</p>
          </span>
        )}
        {!viewAll && isAbsent && (
          <span className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-red-500 text-white justify-center">
            <p className="font-medium text-center text-sm ">A</p>
          </span>
        )}
        {!viewAll && isOnLeave && (
          <span className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-yellow-500 text-white justify-center">
            <p className="font-medium text-center text-sm ">L</p>
          </span>
        )}
        {(isOnLeave || isAbsent || isPresent) && (
          <span
            className="flex items-center h-10 w-10 rounded-full cursor-pointer hover:scale-105 transition-all ease-in-out duration-300 scale-100 bg-gray-500 text-white justify-center"
            onClick={() => setViewAll((prev) => !prev)}
          >
            {viewAll ? <Close /> : <Edit />}
          </span>
        )}
      </div>
    </div>
  );
};

export default AttendanceCard;
