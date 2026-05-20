import { MaterialSkeleton } from "components/admin/skeleton";
import { StudentReportCard } from "components/cards";
import { Empty } from "components/core";
import { useAuth, useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { StudentCertificateTypes } from "types/certificate";

type StudentCertificateDataType = {
  data: StudentCertificateTypes[];
};

const StudentCertificates = () => {
  const { user } = useAuth();

  const { data, isValidating } = useSWRFetch<StudentCertificateDataType>(
    (user?.userParent?._id && `student/certificate/${user?.userParent?._id}`) ||
      (user?._id && `student/certificate/${user?._id}`)
  );

  return (
    <PrivateLayout title="Student | Certificates ">
      <section className="w-full container grid grid-cols-1 md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 mx-auto p-4  ">
        {!data || isValidating ? (
          <MaterialSkeleton i={7} />
        ) : data?.data?.length ? (
          data?.data?.map((item) => (
            <StudentReportCard
              _id={item?._id}
              img={item?.fileUrl}
              key={item?._id}
              type={item?.type}
              testName={item?.title}
              examDate={item?.createdAt}
              resultType={item?.issuedBy?.displayName}
              percentage={item?.issuedBy?.email}
            />
          ))
        ) : (
          <div className="w-full flex items-center col-span-12 justify-center">
            <Empty title="No Certificates Found" />
          </div>
        )}
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentCertificates);
