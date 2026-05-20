import { Delete, DesignServices } from "@mui/icons-material";
import { Avatar } from "@mui/material";
import { AssignmentIconNew } from "assets/static-icon";

const ExamCards = ({
  onViewClick,
  onEditClick,
  editBtn = true,
  deleteBtn = true,
}: any) => {
  return (
    <div className="w-full shadow-lg border-b-8 border-t-8 border-theme bg-white p-4  gap-4 items-center rounded-xl ">
      <div className="flex items-center gap-4 w-full ">
        <Avatar
          src={AssignmentIconNew.src}
          className="!p-4 !h-20 !bg-theme/10 !border  !border-theme !w-20 "
        />
        <div className="flex flex-col">
          <h3 className="font-semibold tracking-wide text-base">
            Physics Exam
          </h3>
          <small className="tracking-wide text-gray-500 font-medium">
            Scheduled 12-05-2023
          </small>
          <small className="tracking-wide text-gray-500 font-medium">
            Time 10:00 AM
          </small>
        </div>
      </div>
      <div className="flex flex-col py-4 gap-1">
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Batch -</h3>
          <small className="tracking-wide text-theme font-medium">
            BTech Civil 2022-2026
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">HOD -</h3>
          <small className="tracking-wide text-theme font-medium">
            A.K Sahoo
          </small>
        </span>
        <span className="flex items-center gap-4">
          <h3 className="font-medium text-sm tracking-wide">Type -</h3>
          <small className="tracking-wide text-theme font-semibold px-2 py-1 rounded-md ">
            Offline
          </small>
        </span>
      </div>
      <div className="flex items-center justify-between gap-4">
        <button className="btn-primary" onClick={onViewClick}>
          View
        </button>
        <div className="flex gap-2 md:gap-4 items-center">
          {editBtn && (
            <button
              className="bg-blue-500 border hover:bg-transparent hover:text-blue-500 transition-all ease-in-out duration-300 !border-blue-500 text-white !px-4 !py-2 !rounded-md !shadow-lg"
              onClick={onEditClick}
            >
              <DesignServices />
            </button>
          )}

          {deleteBtn && (
            <button className="bg-red-500 border hover:bg-transparent hover:text-red-500 transition-all ease-in-out duration-300 !border-red-500 text-white !px-4 !py-2 !rounded-md !shadow-lg">
              <Delete />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamCards;
