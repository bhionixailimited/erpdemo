import { SUPPORT } from "assets/animations";
import { CreateSupportForm } from "components/form/teacher";
import { ViewSupport } from "components/teachers";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";
import { useState } from "react";
import Lottie from "components/core/ClientLottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: SUPPORT,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const SupportLayout = () => {
  const [reload, setReload] = useState(false);

  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <PrivateLayout title="Grievance | Support">
      <section className="w-full p-4">
        <div className="flex w-full item-center">
          <CreateSupportForm reload={handleReload} />
          <div className="w-full max-w-md mt-16 hidden xl:flex ">
            <Lottie options={defaultOptions} height={450} width={450} />
          </div>
        </div>
        <ViewSupport reload={reload} />
      </section>
    </PrivateLayout>
  );
};

export default withProtectedRoute(SupportLayout);
