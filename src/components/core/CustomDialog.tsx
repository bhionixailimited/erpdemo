import { Dialog } from "@mui/material";
import { MouseEventHandler } from "react";

type Props = {
  open?: boolean;
  onClose?: (event: Event) => void;
  children?: any;
  maxWidth?: "lg" | "md" | "sm" | "xl" | "xs";
  onMouseOutCapture?: MouseEventHandler<HTMLDivElement> | undefined;
};

const CustomDialog = ({
  open = false,
  onClose,
  children,
  maxWidth = "md",
  onMouseOutCapture,
}: Props) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      keepMounted={false}
      scroll={"body"}
      onMouseOutCapture={onMouseOutCapture}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialog;
