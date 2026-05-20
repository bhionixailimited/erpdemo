import { BOOK } from "assets/animations";
import { ViewPlacementNotice } from "components/admin";
import { withProtectedAdmin } from "hooks";
import { PrivateLayout } from "layouts";
import { useRouter } from "next/router";
import Lottie from "components/core/ClientLottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: BOOK,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const ManagePlacement = () => {
  const { push } = useRouter();

  return (
    <div className="w-full">
      <PrivateLayout title="Placement | Manage">
        <section className="w-full p-4">
          <div className="w-full flex flex-col md:flex-row items-center justify-between mb-4 bg-white shadow-xl rounded-lg p-4 gap-2 md:gap-4">
            <h3 className="w-fit font-semibold tracking-wide text-theme text-2xl ">
              Placement Notice
            </h3>
            <button
              className="btn-primary"
              onClick={() => push(`/panel/admin/placement/create`)}
            >
              Create Placement Notice
            </button>
          </div>
          <div className="w-full flex justify-between gap-4 items-start ">
            <ViewPlacementNotice />
            <div className="w-fit min-h-[80vh] hidden items-center px-4 xl:flex justify-center ">
              <Lottie options={defaultOptions} height={300} width={300} />
            </div>
          </div>
        </section>
      </PrivateLayout>
    </div>
  );
};

export default withProtectedAdmin(ManagePlacement);
