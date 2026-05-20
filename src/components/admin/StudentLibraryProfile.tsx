import { Avatar, Skeleton } from "@mui/material";
import { Button } from "components/core";
import { LibraryMessageForm } from "components/form/admin";
import { useSWRFetch } from "hooks";
import { useState } from "react";
import UserType from "types/user";
type dataType = {
  data: {
    totalBookIssue: number;
    totalFinePending: number;
    totalReturnedBook: number;
    user: UserType;
    _id: string;
  };
};
const StudentLibraryProfile = ({
  studentId,
  type,
}: {
  studentId?: string;
  type?: string;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const [openMessage, setOpenMessage] = useState(false);
  const { data, isValidating } = useSWRFetch<dataType>(
    studentId && `library/student/${studentId}`
  );

  return (
    <div className="w-full bg-white shadow-xl rounded-lg">
      {type !== "STUDENT" && (
        <LibraryMessageForm
          open={openMessage}
          closeFn={() => setOpenMessage(false)}
        />
      )}

      <div className="flex flex-col xl:flex-row items-center">
        <div className="flex items-center flex-col gap-4 justify-center p-4 xl:p-8 xl:border-r">
          {isValidating ? (
            <Skeleton variant="circular" width={120} height={120} />
          ) : (
            <Avatar
              src={data?.data?.user?.photoUrl}
              sx={{
                height: "7rem",
                width: "7rem",
              }}
              className="!bg-gray-100 !shadow-lg "
            >
              {data?.data?.user?.displayName}
            </Avatar>
          )}
          {isValidating ? (
            <Skeleton variant="text" width={70} />
          ) : (
            <h3 className="text-center tracking-wide font-semibold w-full text-xl">
              {data?.data?.user?.displayName ?? ""}
            </h3>
          )}
          {isValidating ? (
            <Skeleton variant="text" width={170} />
          ) : (
            <small className="text-gray-600 tracking-wide">
              {data?.data?.user?.academicDetails?.registrationNumber ?? ""}
            </small>
          )}
          {/* {type !== "STUDENT" && (
            <div className="flex items-center gap-4 flex-wrap justify-center">
              {isValidating ? (
                <Skeleton variant="rectangular" width={70} height={30} />
              ) : (
                <Button
                  className="!bg-green-600 hover:ring-green-600"
                  onClick={() => setOpenMessage(true)}
                >
                  Message
                </Button>
              )}
            </div>
          )} */}
        </div>
        <div className="flex flex-col w-full ">
          <h3 className="font-semibold tracking-wide text-2xl border-b p-4 text-theme">
            {isValidating ? (
              <Skeleton variant="text" width={170} height={30} />
            ) : (
              "Profile Details"
            )}
          </h3>
          <div className="flex flex-col lg:flex-row gap-4 items-start border-b p-4  w-full">
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Session"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.user?.batch?.session?.title ?? "Not Provided"
                )}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Course"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.user?.batch?.course?.title ?? "Not Provided"
                )}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Branch"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.user?.batch?.branch?.title ?? "Not Provided"
                )}
              </h3>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-start border-b p-4  w-full">
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Roll Number"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.user?.academicDetails?.rollNumber ??
                  "Not Provided"
                )}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Library Card Number"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.user?.academicDetails?.libraryCardNumber ??
                  "Not Provided"
                )}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Gender"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.user?.gender ?? "Not Provided"
                )}
              </h3>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row gap-4 items-start  p-4  w-full">
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Total Book Taken"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.totalBookIssue ?? "Not Provided"
                )}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Total Book Returned"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.totalReturnedBook ?? "Not Provided"
                )}
              </h3>
            </div>
            <div className="flex flex-col w-full">
              <h3 className="font-medium tracking-wide text-gray-600">
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  "Fine Pending"
                )}
              </h3>
              <h3 className="font-semibold tracking-wide text-sm">
                {" "}
                {isValidating ? (
                  <Skeleton variant="text" width={100} height={30} />
                ) : (
                  data?.data?.totalFinePending ?? "Not Provided"
                )}
              </h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLibraryProfile;
