import { MyProfileBg } from "assets/backgrounds";
import { TeacherAddress } from "components/teachers";
import { useAuth } from "hooks";
import withProtectedRoute from "hooks/withProtectedRoute";
import { PrivateLayout } from "layouts";

const TeacherProfilePage = () => {
  const { user } = useAuth();
  return (
    <PrivateLayout title={`${user?.role ? user?.role : "Unknown"} | Profile`}>
      <section className="w-full mb-10">
        <div className="w-full h-52 relative">
          <img
            src={MyProfileBg.src}
            className="w-full h-full object-cover"
            alt=""
          />
          <div className="main-container absolute top-1/2 w-full flex left-0 right-0 items-center justify-center py-6 md:py-10">
            <div className="w-full flex justify-center gap-8">
              <div className="md:w-[70%] w-full ">
                <TeacherAddress />
              </div>
            </div>
          </div>
        </div>
      </section>
    </PrivateLayout>
  );
};

export default withProtectedRoute(TeacherProfilePage);
