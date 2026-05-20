import { PlacementAppliedStudent } from "components/admin";
import { PlacementDetails } from "components/students/placement";
import { useSWRFetch, withProtectedAdmin } from "hooks";
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
const PlacementId = () => {
  const { query } = useRouter();

  const { placementId } = query;

  const { data, isValidating } = useSWRFetch<PlacementNoticeDataType>(
    placementId && `placement/notice/${placementId}`
  );

  return (
    <PrivateLayout title="Placement | View ">
      <section className="w-full p-4">
        <PlacementDetails data={data?.data} loading={isValidating} />
        <PlacementAppliedStudent />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedAdmin(PlacementId);
