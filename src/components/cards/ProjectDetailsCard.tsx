import { Delete, Edit, Info, Visibility, Close } from "@mui/icons-material";
import { Avatar, Checkbox, IconButton } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { FileIcon } from "assets/static-icon";
import { UpdateProjectDetailsDialog } from "components/admin/dialog";
import { CustomDialog } from "components/core";
import dayjs from "dayjs";
import { useFetch, useSWRFetch } from "hooks";
import { useRouter } from "next/router";
import { useState } from "react";
import Swal from "sweetalert2";
import { notify } from "utils";

type Props = {
  key: number;
  title: string;
  submittedTo: string;
  submittedUnder: string;
  submittedBy: string;
  date: Date;
  totalCostOfProject: number;
  description: string;
  status: string;
  sanctionDate?: Date;
  documentPath?: string;
  documentUrl?: string;
  projectId?: string;
  sanctionAmount?: number;
  mutate?: () => void;
  checked?: boolean;
  onChange?: () => void;
};

const ProjectDetailsCard = ({
  key,
  title,
  submittedTo,
  submittedUnder,
  submittedBy,
  status,
  date,
  totalCostOfProject,
  description,
  sanctionDate,
  sanctionAmount,
  documentPath,
  projectId,
  documentUrl,
  mutate,
  checked,
  onChange,
}: Props) => {
  const { mutate: vehicleDelete } = useFetch();
  const { push } = useRouter();
  const [isUpdate, setIsUpdate] = useState(false);
  const [isOpenInfo, setIsOpenInfo] = useState(false);

  const handleDeleteProject = () => {
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
            const response = await vehicleDelete({
              path: `project-details/${projectId}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
          });
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <UpdateProjectDetailsDialog
        open={isUpdate}
        handleClose={() => {
          setIsUpdate(false);
        }}
        projectId={projectId}
        mainMutate={mutate}
      />
      <ProjectDetailsInfo
        projectId={projectId}
        open={isOpenInfo}
        handleClose={() => {
          setIsOpenInfo(false);
        }}
      />
      <div
        key={key}
        className="relative w-full rounded-xl flex flex-col gap-2 space-y-4  tracking-wide shadow-xl"
      >
        <div className="relative">
          <div className="absolute right-0 rounded-tl-lg top-24 bg-gradient-to-r from-rose-100 to-teal-100 p-2">
            <div className="flex">
              {documentUrl ? (
                <Tooltip title="View Document">
                  <Avatar
                    variant="rounded"
                    className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-slate-400-500 !p-0"
                    sx={{
                      mr: ".1vw",
                      padding: "0px !important",
                      backgroundColor: "Highlight",
                      cursor: "pointer",
                      color: "",
                      width: 30,
                      height: 30,
                    }}
                    onClick={() => window.open(documentUrl)}
                  >
                    <Visibility
                      sx={{ padding: "0px !important" }}
                      fontSize="small"
                    />
                  </Avatar>
                </Tooltip>
              ) : null}
              <Tooltip title="Update Details">
                <Avatar
                  variant="rounded"
                  className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-yellow-500 !p-0"
                  sx={{
                    mr: ".1vw",
                    padding: "0px !important",
                    backgroundColor: "Highlight",
                    cursor: "pointer",
                    color: "",
                    width: 30,
                    height: 30,
                  }}
                  onClick={() => setIsUpdate(true)}
                >
                  <Edit sx={{ padding: "0px !important" }} fontSize="small" />
                </Avatar>
              </Tooltip>
              <Tooltip title="Info Details">
                <Avatar
                  variant="rounded"
                  className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-theme !p-0"
                  sx={{
                    mr: ".1vw",
                    padding: "0px !important",
                    backgroundColor: "Highlight",
                    cursor: "pointer",
                    color: "",
                    width: 30,
                    height: 30,
                  }}
                  onClick={() => setIsOpenInfo(true)}
                >
                  <Info sx={{ padding: "0px !important" }} fontSize="small" />
                </Avatar>
              </Tooltip>
              <Tooltip title="Delete">
                <Avatar
                  variant="rounded"
                  className="!mr-0.5 !ml-0.5 !cursor-pointer !bg-red-500 !p-0"
                  sx={{
                    mr: "0.1vw",
                    padding: "0px !important",
                    backgroundColor: "Highlight",
                    cursor: "pointer",
                    color: "",
                    width: 30,
                    height: 30,
                  }}
                  onClick={handleDeleteProject}
                >
                  <Delete sx={{ padding: "0px !important" }} fontSize="small" />
                </Avatar>
              </Tooltip>
            </div>
          </div>
          <div className="flex justify-center bg-gradient-to-bl from-indigo-900 via-indigo-400 to-indigo-900 py-3 rounded-t-lg w-full border">
            {documentUrl ? (
              <div className="h-24 w-24  flex justify-center items-center text-3xl">
                <div className="relative h-full w-full flex justify-center items-center group">
                  <img
                    className="h-full w-full object-cover"
                    src={FileIcon.src}
                    alt="Image"
                  />
                </div>
              </div>
            ) : (
              <div className="h-24 flex justify-center items-center">
                <span className=" text-xl font-semibold text-white">
                  No Document
                </span>
              </div>
            )}
          </div>
          <div className="absolute top-2 right-2 ">
            <Tooltip title="Check to export">
              <Checkbox
                className="!text-orange-600"
                size="small"
                color="warning" // Change the checkbox color to white
                checked={checked}
                onChange={onChange}
              />
            </Tooltip>
          </div>
          <div className="px-4 py-5  ">
            <div className="flex flex-col  justify-start">
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">Name :</p>
                <p className="text-sm md:text-base text-red-600 font-semibold">
                  {title}
                </p>
              </div>
              {/* <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Submitted To :
                </p>

                <p className="text-sm md:text-base text-gray-700 font-semibold">
                  {submittedTo || "---"}
                </p>
              </div> */}
              {/* <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Submitted Under :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {submittedUnder || "---"}
                </p>
              </div> */}
              {/* <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Submitted By :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {submittedBy || "---"}
                </p>
              </div> */}

              {/* <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Project Status :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {status || "---"}
                </p>
              </div> */}
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Total Project Cost :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {totalCostOfProject || "---"}
                </p>
              </div>

              {/* <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">Date :</p>
                <p className="text-sm md:text-base text-gray-700">
                  {date ? dayjs(date).format("DD/MM/YYYY") : "---"}
                </p>
              </div> */}
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Description :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {description || "---"}
                </p>
              </div>
              {/* <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Sanction Date :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {sanctionDate
                    ? dayjs(sanctionDate).format("DD/MM/YYYY")
                    : "---"}
                </p>
              </div> */}
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Sanction Amount :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {sanctionAmount || "---"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetailsCard;

const ProjectDetailsInfo = ({
  projectId,
  open,
  handleClose,
}: {
  projectId?: string;
  open?: boolean;
  handleClose: () => void;
}) => {
  const { data, isValidating, mutate } = useSWRFetch<any>(
    `project-details/${projectId}`
  );
  // console.log("data-->", data);
  return (
    <>
      <CustomDialog open={open} onClose={handleClose} maxWidth="xs">
        <div className="w-full">
          <div className="w-full flex justify-between items-center border-b-2">
            <p></p>
            <h3 className="font-semibold tracking-wide p-4  text-theme text-2xl text-center">
              Details
            </h3>
            <IconButton size="small" onClick={handleClose}>
              <Close fontSize="small" className="!text-youtube" />
            </IconButton>
          </div>

          <div className="px-4 py-5 bg-gradient-to-r from-rose-100 to-teal-100 ">
            <div className="grid grid-cols-2 gap-2 ">
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">Name :</p>
                <p className="text-sm md:text-base text-gray-700 ">
                  {data?.data?.title}
                </p>
              </div>

              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Submitted To :
                </p>

                <p className="text-sm md:text-base text-gray-700 ">
                  {data?.data?.submittedTo || "---"}
                </p>
              </div>
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Submitted Under :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.submittedUnder || "---"}
                </p>
              </div>
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Submitted By :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.submittedBy || "---"}
                </p>
              </div>

              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Project Status :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.status || "---"}
                </p>
              </div>
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Total Project Cost :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.totalCostOfProject || "---"}
                </p>
              </div>

              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">Date :</p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.date
                    ? dayjs(data?.data?.date).format("DD/MM/YYYY")
                    : "---"}
                </p>
              </div>
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Description :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.description || "---"}
                </p>
              </div>
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Sanction Date :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.sanctionDate
                    ? dayjs(data?.data?.sanctionDate).format("DD/MM/YYYY")
                    : "---"}
                </p>
              </div>
              <div className=" gap-2 py-2 md:py-0">
                <p className="font-semibold text-base text-blue-600">
                  Sanction Amount :
                </p>
                <p className="text-sm md:text-base text-gray-700">
                  {data?.data?.sanctionAmount || "---"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
    </>
  );
};
