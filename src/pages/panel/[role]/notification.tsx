import { NOTIFICATION } from "assets/animations";
import { NotificationBox } from "components/students";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";
import Lottie from "components/core/ClientLottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: NOTIFICATION,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Notification = () => {
  return (
    <PrivateLayout title="Notification">
      <div className="w-full flex justify-between items-center main-container py-6 md:py-10">
        <div className="w-full md:w-3/5">
          <NotificationBox />
        </div>
        <div className="hidden md:block md:w-2/5">
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>
      </div>
    </PrivateLayout>
  );
};

export default withProtectedRoute(Notification);
