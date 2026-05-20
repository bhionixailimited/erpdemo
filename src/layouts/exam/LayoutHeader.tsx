import { Avatar } from "@mui/material";
import { Button } from "components/core";
import dayjs from "dayjs";
import { useAuth, useExamData } from "hooks";
import React from "react";

const LayoutHeader = () => {
  const { user } = useAuth();

  const { examDuration, examStartTime, examEndTime, handleExamSubmit } =
    useExamData();

  return (
    <header className={`h-16 bg-white`}>
      <div className="flex h-16 items-center justify-between px-4">
        <div className="flex   min-w-fit  items-center justify-start gap-2 overflow-hidden  bg-white">
          <Avatar src={user?.photoUrl} className="cursor-pointer !bg-theme" />
          <span className="flex cursor-pointer flex-col gap-1">
            <h2 className="cursor-pointer text-lg font-medium tracking-wide text-black">
              {user?.displayName}
            </h2>
            <h3 className="cursor-pointer text-xs font-medium tracking-wide text-black">
              {user?.academicDetails?.rollNumber}
            </h3>
          </span>
        </div>
        <div className="flex items-center gap-6">
          <span className="flex cursor-pointer gap-8 ">
            <span className="flex items-center gap-1">
              <p className="font-medium tracking-wide text-sm text-gray-800">
                Start Time
              </p>
              :
              <p className="font-medium tracking-wide text-xs text-blue-500">
                {dayjs(examStartTime).format("hh:mm A")}
              </p>
            </span>
            <span className="flex items-center gap-1">
              <p className="font-medium tracking-wide text-sm text-gray-800">
                End Time
              </p>
              :
              <p className="font-medium tracking-wide text-xs text-blue-500">
                {dayjs(examEndTime).format("hh:mm A")}
              </p>
            </span>
          </span>

          <span className="flex items-center text-theme gap-1 bg-gray-100 shadow-xl px-4 py-1 rounded-md ">
            <p className="text-lg font-semibold tracking-wide">
              {examDuration && Math.floor(dayjs.duration(examDuration).hours())}{" "}
              H
            </p>
            :
            <p className="text-lg font-semibold tracking-wide">
              {examDuration &&
                Math.floor(dayjs.duration(examDuration).minutes())}{" "}
              M
            </p>
            :
            <p className="text-lg font-semibold tracking-wide">
              {examDuration &&
                Math.floor(dayjs.duration(examDuration).seconds())}{" "}
              S
            </p>
          </span>

          <Button onClick={handleExamSubmit}>Finish Exam</Button>
        </div>
      </div>
    </header>
  );
};

export default LayoutHeader;
