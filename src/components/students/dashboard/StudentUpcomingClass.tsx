import { Skeleton } from "@mui/material";
import { RadialBarMeter } from "components/admin/analytics";
import { UpComingCommon } from "components/common";
import { useAuth, useSWRFetch } from "hooks";
import Link from "next/link";

type CreditScoreType = {
  data: {
    creditScore: number;
  };
};

const UpcomingClass = () => {
  const { user } = useAuth();

  const { data, isValidating } = useSWRFetch<CreditScoreType>(
    (user?.userParent?._id && `student/credit/${user?.userParent?._id}`) ||
      (user?._id && `student/credit/${user?._id}`)
  );

  return (
    <div className="w-full bg-white  flex flex-col gap-4">
      <div>
        <UpComingCommon />
      </div>
      <Link href={`/panel/student/attendance`}>
        <div className="flex w-full flex-col items-center shadow-xl rounded-xl border px-6 py-4  hover:scale-105 common-transition">
          <RadialBarMeter
            type={"radialBar"}
            value={Math.round(data?.data?.creditScore || 0)}
          />
          {isValidating ? (
            <Skeleton
              height={25}
              width={250}
              variant="rounded"
              animation="wave"
            />
          ) : (
            <h3 className="font-semibold text-lg tracking-wide text-center">
              Available Credit{" "}
              {Math.round(data?.data?.creditScore || 0) ?? "Unavailable"}
            </h3>
          )}
        </div>
      </Link>
    </div>
  );
};

export default UpcomingClass;
