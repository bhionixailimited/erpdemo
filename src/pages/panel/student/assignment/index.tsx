import { Avatar, Skeleton } from "@mui/material";
import { AssignmentIconNew, Learning } from "assets/static-icon";
import { Button, Empty } from "components/core";
import { ViewAssignment } from "components/students";
import dayjs from "dayjs";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { AssignmentType } from "types/assignment";

type OngoingAssignmentDataType = {
  data: AssignmentType[];
};

type CompletedAssignmentType = {
  data: {
    _id: string;
    createdBy: string;
    dateOfAssignment: string;
    dueDate: string;
    fullMark: number;
    introduction: number;
    isSubmitted: boolean;
    title: string;
    totalCorrectAnswer: number;
    totalMarkSecure: number;
    type: string;
  }[];
};

const AssignmentPanel = () => {
  const { push } = useRouter();

  const { user } = useAuth();

  const { data: ongoingAssignment, isValidating: loadingOngoing } =
    useSWRFetch<OngoingAssignmentDataType>(
      `assignment?creationType=NEW&perPage=4&pageNo=1`
    );

  const { data: completeAssignment, isValidating: loadingComplete } =
    useSWRFetch<CompletedAssignmentType>(
      user?._id && `assignment/student/${user?._id}?perPage=4&pageNo=1`
    );

  return (
    <PrivateLayout title="Assignment | Student">
      <div className="w-full bg-white container mx-auto flex flex-col">
        <div className="w-full p-2 md:p-6 flex flex-col gap-5">
          <div className="w-full h-44 2xl:h-52 border rounded-xl relative bg-theme  flex items-center">
            <div className="w-1/4 2xl:w-1/5">
              <img
                src={Learning.src}
                alt="user-display"
                className="w-52 2xl:w-60 absolute left-0 -top-10"
              />
            </div>
            <div className="md:flex hidden gap-2 flex-col 2xl:w-4/5 w-3/4">
              <p className="text-white text-3xl font-semibold">
                Hi {user?.displayName || "Unknown"}
              </p>
              <p className="text-white tracking-wide font-semibold">
                Complete all assignment and improve your skills and knowledge.
              </p>
            </div>
          </div>

          <div className="md:grid-cols-12 grid-cols-6  grid w-full gap-5">
            <div className="col-span-6 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] p-2 md:p-5 gap-5 flex flex-col rounded-lg h-">
              <div className="w-full justify-between flex">
                <p className="text-themeSecondary/70 font-semibold text-lg">
                  Complete Assignment
                </p>
              </div>
              {/* <div className="flex flex-col gap-2">
                <p>4 Assignment completed out of 10</p>
                <CustomProgress ProgressValue={60} />
              </div> */}
              <div className="flex flex-col gap-2">
                {!completeAssignment || loadingComplete ? (
                  Array(4)
                    .fill(0)
                    .map((i, index) => (
                      <div
                        key={index}
                        className="flex justify-between p-3 gap-1 hover:bg-gray-50 common-transition rounded-lg"
                      >
                        <div className="flex flex-col gap-1">
                          <Skeleton
                            variant="text"
                            width={150}
                            animation="wave"
                          />
                          <Skeleton
                            variant="text"
                            width={150}
                            animation="wave"
                          />
                        </div>
                        <Skeleton
                          variant="rounded"
                          height={35}
                          width={100}
                          animation="wave"
                        />
                      </div>
                    ))
                ) : completeAssignment?.data?.length ? (
                  completeAssignment?.data?.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between  md:p-3 gap-1 hover:bg-gray-50 common-transition rounded-lg"
                    >
                      <div className="flex flex-col gap-1">
                        <p className=" text-theme font-semibold text-lg">
                          {item?.title}
                        </p>
                        <p className="text-themeSecondary text-sm">
                          {dayjs(item?.dueDate).format("LLL")}
                        </p>
                      </div>
                      <div
                        className={`${
                          item.isSubmitted ? "bg-theme" : "bg-themeSecondary"
                        } px-2 py-1.5 rounded-2xl text-xs md:text-sm text-white  w-24 text-center h-fit`}
                      >
                        {item.isSubmitted ? "Submitted" : "Not Submitted"}
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full col-span-12 flex items--center justify-center">
                    <Empty title="No data available" />
                  </div>
                )}
              </div>
            </div>
            <div className="col-span-6 rounded-lg w-full bg-white  p-2 md:p-5 flex flex-col gap-5 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]">
              <p className="text-themeSecondary/70 font-semibold text-lg">
                Ongoing Assignment
              </p>
              <div className="grid grid-cols-12 w-full gap-3">
                {!ongoingAssignment || loadingOngoing ? (
                  Array(4)
                    .fill(0)
                    .map((i, index) => (
                      <div
                        key={index}
                        className="col-span-6 flex h-48 border items-center justify-center flex-col gap-2 rounded-lg"
                      >
                        <Skeleton
                          variant="circular"
                          height={80}
                          width={80}
                          animation="wave"
                        />
                        <Skeleton variant="text" width={150} animation="wave" />
                        <Skeleton
                          variant="rounded"
                          height={40}
                          width={100}
                          animation="wave"
                        />
                      </div>
                    ))
                ) : ongoingAssignment?.data?.length ? (
                  ongoingAssignment?.data?.map((item) => (
                    <div
                      key={item?._id}
                      className="col-span-6 flex h-48 border items-center justify-center flex-col gap-2 rounded-lg"
                    >
                      <Avatar
                        className="bg-[#0000000e] border object-contain p-2"
                        src={AssignmentIconNew.src}
                        sx={{
                          height: "4rem",
                          width: "4rem",
                          objectFit: "contain",
                        }}
                      ></Avatar>
                      <p className="text-lg font-semibold">{item?.title}</p>
                      <div>
                        <Button
                          className="!bg-themeSecondary !text-white text-xs md:!text-sm !w-fit"
                          onClick={() =>
                            push(`/panel/student/assignment/${item?._id}`)
                          }
                        >
                          Take Assignment
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="w-full col-span-12 flex items--center justify-center">
                    <Empty title="No ongoing assignment" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <ViewAssignment />
      </div>
    </PrivateLayout>
  );
};

export default withProtectedStudent(AssignmentPanel);
