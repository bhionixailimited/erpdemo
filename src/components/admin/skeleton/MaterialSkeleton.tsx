import { Skeleton } from "@mui/material";

const MaterialSkeleton = ({
  i,
  className,
}: {
  i: number;
  className?: string;
}) => {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div
            key={index}
            className={`w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden   shadow-md  bg-white rounded-xl ${className}`}
          >
            <div
              className={`flex flex-col gap-4 items-center 2xl:p-4  justify-center  h-32 xl:h-36 2xl:h-44`}
            >
              <div>
                <Skeleton
                  variant="rounded"
                  width={80}
                  height={80}
                  animation="pulse"
                />
              </div>
              <div className="flex items-center flex-col w-full justify-center">
                <Skeleton
                  variant="text"
                  width={100}
                  sx={{ fontSize: "1rem" }}
                />
                <Skeleton
                  variant="text"
                  width={210}
                  sx={{ fontSize: "1rem" }}
                />
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default MaterialSkeleton;
