import { Done, ErrorOutline, HighlightOff } from "@mui/icons-material";
import { Dialog } from "@mui/material";
import Button from "./Button";

type Props = {
  open?: boolean;
  closeOnClickOutside?: boolean;
  closeFn?: () => void;
  successButtonText?: string;
  cancelButtonText?: string;
  children?: any;
  question?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
  type?: "success" | "warning" | "cancel";
};

const Alert = ({
  open = false,
  closeOnClickOutside = true,
  closeFn,
  successButtonText = "OK",
  cancelButtonText = "Cancel",
  children,
  question = "Are you sure?",
  onCancel,
  onSuccess,
  type = "success",
}: Props) => {
  const iconOptions = {
    success: <Done />,
    warning: <ErrorOutline />,
    cancel: <HighlightOff />,
  };
  return (
    <Dialog
      open={open}
      onClose={() => closeOnClickOutside && closeFn?.()}
      maxWidth="xs"
      fullWidth
    >
      <div className="flex flex-col gap-4">
        {iconOptions[type]}
        {children}

        {!children && (
          <h3 className="text-lg font-medium tracking-wide text-center">
            {question}
          </h3>
        )}

        <div className="flex items-center pt-4 gap-4">
          <Button onClick={onSuccess}>{successButtonText}</Button>
          <Button
            onClick={onCancel}
            className=" !bg-themeSecondary hover:!ring-themeSecondary "
          >
            {cancelButtonText}
          </Button>
        </div>
      </div>
    </Dialog>
  );
};

export default Alert;
