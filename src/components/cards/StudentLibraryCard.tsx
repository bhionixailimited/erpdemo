import { Email, LocalPhone } from "@mui/icons-material";
import { Avatar, Divider } from "@mui/material";
import { useRouter } from "next/router";

type Props = {
  name: string;
  studentId: string;
  batch: string;
  email: string;
  phoneNumber: string;
  totalBookIssue: number;
  totalFine: string;
  returned: number;
  photoUrl: string;
  reg: string;
};

const StudentLibraryCard = ({
  reg,
  name,
  studentId,
  batch,
  email,
  phoneNumber,
  totalBookIssue,
  totalFine,
  returned,
  photoUrl,
}: Props) => {
  const { push } = useRouter();

  return (
    <div
      className="w-full bg-white shadow-xl rounded-lg p-4 scale-100 hover:scale-95 duration-300 ease-in-out transition-all cursor-pointer select-none "
      onClick={() => push(`/panel/admin/library/student/${studentId}`)}
    >
      <div className="w-full flex gap-4 items-start">
        <div className="flex items-center justify-center w-fit">
          <Avatar
            src={photoUrl}
            sx={{
              height: "5rem",
              width: "5rem",
            }}
            className="!bg-gray-400 !shadow-lg "
          >
            {name?.[0]}
          </Avatar>
        </div>

        <div className="flex flex-col gap-1 items-start">
          <h3 className="font-semibold tracking-wide text-xl">{name}</h3>
          <small className="tracking-wide text-gray-500">{reg}</small>
          {batch && (
            <small className="tracking-wide bg-theme px-2 py-1 text-white rounded-md !shadow-lg">
              {batch}
            </small>
          )}
        </div>
      </div>
      <Divider className="!my-4" />
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold tracking-wide text-base">
          Contact Info -
        </h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-4">
            <Email className="text-theme" />
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {email}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <LocalPhone className="text-theme" />
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {phoneNumber}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 mt-4">
        <h3 className="font-semibold tracking-wide text-base">Book Info -</h3>
        <div className="flex flex-col gap-1">
          <div className="flex items-start gap-4">
            <span className="tracking-wide text-sm font-medium text-theme">
              Total Book Issue -
            </span>
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {totalBookIssue}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="tracking-wide text-sm font-medium text-theme">
              Total Fine Pending -
            </span>
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {totalFine}
            </span>
          </div>
          <div className="flex items-start gap-4">
            <span className="tracking-wide text-sm font-medium text-theme">
              Total Returned Book -
            </span>
            <span className="tracking-wide text-sm font-medium text-gray-600">
              {returned}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentLibraryCard;
