import { Button } from "components/core";
import { useExamData } from "hooks";
import { useRouter } from "next/router";
import React from "react";

const ExamThankYouPage = () => {
  const { exam } = useExamData();

  const { push } = useRouter();

  const handleGoToHome = () => {
    push(`/panel/student/exam?reload=true`);
  };

  return (
    <div className="w-full flex container mx-auto min-h-screen flex-col gap-4 items-center justify-center">
      <h3 className="font-semibold tracking-wide text-center text-3xl text-theme">
        Thank You
      </h3>

      {exam?.conclusionText && (
        <>
          <h3 className="font-medium tracking-wide text-center">
            Examiner Message
          </h3>

          <p className="text-gray-800 tracking-wide text-base font-medium">
            {exam?.conclusionText}
          </p>
        </>
      )}

      <Button onClick={handleGoToHome}>Go to Home </Button>
    </div>
  );
};

export default ExamThankYouPage;
