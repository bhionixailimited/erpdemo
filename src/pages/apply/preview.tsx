import PreviewDetails from "components/apply/registration/PreviewDetails";
import { ApplyLayout } from "layouts";
import React from "react";

const preview = () => {
  return (
    <ApplyLayout>
      <section className="main-container absolute w-full flex left-0 right-0 items-center justify-center py-6 md:py-10">
        <div className="w-full flex justify-center gap-8">
          <PreviewDetails />
        </div>
      </section>
    </ApplyLayout>
  );
};

export default preview;
