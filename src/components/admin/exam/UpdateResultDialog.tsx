import { Delete, DesignServices } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { Button, CustomDialog, InputField } from "components/core";

const UpdateResultDialog = ({ open, closeFn }: any) => {
  return (
    <CustomDialog maxWidth="sm" open={open} onClose={closeFn}>
      <div className="w-full">
        <h3 className="font-semibold tracking-wide p-4 border-b text-xl text-center text-theme">
          Update Result
        </h3>
        <div className="flex flex-col gap-4 p-4 ">
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-medium tracking-wide">1. Mathematics</h3>
            <span className="flex items-center gap-2">
              <InputField type="number" />
              <Tooltip title="Update">
                <button className="bg-blue-500 text-white hover:bg-transparent p-3 border transition-all ease-in-out duration-300 border-blue-500 rounded-lg hover:text-blue-500 ">
                  <DesignServices />
                </button>
              </Tooltip>
              <Tooltip title="Remove">
                <button className="bg-red-500 text-white hover:bg-transparent p-3 border transition-all ease-in-out duration-300 border-red-500 rounded-lg hover:text-red-500">
                  <Delete />
                </button>
              </Tooltip>
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-medium tracking-wide">2. Physics</h3>
            <span className="flex items-center gap-2">
              <InputField type="number" />
              <Tooltip title="Update">
                <button className="bg-blue-500 text-white hover:bg-transparent p-3 border transition-all ease-in-out duration-300 border-blue-500 rounded-lg hover:text-blue-500 ">
                  <DesignServices />
                </button>
              </Tooltip>
              <Tooltip title="Remove">
                <button className="bg-red-500 text-white hover:bg-transparent p-3 border transition-all ease-in-out duration-300 border-red-500 rounded-lg hover:text-red-500">
                  <Delete />
                </button>
              </Tooltip>
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <h3 className="font-medium tracking-wide">3. Chemistry</h3>
            <span className="flex items-center gap-2">
              <InputField type="number" />
              <Tooltip title="Update">
                <button className="bg-blue-500 text-white hover:bg-transparent p-3 border transition-all ease-in-out duration-300 border-blue-500 rounded-lg hover:text-blue-500 ">
                  <DesignServices />
                </button>
              </Tooltip>
              <Tooltip title="Remove">
                <button className="bg-red-500 text-white hover:bg-transparent p-3 border transition-all ease-in-out duration-300 border-red-500 rounded-lg hover:text-red-500">
                  <Delete />
                </button>
              </Tooltip>
            </span>
          </div>
          <div className="flex justify-center pt-2">
            <Button>Update</Button>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default UpdateResultDialog;
