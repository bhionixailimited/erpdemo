import { ProgressBar } from "components/core";

type Props = {
  icon: React.ReactElement;
  title: string;
  subtitle: string;
  heading: string;
  head?: string;
  iconClassName?: string;
};

export const DashboardCard = ({
  title,
  subtitle,
  head,
  heading,
  icon,
  iconClassName,
}: Props) => {
  return (
    <div>
      <div className="bg-theme rounded-xl  p-[24px] shadow-lg relative flex h-full flex-col overflow-hidden lg:w-full">
        <div className="flex flex-row gap-10 ">
          <div className={`rounded-xl`}>
            <div className="absolute right-[-5px] top-7 text-white">{icon}</div>
          </div>
          <div>
            {/* <div className="relative col-span-1 flex h-20 w-20 flex-col items-center justify-center gap-2 rounded-full border-4 lg:h-28 lg:w-28">
              <div className="flex flex-col items-center justify-center">
                <div>
                  <h2 className="text-xl tracking-wide text-white ">
                    {heading}
                  </h2>
                </div>
              </div>
              <div className="absolute top-0 left-0 w-full h-full lg:w-full lg:h-full border-4 border-green-500 rounded-full"></div>
            </div> */}
            <ProgressBar value={70} />
          </div>

          <div className="flex flex-col justify-center ">
            <h1 className=" text-2xl font-bold text-white">{title}</h1>
            <p className="text-base text-slate-200 text-eventColor lg:w-11/12">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
