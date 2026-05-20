import {
  Box,
  Card,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  BasicDetails,
  ClassDetails,
  DocumentDetails,
  OtherDetails,
} from "components/admin/registration";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const AdmissionRequest = () => {
  const router = useRouter()?.query;

  const steps = [
    "Add Basic Details",
    "Add Other Details",
    "Add Admission Details",
    "Add Documents",
    // 'Add Address',
  ];
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  // Go back to prev step
  const handleBack = () => setActiveStep((prev) => prev - 1);

  const handleReset = () => {
    setActiveStep(0);
  };

  const handleSteps = (step: any) => {
    switch (step) {
      case 0:
        // return <BasicDetails handleNext={handleNext} />
        return <BasicDetails handleNext={handleNext} />;
      case 1:
        return <OtherDetails handleNext={handleNext} />;
      case 2:
        return <ClassDetails handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return (
          <DocumentDetails handleNext={handleNext} handleBack={handleBack} />
        );
      // return (
      //   <ClassDetails handleNext={handleNext} handleBack={handleBack} />
      // )
      // case 2:
      //   return <ParentDetails  /> // <BankAccountInfo handleBack={handleBack} handleReset={handleReset} />
      // case 3:
      //   return (
      //     <Address />
      //   )

      default:
        break;
    }
  };
  useEffect(() => {
    router?.userId && setActiveStep(1);
    router?.userIdAgain && setActiveStep(2);
    router?.userDocs && setActiveStep(3);
    !router?.userIdAgain &&
      !router?.userId &&
      !router?.userDocs &&
      setActiveStep(0);
  }, [router]);
  return (
    <div className="w-full">
      <PrivateLayout title="Admission | Request">
        <Container
          maxWidth="lg"
          className="!py-5"
          // style={{
          //   width: "40vw",
          //   marginTop: "12vh",
          // }}
        >
          <Box sx={{ width: "100%" }}>
            {/* <Card sx={{ padding: 2, marginTop: '0vh' }}> */}
            <Typography
              align="center"
              variant="h5"
              sx={{ fontWeight: "bold" }}
              marginBottom={"6vh"}
              className="!text-theme"
            >
              Student Admission Form
            </Typography>
            <Stepper activeStep={activeStep} alternativeLabel>
              {steps?.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>
            {handleSteps(activeStep)}
            {/* </Card> */}
          </Box>
        </Container>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(AdmissionRequest);
