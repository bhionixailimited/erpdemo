import { RadialGraph } from "components/graph";
import { useSWRFetch } from "hooks";

type AssignmentData = {
  data: {
    ATTACHMENT: number;
    LONGTYPE: number;
    MCQTYPE: number;
  };
};

const LastAssignment = () => {
  const { data } = useSWRFetch<AssignmentData>(
    `dashboard/teacher/assignment-type-stat`
  );

  return (
    <div className="w-full h-full bg-white shadow-xl rounded-xl py-4 border ">
      <RadialGraph
        series={
          (data?.data &&
            Object.values(data?.data as any)?.map((item: any) =>
              (
                (item /
                  Number(
                    (data?.data &&
                      Object.values(data?.data as any)?.reduce(
                        (a: any, b: any) => a + b,
                        0
                      )) ||
                      1
                  )) *
                100
              )?.toFixed()
            )) ||
          []
        }
        colors={["#5B50A1", "#C43C5C"]}
        title={"Assignment Type Overview"}
        labels={(data?.data && Object.keys(data?.data as any)) || []}
        average={String(
          data?.data &&
            Object.values(data?.data as any)?.reduce(
              (a: any, b: any) => a + b,
              0
            )
        )}
      />
    </div>
  );
};

export default LastAssignment;
