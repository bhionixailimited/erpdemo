import {
  AddressDetails,
  DocumentDetails,
  EducationalDetails,
  ParentDetails,
  Payment,
  ProgrammeDetails,
} from "components/apply";
import StepComponent from "components/apply/StepComponent";
import { useApplyAuth } from "hooks";
import { ApplyLayout } from "layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const StudentRegistration = () => {
  const [activeStep, setActiveStep] = useState(1);
  const { push } = useRouter();
  const { user } = useApplyAuth();

  useEffect(() => {
    if (user?.isApplicationSubmitted) push("/apply/preview");
    if (user?.isDocumentsSubmitted) return setActiveStep(6);
    if (user?.isEducationalDetailsSubmitted) return setActiveStep(6);
    if (user?.isAddressDetailsSubmitted) return setActiveStep(5);
    if (user?.isParentDetailsSubmitted) return setActiveStep(4);
    if (user?.isPaymentDone) return setActiveStep(3);
    if (user?.isApplicationAndProgrammeSubmitted) return setActiveStep(2);
  }, [
    user?.isAddressDetailsSubmitted,
    user?.isApplicationAndProgrammeSubmitted,
    user?.isParentDetailsSubmitted,
    user?.isEducationalDetailsSubmitted,
    user?.isDocumentsSubmitted,
    user?.isPaymentDone,
  ]);

  return (
    <ApplyLayout title="Registration">
      <section className="w-full bg-white">
        <StepComponent activeKey={activeStep} setActiveStep={setActiveStep} />
        {activeStep === 1 ? (
          <ProgrammeDetails setActiveStep={setActiveStep} />
        ) : activeStep === 2 ? (
          <Payment setActiveStep={setActiveStep} />
        ) : activeStep === 3 ? (
          <ParentDetails setActiveStep={setActiveStep} />
        ) : activeStep === 4 ? (
          <AddressDetails setActiveStep={setActiveStep} />
        ) : activeStep === 5 ? (
          <EducationalDetails setActiveStep={setActiveStep} />
        ) : (
          <DocumentDetails setActiveStep={setActiveStep} />
        )}
      </section>
    </ApplyLayout>
  );
};

export default StudentRegistration;
