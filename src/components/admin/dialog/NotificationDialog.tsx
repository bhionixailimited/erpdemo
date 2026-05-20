import { Info } from "@mui/icons-material";
import { Button, CustomDialog } from "components/core";
import useAppContext from "contexts/AppContextProvider";
import { useFetch } from "hooks";
import { useState } from "react";
import { KeyedMutator } from "swr";
import { NotificationType } from "types/notification";
import { notify } from "utils";

type Props = {
  fee?: NotificationType;
  Dmutate: KeyedMutator<any>;
};
const NotificationDialog = ({ fee, Dmutate }: Props) => {
  const { mutate } = useFetch();
  const [openDialog, setOpenDialog] = useState(false);
  const [value, setValue] = useState("");
  const { reloadNotificationCount } = useAppContext();

  return (
    <>
      <div className="w-fit">
        <CustomDialog
          open={openDialog}
          onClose={() => setOpenDialog(false)}
          maxWidth="xs"
        >
          <div className="w-full  border py-5 text-center">
            <div className=" text-theme">
              <h3 className="text-xl font-bold">{fee?.title}</h3>
              <p className="text-lg font-semibold break-words ">
                {fee?.description}
              </p>
            </div>
            <div className="flex justify-center mt-2">
              <Button onClick={() => setOpenDialog(false)}>OK</Button>
            </div>
          </div>
        </CustomDialog>
      </div>
      <Info
        className="cursor-pointer"
        onClick={async () => {
          setOpenDialog(true);
          try {
            const response = await mutate({
              path: `notification/read`,
              method: "PUT",
              body: JSON.stringify({
                notificationId: fee?._id,
              }),
            });

            if (response?.data?.error) {
              notify.error(response?.data?.error);
              return;
            }
            Dmutate();
            reloadNotificationCount();
          } catch (err) {
            console.log(err);
          }
        }}
      />
    </>
  );
};

export default NotificationDialog;
