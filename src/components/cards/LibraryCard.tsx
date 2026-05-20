import { Avatar } from "@mui/material";

type Props = {
  value?: string | number;
  icon?: string;
  title?: string;
  bg?: string;
};

const LibraryCard = ({ value, icon, title, bg }: Props) => {
  return (
    <div
      className="w-full cursor-pointer select-none scale-100 hover:scale-95 duration-200 ease-in-out transition-all shadow-xl  text-white p-4  rounded-lg"
      style={{
        backgroundImage: bg,
      }}
    >
      <h3 className="font-medium tracking-wide  mb-4 text-xl">{title}</h3>

      <div className="flex items-start justify-between ">
        <h3 className="font-semibold tracking-wide text-4xl ">{value}</h3>
        <Avatar
          sx={{
            borderRadius: "10px",
            height: "5rem",
            width: "5rem",
            objectFit: "contain",
          }}
          className="!bg-slate-100 !p-2 "
          src={icon}
        >
          {title?.[0]}
        </Avatar>
      </div>
    </div>
  );
};

export default LibraryCard;
