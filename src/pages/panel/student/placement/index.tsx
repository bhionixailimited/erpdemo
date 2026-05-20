import { BOOK } from "assets/animations";
import { PlacementNotice } from "components/students/placement";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import React from "react";
import Lottie from "components/core/ClientLottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: BOOK,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const StudentPlacement = () => {
  return (
    <PrivateLayout title="Placement | Student ">
      <section className="w-full container mx-auto p-4">
        <div className="w-full flex items-center justify-between mb-4 bg-white shadow-xl rounded-lg p-4 gap-4">
          <h3 className="w-fit font-semibold tracking-wide text-theme text-2xl ">
            Placement Notice
          </h3>
        </div>

        <div className="w-full flex justify-between gap-4 items-start ">
          <PlacementNotice />
          <div className="w-fit min-h-[80vh] hidden items-center px-4 xl:flex justify-center ">
            <Lottie options={defaultOptions} height={300} width={300} />
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedStudent(StudentPlacement);
