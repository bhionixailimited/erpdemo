import { Cancel, CloudUpload } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { ChangeEventHandler } from "react";

type Props = {
  onChange?: ChangeEventHandler<HTMLInputElement> | undefined;
  image?: string;
  clearImage: () => void;
};

const ImageField = ({ onChange, image, clearImage }: Props) => {
  return (
    <div className="w-52 h-48 overflow-hidden relative bg-theme/95 text-white shadow-lg rounded-md cursor-pointer ">
      {image ? (
        <div className="h-full w-full">
          <img
            src={image}
            className="w-full h-full"
            // loading="lazy"
            alt="userimage"
          />
        </div>
      ) : (
        <div className="h-full w-full flex flex-col gap-4 items-center justify-center">
          <CloudUpload className="text-5xl" />
          <small>Upload File</small>
        </div>
      )}

      {image && (
        <span className="absolute top-0 z-50 cursor-pointer right-0">
          <Tooltip title="Clear">
            <IconButton onClick={clearImage}>
              <Cancel className="text-red-600" />
            </IconButton>
          </Tooltip>
        </span>
      )}

      <input
        type="file"
        className="absolute top-0 left-0 w-full h-full z-10 opacity-0 "
        onChange={onChange}
      />
    </div>
  );
};

export default ImageField;
