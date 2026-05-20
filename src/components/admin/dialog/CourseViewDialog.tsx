import { Info } from "@mui/icons-material";
import { Avatar, Tooltip } from "@mui/material";
import { CustomDialog } from "components/core";
import { useSWRFetch } from "hooks";
import { useState, useEffect } from "react";
import CourseType from "types/course";

type dataType = {
  data: CourseType[];
};
const CourseViewDialog = ({ courseInfo, refetch }: any) => {
  const {
    data: course,
    mutate: courseMutate,
    isValidating,
  } = useSWRFetch<dataType>(courseInfo && `course?courseId=${courseInfo}`);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    courseMutate();
  }, [refetch]);
  return (
    <>
      <CustomDialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        maxWidth="xs"
      >
        <div className="w-full flex flex-col bg-white border">
          <div className="px-4 py-4 text-theme">
            <div className="flex items-center text-theme  font-bold text-xl gap-1 mb-2">
              {/* <BookOnline className="h-8 w-8" /> */}
              {/* <h3 className="tracking-wide text-2xl">Course Details</h3> */}
            </div>

            <div className=" flex px-2">
              <Avatar
                src={
                  (course?.data && course?.data?.[0]?.iconUrl) ||
                  `https://cdn-icons-png.flaticon.com/128/11879/11879136.png`
                }
                variant="square"
                sx={{
                  mt: 0,
                  height: 70,
                  width: 100,
                }}
              />
            </div>
            <div className="flex w-full gap-1 px-2 my-2">
              <div className="font-semibold w-full">
                <h2 className="">Title :</h2>
                {course?.data ? course?.data?.[0]?.title : "Not Provided"}
              </div>
              <div className="font-semibold w-full">
                <h2>Duration :</h2>
                {course?.data
                  ? course?.data?.[0]?.duration + " Years"
                  : "Not Provided"}
              </div>
            </div>

            <div className="flex w-full gap-1 px-2 mb-2">
              <div className="font-semibold w-full text-justify ">
                <h2 className="">Description :</h2>
                {course?.data ? course?.data?.[0]?.description : "Not Provided"}
              </div>
            </div>
          </div>
        </div>
      </CustomDialog>
      <span
        onClick={() => setOpenDialog(true)}
        className="bg-gradient-to-r from-transparent cursor-pointer text-white to-orange-500  px-8 h-full  flex items-center justify-center rounded-tl-lg  "
      >
        <Tooltip title="View Course Info">
          <Info />
        </Tooltip>
      </span>
    </>
  );
};

export default CourseViewDialog;
