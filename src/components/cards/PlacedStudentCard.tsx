import { Avatar } from "@mui/material";

const PlacedStudentCard = ({
  studentName,
  companyName,
  batch,
  photoUrl,
  position,
}: any) => {
  return (
    <div className="w-full bg-white shadow-xl rounded-lg p-4 scale-100 hover:scale-95 duration-300 ease-in-out transition-all cursor-pointer select-none ">
      <div className="w-full flex gap-4 items-start">
        <div className="flex items-center justify-center w-fit">
          <Avatar
            src={photoUrl}
            sx={{
              height: "5rem",
              width: "5rem",
              borderRadius: "5px",
            }}
            className="!bg-gray-100 !shadow-lg"
          >
            {studentName?.[0]}
          </Avatar>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="font-semibold tracking-wide text-xl break-words break-all">
            {studentName}
          </h3>
          <small className="tracking-wide bg-theme px-2 py-1 text-white rounded-md !shadow-lg break-words break-all">
            Placed At {`${companyName} (${position})`}
          </small>
          <small className="tracking-wide text-gray-500 break-words break-all">
            {batch
              ? `${batch?.course?.title} ${batch?.branch?.title}(${batch?.session?.title})`
              : ""}
          </small>
        </div>
      </div>
    </div>
  );
};

export default PlacedStudentCard;
