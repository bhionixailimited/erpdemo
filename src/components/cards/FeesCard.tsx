import {
  BorderClear,
  CreditScore,
  CurrencyRupee,
  Delete,
  DesignServices,
  Email,
  Flag,
  Group,
  Home,
  Money,
  Phone,
  Receipt,
  Timelapse,
  Visibility,
} from "@mui/icons-material";
import { Avatar, IconButton, Tooltip } from "@mui/material";
import { Button } from "components/core";
import { useFetch } from "hooks";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { MoneyFormat, notify } from "utils";

type Props = {
  _id?: { fee: string; batch: string; startDate: string; endDate: string };
  countryCode?: string;
  money?: number;
  name?: string;
  feeType?: string;
  phoneNumber?: string;
  joinDate?: React.ReactNode;
  role?: string;
  photoUrl?: string;
  onEditClick?: () => void;
  city?: string;
  mutate?: () => void;
  totalStudent?: number;
  totalAmount?: number;
  priceBeforeDiscount?: number;
};

const FeesCard = ({
  countryCode,
  money,
  joinDate,
  name,
  phoneNumber,
  role,
  photoUrl,
  onEditClick,
  city,
  mutate,
  feeType,
  _id,
  totalStudent,
  totalAmount,
  priceBeforeDiscount,
}: Props) => {
  const { mutate: department } = useFetch();
  const { push } = useRouter();
  const { mutate: staffDelete } = useFetch();
  const handleDelete = async (id?: {
    fee: string;
    batch: string;
    startDate: string;
  }) => {
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
            const response = await department({
              path: `student-fee/delete/${id?.fee}/${id?.batch}/${id?.startDate}`,
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
  const x = Math.floor(Math.random() * (20000 - 3000 + 1)) + 3000;
  // const y = 5000;
  return (
    <div className="w-full bg-white shadow-xl rounded-xl flex flex-col overflow-hidden ">
      <div className="bg-theme flex gap-4 p-4 items-center ">
        <div
          className="w-fit"
          //   onClick={() => push(`/panel/admin/staff/${_id}`)}
        >
          <Avatar
            src={`${photoUrl}`}
            sx={{
              height: "5rem",
              width: "5rem",
            }}
            className="!bg-gray-50/10 border"
          >
            {/* {name?.[0]} */}
            <Money />
          </Avatar>
        </div>

        <div className="flex flex-col gap-2 items-start">
          <div className="flex break-all">
            <h3 className="font-semibold text-white tracking-wide text-2xl break-all">
              {name}
            </h3>{" "}
          </div>
          <small className="tracking-wide text-gray-200 lowercase text-md first-letter:uppercase break-all">
            {role}
          </small>
        </div>
        {/* <div>
            <IconButton onClick={() => handleDelete(`${_id}`)}>
              <Tooltip title="Delete Staff">
                <Delete className="text-red-500 text-2xl" />
              </Tooltip>
            </IconButton>
          </div> */}
      </div>
      <div className="flex flex-col gap-2 p-4 text-gray-600 ">
        <span className="flex items-center gap-4 font-medium break-all">
          <Money />
          <small className="tracking-wide text-lg text-theme font-semibold">
            {MoneyFormat(money || 0)}{" "}
            <span
              className={`line-through text-gray-400 ${
                priceBeforeDiscount && priceBeforeDiscount > (money ?? 0)
                  ? "visible"
                  : "hidden"
              }`}
            >
              {" "}
              {priceBeforeDiscount && MoneyFormat(priceBeforeDiscount)}
            </span>
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <BorderClear />
          <small className="tracking-wide text-md text-theme font-semibold">
            {feeType}
          </small>
        </span>
        <span className="flex items-center gap-4 font-medium ">
          <Timelapse />
          <small className="tracking-wide break-all  text-md text-theme font-semibold">
            {joinDate}
          </small>
        </span>
        <Tooltip title="Total Student Given" placement="top">
          <span className="flex items-center gap-4 font-medium ">
            <Group />
            <small className="tracking-wide break-all text-md text-theme font-semibold">
              {city} / {totalStudent}
            </small>
          </span>
        </Tooltip>
        <Tooltip title="Total Amount Received" placement="top">
          <span className="flex items-center gap-4 font-medium ">
            <CreditScore />
            <small className="tracking-wide break-all text-md text-theme font-semibold">
              {MoneyFormat(Number(totalAmount) || 0)}
            </small>
          </span>
        </Tooltip>
      </div>
      <div className="flex items-center gap-4 flex-wrap justify-center pb-4 ">
        <Button
          startIcon={<Visibility />}
          className="!text-white !bg-green-500 hover:!ring-green-500 "
          onClick={() =>
            push(
              `/panel/admin/fees/${`${_id?.fee}_${_id?.startDate}_${_id?.endDate}`}`
            )
          }
        >
          View
        </Button>
        {/* <Button
          startIcon={<DesignServices />}
          className="!text-white !bg-blue-500 hover:!ring-blue-500 "
          onClick={onEditClick}
        >
          Edit
        </Button> */}
        <Button
          startIcon={<Delete />}
          className="!text-white !bg-red-500 hover:!ring-red-500 "
          onClick={() => handleDelete(_id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default FeesCard;
