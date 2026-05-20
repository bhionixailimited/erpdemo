import { Add, Email, Phone, Transgender } from "@mui/icons-material";
import { Avatar } from "@mui/material";

const StudentExamCard = ({ onClick }: any) => {
  return (
    <div
      className="w-full cursor-pointer  rounded-xl shadow-xl  relative group  overflow-hidden"
      onClick={onClick}
    >
      <div className="relative bg-white  py-6 px-6  w-full  ">
        <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
          <div className=" text-white flex items-center w-fit rounded-full py-2 px-2 shadow-xl bg-theme left-4 ">
            <Avatar
              className="object-contain p-1"
              src={"https://cdn-icons-png.flaticon.com/128/2784/2784461.png"}
              sx={{
                height: "4rem",
                width: "4rem ",
                objectFit: "contain",
              }}
            ></Avatar>
          </div>
          <span className="w-fit flex flex-col gap-2 items-center ">
            <small className="transition-wide text-theme font-medium">
              Mark Secured
            </small>
            <h3 className="font-semibold text-2xl text-theme tracking-wide text-center">
              68
            </h3>
            <span className="bg-theme scale-100 ease-in-out cursor-pointer hover:scale-105 duration-300 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-white rounded-full flex items-center gap-1">
              <Add /> Update Mark
            </span>
          </span>
        </div>
        <div className="mt-4">
          <p className="text-2xl font-semibold my-2">John Doe</p>
          <div className="flex space-x-2 text-gray-400 text-sm items-center mb-1 ">
            <Email />
            <p>alexa@gmail.com</p>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm items-center mb-1 ">
            <Phone />
            <p>6325451415</p>
          </div>
          <div className="flex space-x-2 text-gray-400 text-sm items-center mb-1">
            <Transgender />
            <p>Female</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentExamCard;
