import { SearchBar } from "components/common";
import { ViewExamCard } from "components/teachers";
import withProtectedTeacher from "hooks/withTeacherProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";

const ViewAllExam = () => {
  const { push } = useRouter();
  return (
    <PrivateLayout title="Exam | View All">
      <section className="w-full container mx-auto ">
        <SearchBar />
        <div className="grid grid-cols-1 md:grid-cols-2 py-4 gap-4 lg:grid-cols-3 xl:grid-cols-4">
          {Array(5)
            .fill(0)
            .map((item, index) => (
              <ViewExamCard
                onClick={() => push(`/panel/teacher/result/${Date.now()}`)}
                key={index}
                title={""}
              />
            ))}
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedTeacher(ViewAllExam);
