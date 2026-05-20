import { ExamCards } from "components/cards";
import { ScheduleExamDrawerForm } from "components/form/admin";
import { useRouter } from "next/router";
import { useState } from "react";

const ViewExam = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const { push } = useRouter();

  return (
    <div className="w-full  p-4 ">
      <ScheduleExamDrawerForm
        open={Boolean(openDrawer)}
        closeFn={() => setOpenDrawer(false)}
      />

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4 py-4 lg:grid-cols-3 xl:grid-cols-4">
        {Array(5)
          .fill(0)
          .map((item, index) => (
            <ExamCards
              key={index}
              onViewClick={() =>
                push(`/panel/admin/exam/schedule/${Date.now()}`)
              }
              onEditClick={() => setOpenDrawer(true)}
            />
          ))}
      </div>
    </div>
  );
};

export default ViewExam;
