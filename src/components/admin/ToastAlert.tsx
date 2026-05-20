import { Button } from "@mui/material";
import { toast } from "react-toastify";
type Props = {
  message: string;
};
const ToastAlert = ({ message }: Props) => {
  return (
    <>
      {toast.success(
        <div className="flex items-center gap-4 ">
          <h3 className="font-medium tracking-wide text-sm">{message}</h3>
          <div className="flex items-center gap-1">
            <Button
            //   colorScheme="whatsapp"
            //   size={"xs"}
            //   onClick={() => navigation(`/call/${roomId}`)}
            >
              Join
            </Button>{" "}
            <Button
            //   colorScheme="whatsapp"
            //   size={"xs"}
            //   onClick={() => navigation(`/call/${roomId}`)}
            >
              Join
            </Button>
          </div>
        </div>,
        {
          position: "bottom-right",
          autoClose: 10000,
          hideProgressBar: false,
          closeOnClick: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        }
      )}
    </>
  );
};

export default ToastAlert;
