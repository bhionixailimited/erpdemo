import { ApplyPlacement } from "components/form/student";
import { PlacementDetails } from "components/students/placement";
import { useSWRFetch } from "hooks";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";

type PlacementNoticeDataType = {
  data: {
    _id: string;
    title: string;
    qualification: string;
    session: string;
    companyName: string;
    companyDetails: string;
    jobDescription: string;
    companyRepresentative: string;
    jobBenefits: string;
    howToApply: string;
    lastDateToApply: Date;
    createdBy: string;
    position: string;
    companyId: {
      address: string;
      branch: string;
      description: string;
      industry: string;
      name: string;
      phoneNumber: string;
    };
  };
};

const ViewPlacementDetails = () => {
  const { query } = useRouter();

  const { placementId } = query;

  const { data, isValidating } = useSWRFetch<PlacementNoticeDataType>(
    placementId && `placement/notice/${placementId}`
  );

  return (
    <PrivateLayout title="Placement | Student">
      <section className="w-full container mx-auto p-4">
        <PlacementDetails data={data?.data} loading={isValidating} />
        <ApplyPlacement />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(ViewPlacementDetails);
