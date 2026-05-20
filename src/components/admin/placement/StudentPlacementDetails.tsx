import { Avatar } from "@mui/material";
import { Button, CustomDialog } from "components/core";

const StudentPlacementDetails = ({ open, closeFn }: any) => {
  return (
    <CustomDialog open={open} onClose={closeFn} maxWidth="md">
      <div className="w-full">
        <h3 className="font-semibold tracking-wide text-2xl text-theme p-4  text-center border-b ">
          Student Details
        </h3>
        <div className="w-full">
          <div className="flex flex-col xl:flex-row items-center">
            <div className="flex items-center flex-col gap-4 justify-center p-4 xl:p-8 xl:border-r">
              <Avatar
                src={`https://avatars.dicebear.com/api/avataaars/lk.svg`}
                sx={{
                  height: "7rem",
                  width: "7rem",
                }}
                className="!bg-gray-100 !shadow-lg "
              >
                s
              </Avatar>
              <h3 className="text-center tracking-wide font-semibold w-full text-xl">
                Alex Carter
              </h3>
              <small className="text-gray-600 tracking-wide">
                #qw2H333uvsggsHSH2uu33e
              </small>
              <div className="flex items-center gap-4 flex-wrap justify-center">
                <Button className="!bg-green-600 hover:ring-green-600">
                  Download Resume
                </Button>
              </div>
            </div>
            <div className="flex flex-col w-full ">
              <h3 className="font-semibold tracking-wide text-xl border-b p-2 text-theme">
                Academic Details
              </h3>
              <div className="flex flex-col lg:flex-row gap-4 items-start border-b p-4  w-full">
                <div className="flex flex-col w-full">
                  <h3 className="font-medium tracking-wide text-gray-600">
                    Season
                  </h3>
                  <h3 className="font-semibold tracking-wide text-sm">
                    2022 - 2026
                  </h3>
                </div>
                <div className="flex flex-col w-full">
                  <h3 className="font-medium tracking-wide text-gray-600">
                    Course
                  </h3>
                  <h3 className="font-semibold tracking-wide text-sm">BTech</h3>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 items-start border-b p-4  w-full">
                <div className="flex flex-col w-full">
                  <h3 className="font-medium tracking-wide text-gray-600">
                    Roll Number
                  </h3>
                  <h3 className="font-semibold tracking-wide text-sm">
                    K22022-5678
                  </h3>
                </div>
                <div className="flex flex-col w-full">
                  <h3 className="font-medium tracking-wide text-gray-600">
                    Branch
                  </h3>
                  <h3 className="font-semibold tracking-wide text-sm">
                    Mechanical
                  </h3>
                </div>
              </div>
              <div className="flex flex-col lg:flex-row gap-4 items-start  p-4  w-full">
                <div className="flex flex-col w-full">
                  <h3 className="font-medium tracking-wide text-gray-600">
                    Gender
                  </h3>
                  <h3 className="font-semibold tracking-wide text-sm">
                    Female
                  </h3>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col border-t">
            <h3 className="font-semibold  border-b text-theme tracking-wide text-2xl p-4">
              Technical Knowledge -
            </h3>
            <p className="tracking-wide font-medium p-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Velit
              magnam recusandae quo modi soluta voluptas doloremque. Aperiam
              ullam alias quis nostrum dolorem voluptatum illo odio, accusamus
              tenetur, assumenda dicta quos natus sunt aut, maiores impedit!
              Aspernatur amet voluptas, eius iste quas id reprehenderit libero
              consectetur exercitationem asperiores hic et perspiciatis?
            </p>
          </div>
        </div>
      </div>
    </CustomDialog>
  );
};

export default StudentPlacementDetails;
