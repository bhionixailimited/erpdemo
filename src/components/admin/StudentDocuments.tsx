import { Add } from "@mui/icons-material";
import { StudentCertificate, StudentReportCard } from "components/cards";
import { useSWRFetch } from "hooks";
import { StudentCertificateTypes } from "types/certificate";
import { AddCertificateDialog, AddDocumentsDialog } from "./dialog";
import { MaterialSkeleton } from "./skeleton";
import { AcademicDetailsType } from "types/academic";
import UserType from "types/user";

// type dataType = {
//   data: StudentCertificateTypes[];
// };
interface DataType extends UserType {
  academicDetails: AcademicDetailsType;
}
type dataType = {
  data: DataType;
};
const StudentDocuments = ({ studentID }: { studentID?: string }) => {
  const { data, mutate, isValidating } = useSWRFetch<dataType>(
    `user/details/${studentID}?academics=true`
  );

  return (
    <div className="w-full p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 ">
      <div className="w-full bg-white  shadow-xl p-4  flex items-center justify-center cursor-pointer min-h-[10rem]   hover:bg-gray-100 rounded-lg duration-300 ease-in-out transition-all ">
        <AddDocumentsDialog Dmutate={mutate} />
      </div>

      {isValidating ? (
        <MaterialSkeleton i={7} />
      ) : data?.data &&
        data?.data?.academicDetails?.certificates?.length > 0 ? (
        data?.data?.academicDetails?.certificates?.map((item) => (
          <StudentCertificate
            _id={item?._id}
            img={item?.fileUrl}
            key={item?._id}
            // type={item?.type}
            testName={item?.title}
            // cgpa={item?.sgpa}
            // examDate={item?.createdAt}
            // resultType={item?.issuedBy?.displayName}
            // percentage={item?.issuedBy?.email}
            Dmutate={mutate}
          />
        ))
      ) : (
        "No Documents Found"
      )}
    </div>
  );
};

export default StudentDocuments;
