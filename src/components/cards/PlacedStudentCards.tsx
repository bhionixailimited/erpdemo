import { Avatar } from "@mui/material";
import dayjs from "dayjs";

const PlacedStudentCards = ({
  studentName,
  branch,
  course,
  session,
  email,
  placementYear,
  gender,
  rollNumber,
}: any) => {
  return (
    <div className="w-full   bg-white shadow-xl rounded-lg p-4 scale-100 hover:scale-95 duration-300 ease-in-out transition-all cursor-pointer select-none my-2">
      <div className="w-full flex gap-4  ">
        <div className="flex items-center justify-center w-fit ">
          {/* <div className="h-5 w-5 bg-gray-400">{studentName?.[0]}</div> */}
          <Avatar
            // src={photoUrl}
            src=""
            sx={{
              height: "5rem",
              width: "5rem",
              borderRadius: "5px",
            }}
            className="!bg-gray-300 !shadow-lg"
          >
            <p className="text-2xl text-black font-semibold">
              {studentName?.[0]}
            </p>
          </Avatar>
        </div>

        <div className="flex flex-col md:flex-row md:gap-2 lg:gap-4 pl-2">
          <div className="flex flex-col gap-1 items-start">
            <h3 className="font-semibold tracking-wide text-xl break-words break-all">
              Name: {studentName}
            </h3>

            <p className="font-semibold tracking-wide  break-words break-all">
              Email: {email}
            </p>
            <p className="font-semibold tracking-wide  break-words break-all">
              Placement Year: {dayjs(placementYear).format("MMM D, YYYY")}
            </p>
            <p className="font-semibold tracking-wide  break-words break-all">
              Gender: {gender}
            </p>

            {/* <small className="tracking-wide bg-theme px-2 py-1 text-white rounded-md !shadow-lg break-words break-all">
            Placed At {`${companyName} (${position})`}
          </small> */}
            {/* <small className="tracking-wide text-gray-500 break-words break-all">
            {batch
              ? `${batch?.course?.title} ${batch?.branch?.title}(${batch?.session?.title})`
              : ""}
          </small> */}
          </div>
          <div className="flex flex-col gap-1 items-start">
            <p className="font-semibold tracking-wide  break-words break-all">
              Roll No: {rollNumber}
            </p>
            <p className="font-semibold tracking-wide  break-words break-all">
              Branch: {branch}
            </p>
            <p className="font-semibold tracking-wide break-words break-all">
              Course: {course}
            </p>
            <p className="font-semibold tracking-wide break-words break-all">
              Session: {session}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlacedStudentCards;
