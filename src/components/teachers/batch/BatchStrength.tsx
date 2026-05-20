import { MultiBarGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type BatchStrengthType = {
  data: {
    branch: string;
    course: string;
    student: {
      _id: string;
      totalStudent: number;
    }[];
    _id: string;
  }[];
};

const BatchStrength = () => {
  const { data: batch } = useSWRFetch<BatchStrengthType>(
    `dashboard/teacher/batch-wise-student`
  );

  return (
    <div className="w-full bg-white border shadow-xl p-4 rounded-xl">
      <MultiBarGraph
        series={[
          {
            name: "Boys",
            data:
              batch?.data?.map(
                (item) =>
                  item?.student?.find((student) => student?._id === "MALE")
                    ?.totalStudent || 0
              ) || [],
          },
          {
            name: "Girls",
            data:
              batch?.data?.map(
                (item) =>
                  item?.student?.find((student) => student?._id === "FEMALE")
                    ?.totalStudent || 0
              ) || [],
          },
          {
            name: "Others",
            data:
              batch?.data?.map(
                (item) =>
                  item?.student?.find((student) => student?._id === "OTHER")
                    ?.totalStudent || 0
              ) || [],
          },
        ]}
        categories={
          batch?.data?.map((item) => item?.course + "-" + item?.branch) || []
        }
        colors={["#5B50A1", "#C43C5C"]}
        title="Batch wise Student Strength"
        height={540}
      />
    </div>
  );
};

export default BatchStrength;
