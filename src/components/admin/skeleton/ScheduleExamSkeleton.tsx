import { Skeleton } from "@mui/lab";

export default function AllDepartmentCard({ i }: { i: number }) {
  return (
    <>
      {Array(i)
        .fill(0)
        .map((item, index) => (
          <div
            className="w-full shadow-lg border border-gray-50 bg-white p-4 flex flex-col gap-4 items-center rounded-xl "
            key={index}
          >
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              animation="pulse"
            />
            <Skeleton variant="text" width={150} sx={{ fontSize: "1rem" }} />
            <Skeleton variant="text" width={150} sx={{ fontSize: "0.5rem" }} />
            <Skeleton variant="text" width={150} sx={{ fontSize: "0.5rem" }} />
            <Skeleton variant="rectangular" width={210} height={40} />
          </div>
        ))}
    </>
  );
}
