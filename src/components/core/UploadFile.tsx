// import { Add, DeleteOutlineSharp } from '@material-ui/icons'
import { Avatar } from "@mui/material";
import { UPLOAD } from "assets/animations";
import { useRef, useEffect } from "react";
import Lottie from "./ClientLottie";
type Props = {
  value?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement> | any;
  height?: number;
  width?: number;
  url?: string;
  className?: string;
  uploadText?: string;
  accept?: string;
  outerClassName?: string;
  variant?: "rounded" | "circular";
  disabled?: boolean;
  imageOnly?: boolean;
};

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: UPLOAD,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const UploadFile = ({
  onChange,
  url,
  height = 180,
  width = 180,
  className = "focus-object",
  uploadText = "Drag and Drop or Click to Upload",
  accept,
  outerClassName = "w-full",
  variant,
  disabled = false,
  imageOnly = false,
}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: any) => {
    try {
      e.preventDefault();
      e.stopPropagation();

      if (e?.dataTransfer?.files && e.dataTransfer.files.length > 0) {
        onChange({
          target: {
            files: e?.dataTransfer?.files,
          },
        });
        e.dataTransfer.clearData();
      }
      return;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className={outerClassName}>
        <div
          className="w-full relative z-50 "
          onDrop={handleDrop}
          onDragEnter={handleDrop}
          onDragOver={handleDrop}
          onDragLeave={handleDrop}
        >
          {" "}
          <Avatar
            className={className}
            variant={variant || "rounded"}
            onClick={() => (onChange ? inputRef.current?.click() : {})}
            src={url}
            style={{
              width: "100%",
              height: height,
            }}
            sx={{
              bgcolor: "#5B50A1",
              objectFit: "contain !important",
            }}
          >
            <div className="flex flex-col items-center justify-center gap-4">
              {/* <Backup
                sx={{
                  width: Number(width || 180) / 2,
                  height: Number(height || 180) / 2,
                }}
              /> */}
              <Lottie
                options={defaultOptions}
                height={height - 50}
                width={width}
              />
              <small className="text-center font-medium tracking-wide">
                {uploadText}
              </small>
            </div>
          </Avatar>
        </div>
        <input
          ref={inputRef}
          disabled={disabled}
          hidden
          type="file"
          accept={imageOnly ? "image/*" : ""}
          onChange={onChange}
          onDrop={handleDrop}
          className="w-full"
        />
      </div>
    </>
  );
};

export default UploadFile;
