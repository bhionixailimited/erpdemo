import { CurrencyRupee, Delete } from "@mui/icons-material";
import {
  Avatar,
  IconButton,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import dayjs from "dayjs";
import { useFetch } from "hooks";
import Swal from "sweetalert2";
import { MoneyFormat, notify } from "utils";

type Props = {
  amount: number;
  paymentName: string;
  key: any;
  createdAt?: string;
  mutate?: any;
  id?: string;
};
const IncomingFinance = ({
  amount,
  paymentName,
  key,
  mutate,
  createdAt,
  id,
}: Props) => {
  const { mutate: financeDelete } = useFetch();
  const handleDelete = (id: any) => {
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
            const response = await financeDelete({
              path: `finance/delete/${id}`,
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
    <ListItem
      key={key}
      className=" md:px-4  !mb-0 "
      secondaryAction={
        <div className="flex gap-2">
          <div className="font-semibold md:text-lg text-green-600">
            {`+ ${MoneyFormat(amount)}`}
          </div>
          <div
            className="font-semibold md:text-xl text-red-500 cursor-pointer"
            onClick={() => handleDelete(id)}
          >
            <Delete />
          </div>
        </div>
      }
    >
      <ListItemAvatar>
        <Avatar className="bg-theme">
          <CurrencyRupee />
        </Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={
          <h2 className="font-semibold text-md text-theme">{paymentName}</h2>
        }
        secondary={
          <h2 className="font-normal text-xs md:text-sm text-gray-500 break-all">
            {dayjs(createdAt).format("MMM D, YYYY h:mm A")}
          </h2>
        }
      />
    </ListItem>
  );
};

export default IncomingFinance;
