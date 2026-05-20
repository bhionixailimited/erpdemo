import { Add } from "@mui/icons-material";
import { StudentReportCard } from "components/cards";
import { useSWRFetch } from "hooks";
import { StudentCertificateTypes } from "types/certificate";
import { AddCertificateDialog } from "./dialog";
import { MaterialSkeleton } from "./skeleton";

type dataType = {
  data: StudentCertificateTypes[];
};
const StudentCertificate = ({ studentID }: { studentID?: string }) => {
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    `student/certificate/${studentID}`
  );
  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      <div className="w-full bg-white min-h-[10rem] shadow-xl p-4 h-full flex items-center justify-center cursor-pointer hover:bg-gray-100 rounded-lg duration-300 ease-in-out transition-all ">
        <AddCertificateDialog Dmutate={mutate} />
      </div>

      {isValidating ? (
        <MaterialSkeleton i={7} />
      ) : data?.data && data?.data.length > 0 ? (
        data?.data?.map((item) => (
          <StudentReportCard
            _id={item?._id}
            img={item?.fileUrl}
            key={item?._id}
            type={item?.type}
            testName={item?.title}
            // cgpa={item?.sgpa}
            examDate={item?.createdAt}
            resultType={item?.issuedBy?.displayName}
            percentage={item?.issuedBy?.email}
            Dmutate={mutate}
          />
        ))
      ) : (
        <span className="text-gray-400 font-semibold flex justify-center items-center">
          No Certificate
        </span>
      )}
    </div>
  );
};

export default StudentCertificate;
