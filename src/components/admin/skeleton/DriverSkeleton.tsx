import { Skeleton } from "@mui/material";

export default function DepartmentSkeleton({
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
            className={`w-full py-4 cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-white rounded-xl ${className}`}
          >
            <div
              className={`flex flex-col gap-5  2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-44`}
            >
              <div>
                <Skeleton
                  variant="rounded"
                  width={90}
                  height={90}
                  animation="pulse"
                />
              </div>

              <div className="flex flex-col justify-center items-center gap-1">
                <Skeleton
                  variant="text"
                  width={210}
                  sx={{ fontSize: "1rem" }}
                />
                <div className="flex flex-row gap-2 px-2">
                  <Skeleton
                    variant="text"
                    width={120}
                    sx={{ fontSize: "0.8rem" }}
                  />
                  <Skeleton
                    variant="text"
                    width={120}
                    sx={{ fontSize: "0.8rem" }}
                  />
                </div>

                <Skeleton
                  variant="text"
                  width={210}
                  sx={{ fontSize: "0.7rem" }}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
}
