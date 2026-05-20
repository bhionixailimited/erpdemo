import { Avatar } from "@mui/material";
import { StudentCardBg } from "assets/backgrounds";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type Props = {
  type?: string;
  name?: string;
  email?: string;
  rollNo?: string;
  markSecured?: number;
  submissionDate?: string;
  totalAttempted?: number;
  answerSubmitted?: boolean;
  assignmentId?: string;
  studentId?: string;
  photoUrl?: string;
  fullMark?: number;
  reviewed?: boolean;
};

const StudentCard = ({
  fullMark = 0,
  type,
  answerSubmitted,
  email = "Not Provided",
  markSecured,
  name = "Not Provided",
  rollNo = "Not Provided",
  submissionDate,
  totalAttempted,
  assignmentId,
  studentId,
  photoUrl,
  reviewed,
}: Props) => {
  const { push } = useRouter();
  return (
    <div
      className="w-full bg-white rounded-xl shadow-xl cursor-pointer transition-all ease-in-out duration-300 hover:scale-105 scale-100 flex flex-col gap-8"
      onClick={() =>
        type !== "ADMIN" &&
        assignmentId &&
        studentId &&
        push(
          `/panel/${type?.toLowerCase()}/assignment/${assignmentId}/${studentId}`
        )
      }
    >
      <div
        className="h-24 w-full relative rounded-t-xl"
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
                `https://avatars.dicebear.com/api/avataaars/${name}.svg`
              }
              sx={{
                height: "5rem",
                width: "5rem",
              }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center text-center p-4">
        <h3 className="font-medium tracking-wide text-lg">{name}</h3>
        <small className="text-gray-400 font-medium tracking-wide">
          {email}
        </small>
        <div className="flex flex-col gap-1 items-center text-center pt-3">
          <h6 className="font-medium tracking-wide text-sm">
            Roll No. : <span className="text-theme">{rollNo}</span>
          </h6>
          <h6 className="font-medium tracking-wide text-sm ">
            Mark Secured -{" "}
            {totalAttempted ? `${markSecured}/${fullMark}` : "Unavailable"}
          </h6>
          <h6 className="font-medium tracking-wide text-sm ">
            Total Attempted - {totalAttempted}
          </h6>
          <h6 className="font-medium tracking-wide text-sm ">
            {answerSubmitted
              ? `Submission Date - ${dayjs(submissionDate).format("LLL")}`
              : "Not Submitted"}
          </h6>
          <h6 className="font-medium tracking-wide text-sm bg-theme text-white px-4 py-1 rounded-md shadow-lg ">
            {reviewed ? `Reviewed` : "Not Reviewed"}
          </h6>
        </div>
      </div>
    </div>
  );
};

export default StudentCard;
