import { MyProfileBg } from "assets/backgrounds";
import { GrievanceOne, GrievanceThree, GrievanceTwo } from "assets/static-icon";
import { CreateSupportForm } from "components/form/teacher";
import { ViewSupport } from "components/teachers";
import withProtectedStudent from "hooks/withStudentProtected";
import { PrivateLayout } from "layouts";
import { useState } from "react";
import CreateRegistrationEnquiryForm from "./CreateRegistrationEnquiryForm";
import { useApplyAuth, useAuth } from "hooks";
import ViewEnquiryMessage from "./ViewEnquiryMessage";
const SupportArr = [
  {
    id: 1,
    title: "Take Online Assignment",
    des: "Every week assignment in every subjects",
    img: GrievanceOne.src,
  },
  {
    id: 2,
    title: "Take Online Exams and LMS",
    des: "Online exams and LMS facilities",
    img: GrievanceTwo.src,
  },
  {
    id: 3,
    title: "Download E-certificates",
    des: "Download your certificates without any hesitation",
    img: GrievanceThree.src,
  },
];
const MyQueries = () => {
  const [reload, setReload] = useState(false);
  const { user } = useApplyAuth();
  console.log("user", user);
  const handleReload = () => {
    setReload((prev) => !prev);
  };

  return (
    <section className="w-full bg-white py-6 lg:py-10 main-container flex flex-col gap-6">
      {/* <div
        className="w-full h-52"
        style={{
          backgroundImage: `url(${MyProfileBg.src})`,
          borderRadius: "15px",
          backgroundPosition: "top",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="flex flex-col gap-0.5 p-4 items-center justify-center w-full h-full">
          <p className="text-white font-semibold text-2xl md:text-3xl flex items-center justify-center">
            How can we help you ?
          </p>
          <p className="text-white md:text-base text-sm leading-6 tracking-wider">
            {
              "Get the most out of our software. Contact us if you don't find what you're looking for"
            }
          </p>
        </div>
      </div>
      <div className="text-3xl font-semibold text-center w-full flex justify-center items-center pt-5">
        Support Features
      </div>
      <div className="w-full grid md:grid-cols-8 grid-cols-4 lg:grid-cols-12  gap-6">
        {SupportArr?.map((item) => (
          <div
            key={item.id}
            className="flex flex-col col-span-4  rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.2)] items-center justify-center text-center p-5 gap-2 bg-gradient-to-br from-theme/40 to-themeSecondary"
          >
            <div className="bg-white p-4 rounded-full h-1/2">
              <img className="w-12 h-12 object-contain" src={item.img} alt="" />
            </div>
            <div className="flex flex-col h-1/2">
              <p className="text-lg font-semibold text-white">{item.title}</p>
              <p className="text-sm text-white">{item.des}</p>
            </div>
          </div>
        ))}
      </div> */}
      <CreateRegistrationEnquiryForm reload={handleReload} />
      <ViewEnquiryMessage reload={reload} />
    </section>
  );
};

export default MyQueries;
