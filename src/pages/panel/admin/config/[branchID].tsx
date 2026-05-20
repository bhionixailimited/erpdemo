import { Avatar } from "@mui/material";
import { AllBranchCard, EditBranchDrawer } from "components/admin";
import { BranchDialog } from "components/admin/dialog";
import { useSWRFetch, withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState } from "react";
import CourseType from "types/course";
export const allDepartments = [
  {
    title: "Electrical",
    description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
    avatarSrc: "https://cdn-icons-png.flaticon.com/128/4796/4796093.png",
    // duration: "4 years",
  },

  {
    title: "Mechanical",
    // duration: "2 years",
    description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
    avatarSrc: "https://cdn-icons-png.flaticon.com/128/1995/1995470.png",
  },
  {
    title: "Civil",
    // duration: "2 years",
    description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
    avatarSrc: "https://cdn-icons-png.flaticon.com/128/2942/2942488.png",
  },
  {
    title: "Computer Science",
    // duration: "3 years",
    description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
    avatarSrc: "https://cdn-icons-png.flaticon.com/128/4319/4319162.png",
  },
  // {
  //   title: "Transport",
  //   description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
  //   avatarSrc:
  //     "https://yarderp-web.vercel.app/_next/static/media/inventory.62f12959.png",
  // },
  // // {
  // //   title: "Others",
  // //   description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
  // //   avatarSrc:
  // //     "https://yarderp-web.vercel.app/_next/static/media/other.cb468070.png",
  // // },
  // {
  //   title: "Admin",
  //   description: "Lorem ipsum dolor sit amet a ante et justo so simple as",
  //   avatarSrc: "https://cdn-icons-png.flaticon.com/512/9322/9322127.png",
  // },
];
type dataType = {
  data: CourseType[];
};
const SetBranch = () => {
  const [editDepartmentDrawer, setEditDepartmentDrawer] = useState(false);
  const { query } = useRouter();
  const { data, isValidating, error, mutate } = useSWRFetch<dataType>(
    query?.branchID && `branch?courseId=${query?.branchID}`
  );
  const { data: course } = useSWRFetch<any>(
    query?.branchID && `course/${query?.branchID}`
  );
  return (
    <div className="w-full">
      <PrivateLayout title="Course | Manage">
        <div>
          <div className="px-4 text-xl font-semibold">{`Branches of ${
            course?.data?.title ? course?.data?.title : ""
          }`}</div>
          <div className="px-4 mt-3">
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
                  <BranchDialog mutate={mutate} />
                </span>
              </div>
              {data?.data?.map((item) => (
                <AllBranchCard
                  _id={item?._id}
                  key={item?._id}
                  title={item?.title}
                  description={item?.description}
                  avatarSrc={item?.iconUrl}
                  editDepartment={() =>
                    setEditDepartmentDrawer(item?._id as any)
                  }
                  mutate={mutate}
                />
              ))}
            </div>
            <EditBranchDrawer
              mutate={mutate}
              open={editDepartmentDrawer}
              // open={() => setEditDepartmentDrawer(true)}
              onClose={() => setEditDepartmentDrawer(false)}
            />
          </div>
        </div>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(SetBranch);
