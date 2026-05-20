import { AccessTime } from "@mui/icons-material";
import { Avatar, Grid } from "@mui/material";
import { AssignmentBG } from "assets/backgrounds";
import { ProjectManageMentIcon } from "assets/static-icon";

interface Props {
  data: {
    id?: number;
    chapter?: string;
    lastDate?: string;
    progress?: number;
    status?: string;
    assignmentName?: string;
  };
  onClick?: () => void;
}
const StudentAssignmentCard = ({ data, onClick }: Props) => {
  return (
    <Grid item xs={6} sm={6} md={4} lg={3} key={data.id}>
      <div
        className="flex items-center justify-center flex-col shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] rounded-lg hover:scale-105 common-transition cursor-pointer gap-6"
        key={data.id}
        onClick={() => onClick?.()}
      >
        <div
          className="h-16 2xl:h-28 w-full relative rounded-t-lg"
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
          <p className="text-lg font-semibold ">{data.chapter}</p>
          <p className="text-sm font-semibold text-theme cursor-pointer">
            {data.assignmentName}
          </p>
          <span className="text-xs tracking-tight flex gap-1 font-semibold">
            Submission Date:{" "}
            <p className="font-semibold text-theme">{data.lastDate}</p>
          </span>
          <div className="flex flex-col gap-2 w-full">
            <div className="flex w-full text-end justify-between items-center pt-3">
              <p className="text-sm font-semibold">{data.status}</p>
              <p className="bg-themeSecondary/10 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1">
                <AccessTime fontSize="small" /> 2 Weeks Left
              </p>
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
};

export default StudentAssignmentCard;
