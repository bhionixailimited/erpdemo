import { AccessTime } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { AssignmentBG } from "assets/backgrounds";
import { ProjectManageMentIcon } from "assets/static-icon";
import dayjs from "dayjs";
import { AssignmentType } from "types/assignment";

interface Props {
  data: AssignmentType;
  onClick?: () => void;
}
const CustomAssignmentCard = ({ data, onClick }: Props) => {
  return (
    <div
      className="flex items-center justify-center flex-col shadow-xl rounded-lg hover:scale-105 common-transition cursor-pointer gap-6"
      key={data._id}
      onClick={() => onClick?.()}
    >
      <div
        className="h-24 2xl:h-28 w-full relative rounded-t-lg"
        style={{
          backgroundImage: `url(${AssignmentBG.src})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="bg-[#000] rounded-t-lg bg-opacity-30 bg-clip-padding backdrop-blur-sm backdrop-filter w-full h-full">
          <div className=" justify-center gap-4 absolute top-1/2 z-50 w-full flex h-full items-center p-2">
            <Avatar
              className="bg-[#00000028] border object-contain p-2"
              src={ProjectManageMentIcon.src}
              sx={{
                height: "5rem",
                width: "5rem ",
                objectFit: "contain",
              }}
            ></Avatar>
          </div>
        </div>
      </div>
      <div className="p-5 flex flex-col w-full gap-1 items-center justify-center">
        <p className="text-lg font-semibold ">{data?.type}</p>
        <p className="text-sm font-semibold text-theme cursor-pointer">
          {data?.title}
        </p>
        <span className="text-xs tracking-tight flex gap-1 font-semibold">
          Submission Date:{" "}
          <p className="font-semibold text-theme">
            {dayjs(data?.dueDate).format("ll")}
          </p>
        </span>
        <div className="flex flex-col gap-2 w-full">
          {/* <div className="flex justify-between w-full">
              <p className="text-sm text-theme font-semibold">Progress</p>
              <p className="text-sm text-theme font-semibold">
                {data.progress} %
              </p>
            </div>
            <CustomProgress ProgressValue={data.progress} /> */}
          <div className="flex w-full text-end justify-between items-center pt-3">
            {/* <p className="text-sm font-semibold">{data.status}</p> */}
            <p className="bg-themeSecondary/10 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1">
              <AccessTime fontSize="small" />
              {dayjs(data?.dueDate).isBefore(dayjs())
                ? "Submission ended"
                : dayjs(data?.dueDate).diff(dayjs(), "d") > 0
                ? dayjs(data?.dueDate).diff(dayjs(), "d") + " days left"
                : "Last day"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomAssignmentCard;
