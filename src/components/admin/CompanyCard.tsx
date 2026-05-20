import { Delete, Group } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { KeyedMutator } from "swr";
import { notify } from "utils";
import { CompanyViewDialog } from "./dialog";
import EditCompanyDrawer from "./EditCompanyDrawer";
import { useRouter } from "next/router";
import { PlacementCellCompanyBg } from "assets/backgrounds";
import { companyIcon } from "assets/static-icon";
type Props = {
  _id: string;
  name: string;
  phoneNumber: string;
  industry: string;
  branch: string;
  address: string;
  description: string;
  // companyRepresentative: string;
  iconUrl: string;
  //   instituteId: string;
  //   editDepartment: () => void;
  mutate?: KeyedMutator<any>;
};
export default function CompanyCard({
  _id,
  name,
  phoneNumber,
  industry,
  branch,
  address,
  description,
  iconUrl,
  // companyRepresentative,
  //   instituteId,
  mutate,
}: Props) {
  // console.log("companyRepresentative-->", companyRepresentative);
  const { mutate: company } = useFetch();
  const { push } = useRouter();
  const handleDelete = async (id: string) => {
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
            const response = await company({
              path: `placement/company/${id}`,
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
    <div
      style={{
        backgroundImage: `url('${PlacementCellCompanyBg.src}')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "100%",
        width: "100%",
        // borderRadius: "12px",
      }}
      className="w-full cursor-pointer scale-100 hover:scale-105 duration-300 ease-in-out relative group  overflow-hidden  col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-4 shadow-md  bg-white rounded-xl "
    >
      <div className={`flex flex-row gap-7 p-3 2xl:p-4  `}>
        <div className="flex justify-center items-center">
          <Avatar
            src={iconUrl || `${companyIcon.src}`}
            variant="rounded"
            sx={{
              mt: 0,
              height: 70,
              width: 70,
            }}
          >
            {name?.[0]}
          </Avatar>
        </div>
        <div className="flex flex-col gap-[2px]">
          <h2 className="text-xl font-semibold mt-2">Name : {name}</h2>
          <p className="text-gray-600 mt-1 font-medium">
            Phone : {phoneNumber}
          </p>
          <p className="text-gray-600 font-medium">Industry : {industry}</p>
          <p className="text-gray-600 font-medium">Branch : {branch}</p>
          <p className="text-gray-600 font-medium truncate  w-full ">
            Address :{" "}
            {address.length > 15 ? address.slice(0, 15) + "..." : address}
          </p>
          <p className="text-gray-600 font-semibold truncate  w-full ">
            Description :{" "}
            {description.length > 15
              ? description.slice(0, 15) + "..."
              : description}
          </p>
          {/* <p className="text-gray-600 font-medium truncate  w-full ">
            Resprentative :{" "}
            {companyRepresentative.length > 15
              ? companyRepresentative.slice(0, 15) + "..."
              : companyRepresentative}
          </p> */}
        </div>
      </div>
      <div className="absolute top-0 left-full duration-300 transition-all ease-in-out group-hover:left-0 h-full w-full bg-transparent backdrop-blur-[2px] z-30 rounded-md flex justify-end  overflow-hidden">
        <div className="w-fit flex h-full flex-col">
          <EditCompanyDrawer feeName={"Edit"} open={_id} Dmutate={mutate} />
          <CompanyViewDialog companyInfo={_id} />
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-green-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => push(`company/${_id}`)}
          >
            <Tooltip title="View Students">
              <Group />
            </Tooltip>
          </span>
          <span
            className="bg-gradient-to-r from-transparent cursor-pointer to-red-500  text-white px-8 h-full  flex items-center justify-center rounded-bl-lg  "
            onClick={() => handleDelete(_id)}
          >
            <Tooltip title="Delete Company">
              <Delete />
            </Tooltip>
          </span>
        </div>
      </div>
    </div>
  );
}
