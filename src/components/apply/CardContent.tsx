import {
  Description,
  HowToReg,
  Payment,
  Publish,
  Verified,
} from "@mui/icons-material";
import React from "react";

const cardData = [
  {
    title: "STEP 1",
    icon: <HowToReg className="!text-5xl text-theme" />,
    tagLine: "Register Yourself",
  },
  {
    title: "STEP 2",
    icon: <Verified className="!text-5xl text-theme " />,
    tagLine: "Verify Email",
  },
  {
    title: "STEP 3",
    icon: <Description className="!text-5xl text-theme " />,
    tagLine: "Fill Application Form Online",
  },
  {
    title: "STEP 4",
    icon: <Payment className="!text-5xl text-theme " />,
    tagLine: "Pay Application Fee",
  },
  {
    title: "STEP 5",
    icon: <Publish className="!text-5xl text-theme " />,
    tagLine: "Submit Application",
  },
];

const CardContent = () => {
  return (
    <section className="w-full -translate-y-4 pb-10 bg-white">
      <div className="flex items-center justify-center w-full">
        <h3 className="text-center font-bold tracking-wide text-lg md:text-2xl lg:text-4xl py-8 ">
          STEPS TO FOLLOW
        </h3>
      </div>
      <div className="w-full main-container flex items-center flex-wrap  justify-center gap-4">
        {cardData?.map((item, index) => (
          <div
            className="w-full max-w-[240px] flex flex-col bg-theme gap-4 p-4 rounded-md shadow-xl "
            key={index}
          >
            <div className="w-full text-lg font-semibold tracking-wide text-white flex items-center justify-center">
              {item.title}
            </div>
            <div className="w-full flex items-center justify-center">
              <span className="border rounded-md shadow-lg bg-white ">
                {item.icon}
              </span>
            </div>
            <div className="w-full text-center  text-sm tracking-wide text-white flex items-center justify-center">
              {item.tagLine}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CardContent;
