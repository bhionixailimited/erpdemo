import { Skeleton } from "@mui/material";
import { useAuth } from "hooks";
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
  icon: React.ReactElement;
  loading?: boolean;
};

export default function InfoCards({
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
  const { user } = useAuth();
  // Check if the user role allows clicking the card
  const isClickable =
    user?.role && ["SUPER_ADMIN", "MANAGER"]?.includes(String(user?.role));

  // Define the onClick function conditionally
  const handleClick = () => {
    if (isClickable && clickableRoute) {
      router.push(clickableRoute);
    }
  };
  return (
    <>
      <div
        onClick={!isClickable ? handleClick : undefined}
        className={`${
          !isClickable ? "cursor-pointer" : "cursor-default"
        } group hover:bg-theme flex  border-b-4 border-theme  flex-row dashboard-card-shadow items-center gap-4 rounded-[1.5rem] p-6 transition duration-150 ease-in-out ${className} `}
      >
        <div className={`rounded-xl  ${iconClassName} p-1`}>
          <div className="h-full w-[20%] text-sm p-2 group-hover:text-white ">
            {icon}
          </div>
        </div>

        <div className="flex gap-1 h-full w-2/3 flex-col pt-1">
          <h4
            className={`group-hover:text-white text-xl font-semibold ${contentClassName}`}
          >
            {loading ? <Skeleton width={150} animation="wave" /> : content}
          </h4>

          <h1
            className={`group-hover:text-white text-xl font-semibold ${titleClassName}`}
          >
            {loading ? <Skeleton animation="wave" /> : title}
          </h1>
        </div>
      </div>
    </>
  );
}
