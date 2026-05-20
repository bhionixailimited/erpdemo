import { ChevronRight } from "@mui/icons-material";
import { Button, Divider, Skeleton } from "@mui/material";
import { AssignmentIconNew } from "assets/static-icon";
import { Empty } from "components/core";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { AssignmentType } from "types/assignment";

type UpcomingAssignmentDataType = {
  data: AssignmentType[];
};

const OngoingAssignmentSt = () => {
  const { data, isValidating } = useSWRFetch<UpcomingAssignmentDataType>(
    `dashboard/student/upcoming-assignment?perPage=5&pageNo=1`
  );

  const router = useRouter();

  const { user } = useAuth();

  return (
    <div className="w-full bg-white h-full flex flex-col gap-4 ">
      <div className="flex flex-col border shadow-xl rounded-xl p-6 w-full gap-3">
        <h3 className="font-semibold tracking-wide text-lg">
          Upcoming Assignments
        </h3>
        <div className="flex flex-col gap-4 min-h-[250px] ">
          {isValidating || !data ? (
            Array(3)
              .fill(0)
              .map((item, index) => (
                <div className="flex gap-4 h-20 items-center" key={index}>
                  <Skeleton height={100} width={100} animation="wave" />
                  <div className="flex flex-col  gap-4">
                    <Skeleton width={250} animation="wave" />
                    <Skeleton width={350} animation="wave" />
                  </div>
                </div>
              ))
          ) : data?.data && data?.data?.length ? (
            data?.data?.map((item) => (
              <div
                key={item?._id}
                className="flex flex-row gap-4 items-center  border p-2 rounded-md"
              >
                <div className="rounded-lg w-1/4 flex items-center justify-center">
                  {/* <School className="text-themeSecondary" /> */}
                  <img
                    src={AssignmentIconNew.src}
                    alt="assignment"
                    className="w-16 h-16"
                  />
                </div>
                <div className="flex flex-col items-start w-3/4">
                  <h3 className="font-medium text-sm">{item?.title}</h3>
                  <small className="font-semibold">
                    Last Date
                    <p className="text-gray-400">
                      {" "}
                      {dayjs(item?.dueDate).format("LLL")}
                    </p>
                  </small>
                </div>
              </div>
            ))
          ) : (
            <Empty title="Empty 🙂" />
          )}
        </div>
        <Divider />
        {user?.role !== "PARENT" && (
          <div className="!text-right p-1">
            <Button
              onClick={() => router.push("/panel/student/assignment")}
              size="small"
              className="!font-bold !text-slate-600 !ml-0!text-xs normal-case"
              endIcon={<ChevronRight className=" !text-2xl " />}
            >
              View All
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OngoingAssignmentSt;
