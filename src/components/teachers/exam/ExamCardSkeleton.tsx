import { Skeleton } from "@mui/material";

const ExamCardSkeleton = () => {
  return (
    <div className="w-full shadow-lg bg-gray-100  p-4 flex flex-col gap-4 items-center rounded-xl ">
      <Skeleton animation="wave" variant="circular" height={100} width={100} />

      <h3 className="font-semibold tracking-wide text-xl">
        <Skeleton animation="wave" variant="text" width={150} />
      </h3>
      <div className="flex flex-col gap-1 ">
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">
            <Skeleton animation="wave" variant="text" width={50} />
          </h3>
          <small className="tracking-wide text-theme font-medium">
            <Skeleton animation="wave" variant="text" width={200} />
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">
            <Skeleton animation="wave" variant="text" width={50} />
          </h3>
          <small className="tracking-wide text-theme font-medium">
            <Skeleton animation="wave" variant="text" width={200} />
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">
            <Skeleton animation="wave" variant="text" width={50} />
          </h3>
          <small className="tracking-wide text-theme font-medium">
            <Skeleton animation="wave" variant="text" width={200} />
          </small>
        </span>
      </div>

      <Skeleton animation="wave" variant="rounded" width={150} height={30} />
    </div>
  );
};

export default ExamCardSkeleton;
