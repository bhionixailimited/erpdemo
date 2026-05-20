import { Skeleton } from "@mui/material";

export default function NoticeSkeleton({
  i,
  className,
}: {
  i: number;
  className?: string;
}) {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div
            key={index}
            className="w-full bg-white shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] py-3 rounded-lg flex justify-between px-3 items-center"
          >
            <div className="flex gap-2 justify-between items-start w-full">
              <div className="gap-4  w-full flex">
                <div className="w-12 h-12 flex items-center justify-center text-theme rounded-full bg-gray-100"></div>
                <div className="flex flex-col w-full">
                  <Skeleton variant="text" width={300} animation="wave" />
                  <Skeleton variant="text" width={300} animation="wave" />
                  <Skeleton variant="rounded" height={100} animation="wave" />
                  <Skeleton variant="text" width={300} animation="wave" />
                </div>
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
