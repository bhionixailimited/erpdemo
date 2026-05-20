import { Skeleton } from "@mui/material";
import { StudentsIcon } from "assets/static-icon";

type Props = {
  title: string;
  content: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contentClassName?: string;
  icon: React.ReactElement;
  loading?: boolean;

  //   onClick: any;
};

export default function DepartmentStaff({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
  loading,
}: //   onClick,
Props) {
  return (
    <div
      //   onClick={onClick}
      className={`w-full flex flex-col !items-center   rounded-[16px] py-5 !shadow-none border border-grey-300 ${className} `}
    >
      <div
        className={` text-center !items-center  bg-gray-100 !justify-center ${iconClassName} !rounded-xl p-1  `}
      >
        <div className="h-full !text-center !items-center   !justify-center !text-md px-1  py-0">
          {icon || StudentsIcon.src}
        </div>
      </div>
      <div className="flex  flex-col items-center p-4">
        <h1
          className={`font-semibold text-2xl ${contentClassName} !text-slate-700`}
        >
          {loading ? <Skeleton width={50} animation="wave" /> : content}
        </h1>
        <h1
          className={`${titleClassName} !text-slate-700 text-md text-center font-semibold`}
        >
          {loading ? <Skeleton width={100} animation="wave" /> : title}
        </h1>
      </div>
    </div>
  );
}
