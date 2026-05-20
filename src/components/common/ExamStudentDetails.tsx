import { Avatar, Skeleton } from "@mui/material";
import { StudentCardBg } from "assets/backgrounds";

type Props = {
  displayName?: string;
  email?: string;
  rollNumber?: string;
  batch?: any;
  markSecured?: number;
  totalAttempted?: number;
  totalQuestions?: number;
  photoUrl?: string;
  fullMark?: number;
  loading?: boolean;
};

const ExamStudentDetails = ({
  batch,
  displayName = "Unavailable",
  email = "Unavailable",
  markSecured = 0,
  rollNumber = "Unavailable",
  totalQuestions = 0,
  totalAttempted = 0,
  photoUrl,
  fullMark,
  loading,
}: Props) => {
  return (
    <>
      {loading ? (
        <div className="w-full col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
          <div className="flex items-center justify-center flex-col shadow-xl rounded-lg  common-transition cursor-pointer gap-6">
            <div className="h-24 2xl:h-28 w-full relative rounded-t-lg">
              <div className="w-full h-full">
                <Skeleton variant="rounded" height={120} animation="wave" />
                <div className=" justify-center gap-4 absolute top-1/1 z-50 w-full flex h-full items-center p-2">
                  <div className="w-fit h-fit bg-gray-100 rounded-full ">
                    <Skeleton
                      variant="circular"
                      width={100}
                      height={100}
                      animation="wave"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="p-5 flex flex-col w-full gap-1 items-left justify-center mt-16">
              <p className="text-lg font-semibold ">
                <Skeleton variant="text" animation="wave" width={150} />
              </p>
              <p className="text-sm font-semibold text-theme cursor-pointer">
                <Skeleton variant="text" animation="wave" width={200} />
              </p>
              <p className="text-sm font-semibold text-theme cursor-pointer">
                <Skeleton variant="text" animation="wave" width={210} />
              </p>
              <p className="text-sm font-semibold text-theme cursor-pointer">
                <Skeleton variant="text" animation="wave" width={200} />
              </p>
              <span className="text-xs tracking-tight flex gap-1 font-semibold">
                <span className="font-semibold text-theme">
                  <Skeleton
                    variant="rounded"
                    animation="wave"
                    width={120}
                    height={30}
                  />
                </span>
              </span>
            </div>
          </div>
        </div>
      ) : (
        <div className="w-full bg-white rounded-xl shadow-xl cursor-pointer  flex flex-col gap-4">
          <div
            className="h-32 w-full relative rounded-t-xl"
            style={{
              backgroundImage: `url(${StudentCardBg.src})`,
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <div className="bg-[#000] rounded-t-xl bg-opacity-40 bg-clip-padding backdrop-blur-sm backdrop-filter w-full h-full">
              <div className=" justify-center gap-4 absolute top-1/2 z-50 w-full flex h-full items-center p-2">
                <Avatar
                  className="bg-[#ffffff6b] border"
                  src={
                    photoUrl ||
                    `https://avatars.dicebear.com/api/avataaars/${displayName}.svg`
                  }
                  sx={{
                    height: "6rem",
                    width: "6rem",
                  }}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col justify-center items-center pt-8 text-center ">
            <h3 className="font-medium tracking-wide text-lg">{displayName}</h3>
            <small className="text-gray-400 font-medium tracking-wide">
              {email}
            </small>
          </div>
          <div className="flex flex-col gap-1 p-4 items-start pt-3">
            <h6 className="font-medium tracking-wide text-sm">
              Roll No. : <span className="text-theme">{rollNumber}</span>
            </h6>
            <h6 className="font-medium tracking-wide text-sm">
              Batch/Class - {batch?.course?.title} {batch?.branch?.title}{" "}
              {batch?.session?.title}
            </h6>
            <h6 className="font-medium tracking-wide text-sm ">
              Mark Secured From Answer - {markSecured}/{fullMark}
            </h6>
            <h6 className="font-medium tracking-wide text-sm ">
              Total Attempted - {totalAttempted}
            </h6>
            <h6 className="font-medium tracking-wide text-sm ">
              Total Questions - {totalQuestions}
            </h6>
          </div>
        </div>
      )}
    </>
  );
};

export default ExamStudentDetails;
