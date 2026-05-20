import { Skeleton } from "@mui/lab";

export default function PaymentSkeleton({ i }: { i: number }) {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div
            className="px-4 py-2 rounded-lg w-full flex gap-3  justify-start items-center "
            key={index}
          >
            <div className="w-fit mt-1">
              <Skeleton
                variant="circular"
                width={50}
                height={50}
                animation="pulse"
              />
            </div>
            <div>
              <Skeleton variant="text" width={180} sx={{ fontSize: "1rem" }} />
              <Skeleton
                variant="text"
                width={150}
                sx={{ fontSize: "0.5rem" }}
              />
            </div>
            <Skeleton variant="text" width={150} sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={150} sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={150} sx={{ fontSize: "2rem" }} />
            <Skeleton variant="text" width={150} sx={{ fontSize: "2rem" }} />
          </div>
        ))}
    </>
  );
}
