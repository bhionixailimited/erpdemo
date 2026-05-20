import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import { useRef, useState } from "react";
import ReviewBox, { Review_Arr } from "./ReviewBox";

const Reviews = () => {
  const [activeNumber, setActiveNumber] = useState(Review_Arr?.length);
  const ref = useRef<any>(null);
  const handleNextSlide = () => {
    ref?.current?.slickNext();
  };
  const handlePrevSlide = () => {
    ref?.current?.slickPrev();
  };

  const handleDecrease = (num: number) => {
    if (activeNumber < 2) return;
    setActiveNumber((prev) => prev - num);
  };
  const handleIncrease = (num: number) => {
    if (activeNumber > Review_Arr?.length - 1) return;
    setActiveNumber((prev) => prev + 1);
  };
  return (
    <section
      style={{
        backgroundImage: `url('/Backgrounds/review-bg.png')`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div className="py-6 md:py-10 main-container">
        <div className="w-full items-center justify-end flex bg-theme md:py-14 py-8">
          <div className="md:w-11/12 w-full flex md:flex-row flex-col items-center justify-center gap-3 md:gap-0">
            <div className="md:w-2/5 w-full items-center md:items-start justify-center md:justify-start text-center md:text-start flex flex-col gap-2 md:gap-3">
              <h1 className="title-styling text-white">
                Our Satisfied Clients
              </h1>
              <p className="text-white leading-4 md:text-sm text-xs">
                Take a look at what some of our clients have to say.
                <br /> See all Customer Stories
              </p>
              <div className="flex items-center px-5 w-full gap-3 md:pt-6 pt-3 justify-center md:justify-start">
                <p
                  onClick={handlePrevSlide}
                  className={`${
                    activeNumber < 2
                      ? "border-white text-white cursor-not-allowed"
                      : "border-theme cursor-pointer bg-white"
                  } border cursor-pointer  common-transition rounded-full w-9 h-9 flex items-center justify-center`}
                >
                  <ArrowBackIos className="!text-xs" />
                </p>
                <p
                  onClick={handleNextSlide}
                  className={`${
                    activeNumber > Review_Arr?.length - 1
                      ? "border-white text-white cursor-not-allowed"
                      : "border-theme cursor-pointer bg-white"
                  } border common-transition rounded-full w-9 h-9 flex items-center justify-center`}
                >
                  <ArrowForwardIos className="!text-xs" />
                </p>
              </div>
            </div>
            <div className="md:w-3/5 w-full overflow-scroll example">
              <ReviewBox activeNumber={activeNumber} reference={ref} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
