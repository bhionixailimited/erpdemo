import { Skeleton } from "@mui/material";
import { RadialBarMeter } from "components/admin/analytics";
import { useSWRFetch } from "hooks";

type SuccessResultType = {
  data: {
    totalStudentPassPercentage: number;
    totalStudentPass: number;
    totalStudentFail: number;
  };
};

const ExamByResult = () => {
  const { data, isValidating } = useSWRFetch<SuccessResultType>(
    `dashboard/teacher/student-success-rate`
  );
  return (
    <div className="w-full flex items-center justify-center h-full ">
      <div className="flex flex-col items-center">
        <RadialBarMeter
          type={"radialBar"}
          value={Number(
            data?.data?.totalStudentPassPercentage?.toFixed(2) || 0
          )}
        />
        <h3 className="font-semibold text-lg tracking-wide text-center">
          {isValidating ? (
            <Skeleton variant="text" width={80} />
          ) : (
            "Total Student Pass"
          )}
        </h3>
        <h3 className="text-4xl font-semibold tracking-wide">
          {isValidating ? (
            <Skeleton variant="text" width={50} />
          ) : (
            `${data?.data?.totalStudentPass}`
          )}
        </h3>
      </div>
    </div>
  );
};

export default ExamByResult;
