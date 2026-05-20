import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  icon: React.ReactElement;
  content: string;
  title: string;
  iconClassName?: string;
  className?: string;
  path?: string;
  loading?: boolean;
};

const InfoCard2 = ({
  icon,
  content,
  title,
  iconClassName,
  className,
  path,
  loading = false,
}: Props) => {
  const router = useRouter();

  return (
    <div
      onClick={() => path && router.push(path)}
      className={`flex flex-col w-full cursor-pointer items-center gap-4 rounded-2xl shadow-xl transition-all ease-in-out duration-300 scale-100 p-4 border ${className} `}
    >
      {loading ? (
        <Skeleton variant="rounded" animation="wave" height={80} width={80} />
      ) : (
        <div className={`flex items-center justify-center ${iconClassName} `}>
          {icon}
        </div>
      )}

      <h3 className="font-semibold w-fill tracking-wide text-center text-4xl text-theme">
        {loading ? (
          <Skeleton
            variant="rounded"
            animation="wave"
            height={30}
            width={100}
          />
        ) : (
          content
        )}
      </h3>
      <h3 className="font-semibold w-fill text-lg tracking-wide text-center text-theme">
        {loading ? (
          <Skeleton variant="text" animation="wave" width={200} />
        ) : (
          title
        )}
      </h3>
    </div>
  );
};

export default InfoCard2;
