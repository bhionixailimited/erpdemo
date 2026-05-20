import { CreateClass, ViewLms } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useState } from "react";

const Timetable = () => {
  const [isReload, setIsReload] = useState(false);

  const reload = () => {
    setIsReload((prev) => !prev);
  };

  return (
    <PrivateLayout title="Teacher | LMS">
      <section className="w-full p-4  ">
        <div className="w-full p-4 flex flex-col md:flex-row items-center gap-4 justify-between  bg-white shadow-lg rounded-lg mb-4 ">
          <h3 className="font-semibold text-theme tracking-wide text-2xl">
            View Online Class
          </h3>
          <CreateClass reload={reload} />
        </div>
        <ViewLms type={"TEACHER"} reload={isReload} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(Timetable);
