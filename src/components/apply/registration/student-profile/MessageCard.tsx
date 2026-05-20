import { Avatar } from "@mui/material";
import { AnnouncementIcon } from "assets/static-icon";
import dayjs from "dayjs";

type Props = {
  title?: string;
  desc?: string;
  onClick?: () => void;
  lastMessage?: string;
};

const MessageCard = ({ title, desc, onClick, lastMessage }: Props) => {
  return (
    <div
      className="w-full scale-100 duration-300 ease-in-out hover:scale-95 bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 cursor-pointer select-none rounded-lg flex justify-between px-3 items-center"
      onClick={onClick}
    >
      <div className="flex gap-2 justify-between items-start w-full">
        <div className="gap-4 flex">
          <div className="w-12 h-12 flex items-center justify-center text-theme rounded-full bg-gray-100">
            <Avatar src={AnnouncementIcon.src} className="!h-12 !w-12 " />
          </div>
          <div className="flex flex-col">
            <p className="font-semibold tracking-wide mb-4 ">{title}</p>
            <p className="text-sm tracking-wide">{desc}</p>
            <p className="text-xs font-medium  mt-4 ">
              Last message on {dayjs(lastMessage).format("LLL")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageCard;
