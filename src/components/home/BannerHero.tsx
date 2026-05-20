import { useRouter } from "next/router";

const BannerHero = () => {
  const { push } = useRouter();
  return (
    <section
      style={{
        backgroundImage: `url('/Backgrounds/hero-section-bg.png`,
      }}
      className="bg-cover bg-no-repeat bg-center"
    >
      <div className="main-container flex flex-col py-12 md:py-16 gap-10">
        <div className="flex flex-col w-full justify-center md:gap-5 gap-1.5 items-center">
          <h1 className="md:title-styling !font-bold text-center text-lg">
            Customizable All-In-One Education ERP
          </h1>
          <p className="text-center font-semibold md:text-base hidden">
            A platform to run your college efficiently and provide the best
            <br />
            education experience to your students.
          </p>
          <p className="text-center font-semibold md:hidden text-sm">
            A platform to run your college efficiently and provide the best
            {/* <br /> */}
            education experience to your students.
          </p>
          <button className="btn-small" onClick={() => push("/#contactUs")}>
            Book A Demo
          </button>
        </div>
        <div className="flex items-center justify-center w-full">
          <img
            src="/Backgrounds/hero-bg.png"
            alt="hero"
            className="md:w-9/12 w-full rounded-lg overflow-hidden shadow-[rgba(0,_0,_0,_0.24)_0px_3px_8px]"
          />
        </div>
      </div>
    </section>
  );
};

export default BannerHero;
