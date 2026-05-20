import { Skeleton } from "@mui/material";
import { useRouter } from "next/router";
import { useState } from "react";

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

export default function AdmissionDashboardCard({
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
  const [noteOpen, setNoteOpen] = useState<boolean>(false);
  const router = useRouter();

  return (
    <>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={` flex justify-between cursor-pointer flex-row dashboard-card-shadow items-center gap-4  p-6 transition duration-150 ease-in-out ${className}`}
      >
        <div className="flex h-full w-2/3 flex-col justify-center">
          <h4
            className={`group-hover:text-white text-lg font-semibold ${contentClassName}`}
          >
            {loading ? (
              <Skeleton
                variant="rounded"
                height={30}
                width={100}
                animation="wave"
              />
            ) : (
              content
            )}
          </h4>

          {/* <h4 className={`text-sm ${contentClassName}`}>{content}</h4> */}
          <h1
            className={`group-hover:text-white text-md font-semibold ${titleClassName}`}
          >
            {loading ? (
              <Skeleton
                variant="rounded"
                height={20}
                width={250}
                animation="wave"
              />
            ) : (
              title
            )}
          </h1>
        </div>

        {loading ? (
          <Skeleton
            variant="circular"
            height={100}
            width={100}
            animation="wave"
          />
        ) : (
          <div className={`rounded-full  ${iconClassName}`}>
            <div className="text-md p-3 group-hover:text-white ">{icon}</div>
          </div>
        )}
      </div>
    </>
  );
}
