import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  title: string;
  content?: string;
  className?: string;
  iconClassName?: string;
  titleClassName?: string;
  contain?: string;
  contentClassName?: string;
  clickableRoute?: string;
  icon?: React.ReactElement;
  loading?: boolean;
};

export default function TimetableCard({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
  loading = false,
  clickableRoute = "",
}: Props) {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={`flex cursor-pointer flex-row  dashboard-card-shadow items-center gap-4 rounded-[1.5rem] p-2 bg-white transition duration-150 ease-in-out ${className} `}
      >
        <div className={`rounded-xl  ${iconClassName}`}>
          <div className="h-full w-[20%] text-sm p-3 group-hover:text-white ">
            {icon}
          </div>
        </div>
        <div className="flex h-full w-2/3  flex-col justify-center items-center ">
          <h4 className={`group-hover:text-white text-4xl ${contentClassName}`}>
            {loading ? (
              <Skeleton width={100} height={50} animation="wave" />
            ) : (
              content
            )}
          </h4>

          <h1
            className={`group-hover:text-white text-lg font-medium py-2 ${titleClassName}`}
          >
            {loading ? <Skeleton width={150} animation="wave" /> : title}
          </h1>
        </div>
      </div>
    </>
  );
}
