import { AboutUsBg, AboutUsSecond } from "assets/backgrounds";
import { Button } from "components/core";
import { useRouter } from "next/router";

const AboutUs = () => {
  const { push } = useRouter();
  return (
    <section
      className="main-container flex flex-col py-2 md:py-10"
      id="aboutUs"
    >
      <div
        style={{
          backgroundImage: `url('${AboutUsBg.src}`,
        }}
        className="bg-center bg-cover bg-no-repeat rounded-[15px]"
      >
        <div className="w-full flex items-center justify-center">
          <div className="md:w-11/12 w-full justify-between flex md:flex-row flex-col gap-6 md:px-8 px-6 py-6 md:py-12">
            <div className="md:w-3/5 w-full flex flex-col gap-3 md:gap-6">
              <p className="text-white md:text-4xl text-2xl font-semibold">
                About Us
              </p>
              <p className="text-white  leading-5 md:text-sm text-xs relative">
                The College Management System is a business Optimization of
                College or Educational Institute and its Processes.
                <span className="absolute -left-4 top-0 bg-white w-[2px] h-full"></span>
              </p>
              <p className="text-white leading-5 md:text-sm text-xs">
                The project will cover usually all areas that are dear to the
                running of an Educational institution, especially College. It
                allows us to store, modify and retrieve data using the specially
                designed modules… It can manage the details not only of
                students, Departments, and Staff but also other details like
                Exam, Events, front office day to day activities, Fund flow,
                Notifications, etc. The package is fully customizable according
                to the users’ requirements.
              </p>
              <div className="pt-5">
                <Button
                  className="!bg-white !font-semibold !text-sm !text-theme "
                  onClick={() => push("/#contactUs")}
                >
                  Learn More
                </Button>
              </div>
            </div>
            <div className="md:w-2/5 w-full">
              <img src={AboutUsSecond.src} className="w-full" alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
