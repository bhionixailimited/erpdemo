import { useState } from "react";
import { Avatar } from "@mui/material";
import { AllCourseCard, EditCourseDrawer } from "components/admin";
import { PrivateLayout } from "layouts";
import CourseType from "types/course";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { AddCourseDialog } from "components/admin/dialog";

type dataType = {
  data: CourseType[];
};
const SetCourse = () => {
  const [editCourseDrawer, setEditCourseDrawer] = useState(false);
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>("course");
  const [refetch, setRefetch] = useState(false);
  return (
    <div className="w-full">
      <PrivateLayout title="Course | Manage">
        <div className="px-4 mt-4">
          <div className="grid grid-cols-12 gap-4 w-full">
            <div className="w-full col-span-12 md:col-span-6 lg:col-span-3 xl:col-span-3 shadow-md  bg-theme rounded-xl ">
              <span
                className={`flex flex-col p-2 2xl:p-4 items-center justify-center  h-32 xl:h-36 2xl:h-44`}
              >
                <Avatar
                  src="https://cdn-icons-png.flaticon.com/128/4413/4413569.png"
                  variant="rounded"
                  sx={{
                    height: 54,
                    width: 54,
                  }}
                />
                <AddCourseDialog mutate={mutate} />
              </span>
            </div>
            {data?.data?.map((item) => (
              <AllCourseCard
                _id={item?._id}
                key={item?._id}
                title={item?.title}
                duration={item?.duration}
                description={item?.description}
                iconUrl={item?.iconUrl}
                editCourse={() => setEditCourseDrawer(item?._id as any)}
                mutate={mutate}
                refetch={refetch}
              />
            ))}
          </div>
          <EditCourseDrawer
            mutate={mutate}
            open={editCourseDrawer}
            onClose={() => {
              setEditCourseDrawer(false);
              setRefetch((prev) => !prev);
            }}
          />
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(SetCourse);
