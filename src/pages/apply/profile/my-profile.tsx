import { MyProfileBg } from "assets/backgrounds";
import MyProfile from "components/apply/registration/student-profile/MyProfile";
import StudentProfileLayout from "layouts/studentProfileLayout";

const Myprofile = () => {
  return (
    <StudentProfileLayout title="My Profile">
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
                <MyProfile />
              </div>
            </div>
          </div>
        </div>
      </section>
    </StudentProfileLayout>
  );
};

export default Myprofile;
