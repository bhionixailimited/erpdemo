import { Avatar } from "@mui/material";

type Props = {
  title?: string;
  icon?: string;
  value?: string | number;
};

const LibraryStat = ({ title, icon, value }: Props) => {
  return (
    <div className="w-full bg-white shadow-xl rounded-lg flex gap-4 p-4 cursor-pointer select-none scale-100 hover:scale-105 duration-300 ease-in-out   flex-col items-center justify-center ">
      <Avatar
        src={icon}
        sx={{
          height: "5rem",
          width: "5rem",
          objectFit: "contain",
        }}
        className="!p-4 !bg-slate-100"
      >
        {title?.[0]}
      </Avatar>

      <h3 className="font-medium tracking-wide text-xl">{title}</h3>

      <h3 className="font-semibold tracking-wide text-4xl text-center">
        {value}
      </h3>
    </div>
  );
};

export default LibraryStat;
