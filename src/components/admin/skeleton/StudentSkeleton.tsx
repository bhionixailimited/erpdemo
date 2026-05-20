import { Skeleton } from "@mui/lab";

export default function StudentSkeleton({ i }: { i: number }) {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div
            className="w-full shadow-lg border border-gray-50 bg-white p-4 col-span-12 md:col-span-3 rounded-xl  "
            key={index}
          >
            <div className="flex flex-row gap-4">
              <Skeleton
                variant="circular"
                width={70}
                height={70}
                animation="pulse"
              />
              <Skeleton
                variant="rectangular"
                width={170}
                height={20}
                className="!mt-3 !rounded-xl"
              />
            </div>
            <Skeleton variant="text" width={150} sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" width={200} sx={{ fontSize: "1rem" }} />
          </div>
        ))}
    </>
  );
}
