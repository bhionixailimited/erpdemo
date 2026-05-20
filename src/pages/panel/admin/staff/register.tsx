import {
  Box,
  Container,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import {
  AccountDetails,
  BasicDetails,
  OtherDetails,
} from "components/admin/staffRegistration";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const StaffRegister = () => {
  const router = useRouter()?.query;
  const steps = [
    "Add Basic Details",
    "Add Other Details",
    "Add Account Details",
    // 'Add Parent Details',
    // 'Add Address',
  ];
  useEffect(() => {
    router?.userId && setActiveStep(1);
    router?.userIdAgain && setActiveStep(2);
    !router?.userIdAgain && !router?.userId && setActiveStep(0);
  }, [router]);

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
        return <BasicDetails handleNext={handleNext} />;
      case 1:
        return <OtherDetails handleNext={handleNext} />;
      case 2:
        return (
          <AccountDetails handleNext={handleNext} handleBack={handleBack} />
        );

      default:
        break;
    }
  };
  return (
    <div className="w-full">
      <PrivateLayout title="Staff | Register">
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
              New Staff Register Form
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

export default withProtectedAdmin(StaffRegister);
