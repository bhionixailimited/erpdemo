import { Delete, DesignServices } from "@mui/icons-material";
import { Avatar, IconButton, Tooltip, Checkbox } from "@mui/material";
import { UpdateResourcePersonDialog } from "components/admin/dialog";
import UpdateMarketingResource from "components/admin/dialog/UpdateMarketingResource";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  nameOfResourcePerson: string;
  designation: string;
  nameOfOrganization?: string;
  subjectExport?: string;
  exportEmailId?: string;
  mobileNo?: string;
  profile?: string;
  photoPath: string;
  photoUrl: string;
  key: number;
  resourcePersonId: string;
  mainMutate?: () => void;
  checked?: boolean;
  onChange?: () => void;
  marketingResourcePerson?: boolean;
};

const ResourcePersonCard = ({
  designation,
  exportEmailId,
  mobileNo,
  nameOfOrganization,
  nameOfResourcePerson,
  photoPath,
  photoUrl,
  profile,
  subjectExport,
  resourcePersonId,
  key,
  mainMutate,
  checked,
  onChange,
  marketingResourcePerson,
}: Props) => {
  const { push } = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const { mutate: staffDelete } = useFetch();
  const handleDelete = (id: string) => {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You will not be able to recover it again!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then(async (result) => {
        if (result.isConfirmed)
          new Promise(async (resolve, reject) => {
            const response = await staffDelete({
              path: marketingResourcePerson
                ? `marketing-person-resource/${id}`
                : `person-resource/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mainMutate && mainMutate();

            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div
      key={key}
      className="w-full bg-white shadow-xl rounded-xl flex flex-col overflow-hidden "
    >
      {marketingResourcePerson ? (
        <UpdateMarketingResource
          open={isUpdate}
          handleClose={() => {
            setIsUpdate(false);
          }}
          resourcePersonId={resourcePersonId}
          mainMutate={mainMutate}
        />
      ) : (
        <UpdateResourcePersonDialog
          open={isUpdate}
          handleClose={() => {
            setIsUpdate(false);
          }}
          resourcePersonId={resourcePersonId}
          mainMutate={mainMutate}
        />
      )}

      <div className="bg-theme flex gap-4 p-4 items-center ">
        <div
          className="w-fit"
          // onClick={() => push(`/panel/admin/staff/${resourcePersonId}`)}
        >
          <Avatar
            src={`${photoUrl}`}
            sx={{
              height: "5rem",
              width: "5rem",
            }}
            className="!bg-gray-50/10 border"
          >
            {name?.[0]}
          </Avatar>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <div className="flex break-all">
            <h3 className="font-semibold text-white tracking-wide text-xl break-all">
              {nameOfResourcePerson}
            </h3>{" "}
          </div>
          <small className="tracking-wide text-gray-200 lowercase first-letter:uppercase break-all">
            {designation}
          </small>
        </div>
        <div className="flex items-end">
          <div>
            <Checkbox
              checked={checked}
              onChange={onChange}
              className="!text-white"
              sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 p-4 text-gray-600 ">
        <span className="flex items-center gap-4 font-medium break-all">
          <small className="tracking-wide ">
            <span className="text-black font-semibold"> Email Id: </span>
            {exportEmailId}
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <small className="tracking-wide ">
            <span className="text-black font-semibold">Mobile No: </span>
            {mobileNo}
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <small className="tracking-wide break-all">
            <span className="text-black font-semibold">
              Name Of Organization:{" "}
            </span>{" "}
            {nameOfOrganization}
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <small className="tracking-wide break-all">
            <span className="text-black font-semibold">Profile:</span> {profile}
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <small className="tracking-wide break-all">
            <span className="text-black font-semibold">Subject Expert: </span>
            {subjectExport}
          </small>
        </span>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-center pb-4 ">
        <Tooltip title="Edit User">
          <IconButton
            onClick={() => setIsUpdate(true)}
            className="!text-4xl !text-blue-500"
          >
            <DesignServices />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete User">
          <IconButton
            onClick={() => handleDelete(`${resourcePersonId}`)}
            className="!text-4xl !text-red-500"
          >
            <Delete />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  );
};

export default ResourcePersonCard;
