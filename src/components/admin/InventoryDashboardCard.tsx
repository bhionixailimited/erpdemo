
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
};

export default function InventoryDashboardCard({
  title,
  icon,
  content,
  className = "",
  iconClassName = "",
  titleClassName = "",
  contentClassName = "",
  clickableRoute = "",
}: Props) {
  const router = useRouter();
  return (
    <div>
      <div
        onClick={() => router.push(`${clickableRoute}`)}
        className={` h-44 flex flex-col p-4 shadow-[rgba(13,_38,_76,_0.19)_0px_9px_20px]  cursor-pointer items-center text-center ${className}`}
      >
        <div className={`rounded-xl  ${iconClassName}`}>
          <div className="h-full w-[20%] text-sm p-3">{icon}</div>
        </div>
        <div className="py-6">
          <h2 className={`${contentClassName}`}>{content}</h2>
          <h1
            className={` tracking-wider md:text-xs lg:text-sm ${titleClassName}`}
          >
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
