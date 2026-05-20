import {
  AcUnit,
  Delete,
  Edit,
  Email,
  PhoneTwoTone,
  School,
  Transgender,
} from "@mui/icons-material";
import { Avatar, Chip } from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import { AssignSuperAdminModuleDrawer } from "components/admin";
import dayjs from "dayjs";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { InstituteType } from "types/institute";
import { notify } from "utils";

type Props = {
  name?: string;
  phoneNumber?: string;
  gender?: string;
  dob?: string;
  caste?: string;
  _id?: string;
  role?: string;
  assigned?: boolean;
  // active?: boolean;
  licenseNo?: string;
  expiry?: Date;
  data?: any;
  mutate?: any;
  key?: string;
  photoUrl?: string;
  email?: string;
  countryCode?: string;
  institutes?: InstituteType[];
  joinedAt?: string;
};

const AdminCard = ({
  name,
  phoneNumber,
  licenseNo,
  expiry,
  assigned,
  data,
  mutate,
  key,
  photoUrl,
  email,
  countryCode,
  gender,
  dob,
  caste,
  _id,
  institutes,
  role,
  joinedAt,
}: Props) => {
  const { mutate: driver } = useFetch();
  const { push } = useRouter();
  const handleDeleteDriver = () => {
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
            const response = await driver({
              path: `user/${_id}`,
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
      <div
        className="2xl:col-span-3 xl:col-span-4 md:col-span-12 col-span-12 lg:col-span-6 bg-indigo-100 shadow-lg rounded-3xl md:p-5 py-5 px-2 relative group  overflow-hidden hover:scale-105 border  w-full "
        key={key}
      >
        <div className="flex flex-col items-center justify-center gap-5">
          <div className="w-fit ">
            <Avatar
              src={`${photoUrl}`}
              sx={{
                height: "6rem",
                width: "6rem",
              }}
              className="!bg-indigo-400 border"
            >
              {name?.[0]}
            </Avatar>
          </div>
          <div className=" flex flex-col  gap-1">
            <h3 className="text-theme text-lg font-semibold p-0.5 !break-all w-fit">
              {name}
            </h3>
            <h3>
              <small className="md:text-sm  text-xs text-theme font-medium tracking-wide flex items-center gap-2 ">
                <Email />
                {email}
              </small>
            </h3>
            <h3>
              <small className="md:text-sm  text-xs text-theme font-medium tracking-wide flex items-center gap-2 ">
                <PhoneTwoTone />
                {`+${countryCode}`} {phoneNumber}
              </small>
            </h3>
            <h3>
              <small className="md:text-sm  text-xs lowercase text-theme font-medium tracking-wide flex items-center gap-2 ">
                <Transgender />
                {gender || "Not Provided"}
              </small>
            </h3>
            <h3>
              <small className="md:text-sm  text-xs lowercase text-theme font-medium tracking-wide flex items-center gap-2 ">
                <AcUnit />
                Joined {dayjs(joinedAt).format("LL") || "Not Provided"}
              </small>
            </h3>
          </div>
        </div>
        <div className="mt-3 flex px-3">
          {institutes?.map((item) => (
            <Chip
              label={`${item?.instituteName}`}
              icon={<School />}
              key={item?._id}
              className="!text-theme !font-bold"
            />
          ))}
        </div>
        {/* <div className="flex gap-2 justify-center w-full mx-auto px-2 mt-4">
          <div>
            <p className="font-bold text-theme text-lg">Gender</p>
            <p className="font-semibold text-themeSecondary text-md">
              {gender || "Not Provided"}
            </p>
          </div>
          <div>
            <p className="font-bold text-theme text-lg">DOB</p>
            <p className="font-semibold text-themeSecondary text-md">
              {dob || "Not Provided"}
            </p>
          </div>
          <div>
            <p className="font-bold text-theme text-lg">Caste</p>
            <p className="font-semibold text-themeSecondary text-md">
              {caste || "Not Provided"}
            </p>
          </div>
        </div> */}
        <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
          <div className="w-fit flex h-full flex-col">
            {/* <EditDriverDrawer open={data} mutate={mutate} /> */}
            <span
              onClick={() => {
                role === "ADMIN" &&
                  push(`/panel/superadmin/admins/add?edit=true&editId=${_id}`);
                role === "MANAGER" &&
                  push(
                    `/panel/superadmin/managers/add?edit=true&editId=${_id}`
                  );
              }}
              className="bg-gradient-to-r from-transparent cursor-pointer text-white to-blue-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
            >
              <Tooltip title={role === "ADMIN" ? "Edit Admin" : "Edit Manager"}>
                <Edit />
              </Tooltip>
            </span>
            {role === "MANAGER" && <AssignSuperAdminModuleDrawer open={_id} />}
            <span
              className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
              onClick={handleDeleteDriver}
            >
              <Tooltip title="Delete this user">
                <Delete />
              </Tooltip>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminCard;
