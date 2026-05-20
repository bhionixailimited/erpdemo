import { Skeleton } from "@mui/lab";

export default function DepartmentSkeleton({ i }: { i: number }) {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div
            key={index}
            className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-white rounded-xl "
          >
            <div
              className={`flex flex-col 2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-44`}
            >
              <Skeleton
                variant="rounded"
                width={80}
                height={80}
                animation="pulse"
              />
              <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
              <Skeleton variant="rectangular" width={210} height={40} />
            </div>
          </div>
        ))}
    </>
  );
}
