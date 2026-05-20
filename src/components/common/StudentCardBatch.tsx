import {
  AccessTime,
  AccountBalance,
  Delete,
  Edit,
  Email,
  HistoryEdu,
  MilitaryTech,
  Phone,
  School,
  Transgender,
  Visibility,
} from "@mui/icons-material";
import {
  Avatar,
  Checkbox,
  Dialog,
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Tooltip,
} from "@mui/material";
import { Button, CustomProgress } from "components/core";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import UserType from "types/user";
import { useState } from "react";
import Swal from "sweetalert2";
import { useFetch } from "hooks";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import { ICONS } from "assets";
import { useSWRFetch } from "hooks";
import {
  DemoteStudentDialog,
  PromoteStudentDialog,
} from "components/admin/dialog";

interface Props {
  data: any;
  onClick?: () => void;
  studentDrawer?: any;
  type?: "ALUMNI" | "STUDENT";
  mutate?: KeyedMutator<any>;
  noDrawer?: boolean;
  checked?: boolean;
  onChange?: () => void;
}

const StudentCardBatch = ({
  data,
  onClick,
  studentDrawer,
  type,
  mutate,
  noDrawer,
  checked,
  onChange,
}: Props) => {
  const [examId, setExamId] = useState<any>("");
  const [openDialog, setOpenDialog] = useState(false);
  const [openDemoteDialog, setOpenDemoteDialog] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");
  const [selectedStudent, setSelectedStudent] = useState("");

  const router = useRouter();
  const { mutate: exam } = useFetch();
  const { batchId } = useRouter().query;
  // const {
  //   data: data,
  //   isValidating,
  //   mutate: batchMutate,
  // } = useSWRFetch<any>(
  //   batchId && `batch/${batchId}/students?studentId=${data?.user?._id}`
  // );

  const handleDeleteStudent = (id: string) => {
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
            const response = await exam({
              path: `user/${id}`,
              method: "DELETE",
            });
            if (response?.data?.error) {
              notify.error(response?.data?.error);
              reject(response?.data?.error);
            }
            mutate && mutate();
            notify.success(response?.data?.message);
            resolve(response?.data?.message);
            setExamId("");
          });
        setExamId("");
      });
      setExamId("");
    } catch (err) {
      console.log(err);
    } finally {
      setExamId("");
    }
  };
  const handleClick = async (status: string, studentId: string) => {
    try {
      const response = await exam({
        path: `student/academic/${studentId}`,
        method: "POST",
        body: JSON.stringify(
          status == "DEMOTED"
            ? {
                promotedClass: selectedSection,
                promoteStatus: status,
              }
            : {
                promotedClass: selectedSection,
              }
        ),
      });

      mutate?.();

      setOpenDialog(false);
      setOpenDemoteDialog(false);
      if (response?.status !== 200) throw new Error(response?.data?.message);

      notify.success("Student updated successfully");
    } catch (error) {
      notify.error(
        error instanceof Error ? error?.message : "Something went wrong!"
      );
    } finally {
      setOpenDialog(false);
      setSelectedStudent("");
      setSelectedSection("");
    }
  };
  return (
    <>
      <div
        className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 rounded-xl shadow-xl ease-in-out relative group  overflow-hidden "
        onClick={onClick}
      >
        {/* dilog start */}
        <Dialog
          open={openDemoteDialog}
          maxWidth="xs"
          onClose={() => setOpenDemoteDialog(false)}
          fullWidth
        >
          <div className="w-full flex items-center justify-center flex-col gap-4 p-4 ">
            <h3 className="font-medium tracking-wide text-base">
              Demote Student
            </h3>
            <Select
              fullWidth
              value={selectedSection}
              onChange={(e: SelectChangeEvent<string>) =>
                setSelectedSection(e?.target?.value)
              }
            >
              {data?.batchDetails?.batchSection?.map(
                (item: string, index: number) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                )
              )}
              {!data?.batchDetails?.batchSection?.length && (
                <MenuItem>No Section To Promote</MenuItem>
              )}
            </Select>
            <Button onClick={() => handleClick("DEMOTED", data?.user?._id)}>
              Confirm
            </Button>
          </div>
        </Dialog>
        <Dialog
          open={openDialog}
          maxWidth="xs"
          onClose={() => setOpenDialog(false)}
          fullWidth
        >
          <div className="w-full flex items-center justify-center flex-col gap-4 p-4 ">
            <h3 className="font-medium tracking-wide text-base">
              Promote Student
            </h3>
            <Select
              fullWidth
              value={selectedSection}
              onChange={(e: SelectChangeEvent<string>) =>
                setSelectedSection(e?.target?.value)
              }
            >
              {data?.batchDetails?.batchSection?.map(
                (item: string, index: number) => (
                  <MenuItem value={item} key={index}>
                    {item}
                  </MenuItem>
                )
              )}
              {!data?.batchDetails?.batchSection?.length && (
                <MenuItem>No Section To Promote</MenuItem>
              )}
            </Select>
            <Button onClick={() => handleClick("PROMOTED", data?.user?._id)}>
              Confirm
            </Button>
          </div>
        </Dialog>
        {/* dilog end */}
        <div className="relative bg-white  py-6 px-6  w-full  ">
          <div className="flex items-center flex-col md:flex-row gap-4 justify-between w-full">
            <div className=" text-white flex items-center w-fit rounded-full  shadow-xl bg-theme left-4 ">
              <Avatar
                className="object-cover "
                src={data?.photoUrl || data?.user?.photoUrl}
                sx={{
                  height: "4rem",
                  width: "4rem ",
                  objectFit: "cover",
                }}
              ></Avatar>
            </div>
            <span className="w-fit">
              <p className="bg-themeSecondary/10 w-fit px-2 py-1.5 tracking-tight text-xs font-semibold text-theme rounded-full flex items-center gap-1">
                <AccessTime fontSize="small" />
                {data?.createdAt
                  ? `Joined on ${dayjs(data?.createdAt).format("DD MMM YYYY")}`
                  : "Not Provided"}
              </p>
            </span>
          </div>
          <div className="mt-4">
            <p className="text-xl font-semibold my-2">
              {data?.displayName ||
                (data?.user?.displayName && data?.user?.displayName)}
            </p>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1 ">
              <Email />
              <p>
                {data?.email ||
                  (data?.user?.email && data?.user?.email) ||
                  "Not Provided"}
              </p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1 ">
              <Phone />
              <p>
                {data?.phoneNumber ||
                  (data?.user?.phoneNumber && data?.user?.phoneNumber) ||
                  "Not Provided"}
              </p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1">
              <Transgender />
              <p>
                {data?.gender ||
                  (data?.user?.gender && data?.user?.gender) ||
                  "Not Provided"}
              </p>
            </div>
            <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1">
              <MilitaryTech />
              <p>
                {data?.promoteStatus ||
                  (data?.promoteStatus && data?.promoteStatus) ||
                  "Not Provided"}
              </p>
            </div>
            {/* <div className="flex space-x-2 text-gray-400 text-xs items-center mb-1">
              <HistoryEdu />
              <p>
                {(data?.isCurrentStudent ? "STUDENT" : "EX-STUDENT") ||
                  "Not Provided"}
              </p>
            </div> */}
            {!data?.user && (
              <div className="flex space-x-2 text-gray-400 text-xs items-center  mb-3">
                <School />
                {/* <p>BTech 3rd year</p> */}
                <p>
                  {data?.batch?.course?.title && data?.batch?.branch?.title
                    ? `${data?.batch?.course?.title} ${data?.batch?.branch?.title} `
                    : "Not Provided"}
                </p>
              </div>
            )}
            {type === "ALUMNI" ? (
              <div className="flex space-x-2 text-gray-400 text-xs items-center  mb-3">
                <AccountBalance />
                {/* <p>Pass out year 2022 </p> */}
              </div>
            ) : (
              <div className="flex flex-col gap-2 w-full">
                {/* <div className="flex justify-between w-full">
                    <p className="text-sm text-theme font-semibold">
                      Fees Payment
                    </p>
                    <p className="text-sm text-theme font-semibold">
                      {data.progress} %
                    </p>
                  </div>
                  <CustomProgress ProgressValue={data.progress} /> */}
              </div>
            )}
          </div>
          {!noDrawer && (
            <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
              <div className="w-fit flex h-full flex-col">
                <span
                  className="bg-gradient-to-r from-transparent cursor-pointer to-slate-400 text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
                  onClick={() => {
                    if (type === "ALUMNI") {
                      router.push(
                        `/panel/admin/alumni/${
                          data?.user ? data?.user?._id : data?._id
                        }`
                      );
                    } else {
                      router.push(
                        `/panel/admin/student/${
                          data?.user ? data?.user?._id : data?._id
                        }`
                      );
                    }
                  }}
                >
                  <Tooltip title="View Student Details">
                    <Visibility />
                  </Tooltip>
                </span>{" "}
                {type !== "ALUMNI" && (
                  <span
                    className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
                    onClick={studentDrawer}
                  >
                    <Edit />
                  </span>
                )}
                <span
                  className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
                  onClick={() => {
                    handleDeleteStudent(
                      data?.user ? data?.user?._id : data?._id
                    );
                    setExamId(data?.user ? data?.user?._id : data?._id);
                  }}
                >
                  <Tooltip title={"Delete Student"}>
                    {examId === (data?.user ? data?.user?._id : data?._id) ? (
                      <ICONS.Loading className="animate-spin text-white h-6 w-6" />
                    ) : (
                      <Delete />
                    )}
                  </Tooltip>
                </span>
              </div>
            </div>
          )}

          <div className="flex w-full flex-row-reverse">
            {/* <Button
              onClick={() => handleClick("DEMOTED", data?.user?._id)}
              className=" bg-red-500"
            >
              Demote
            </Button>
            <Button className="mr-5 " onClick={() => setOpenDialog(true)}>
              Promote
            </Button> */}
            <Button className="shadow-none text-xs md:text-base whitespace-nowrap !py-0 ml-2 !min-w-fit !px-0">
              <Tooltip title="Check to export">
                <Checkbox
                  sx={{ "& .MuiSvgIcon-root": { fontSize: 21 } }}
                  className="!text-white"
                  checked={checked}
                  onChange={onChange}
                />
              </Tooltip>
            </Button>

            {/* <span className=" rounded-md ml-2 bg-theme flex justify-end border-2">
              <Tooltip title="Check to export">
                <Checkbox
                  // sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
                  className="!text-white"
                  checked={checked}
                  onChange={onChange}
                />
              </Tooltip>
            </span> */}

            {data?.isCurrentStudent ? (
              <>
                {" "}
                <DemoteStudentDialog
                  mutate={mutate}
                  type="BATCH"
                  _id={data?.user?._id}
                />
                <PromoteStudentDialog
                  mutate={mutate}
                  type="BATCH"
                  _id={data?.user?._id}
                />{" "}
              </>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default StudentCardBatch;
