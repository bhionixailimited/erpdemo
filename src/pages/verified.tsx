import { Avatar } from "@mui/material";
import { Button } from "components/core";

const Verified = () => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center h-[600px]">
        <div className="shadow-[0px_4px_16px_rgba(17,17,26,0.1),_0px_8px_24px_rgba(17,17,26,0.1),_0px_16px_56px_rgba(17,17,26,0.1)] w-4/12 p-10 rounded flex flex-col justify-center items-center gap-2">
          <Avatar
            src="https://cdn-icons-png.flaticon.com/128/1828/1828640.png"
            sx={{
              height: 100,
              width: 100,
            }}
          />
          <h2 className="font-semibold text-xl text-wider text-theme">
            Verification Completed
          </h2>
          <h2 className="font-medium text-lg text-wider text-theme">
            Your email has been verified successfully
          </h2>
          <Button className="!rounded">Done</Button>
        </div>
      </div>
    </div>
  );
};

export default Verified;
