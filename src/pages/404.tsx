import { PAGENOTFOUND } from "assets/animations";
import React from "react";
import Lottie from "components/core/ClientLottie";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: PAGENOTFOUND,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const PageNotFound = () => {
  return (
    <section className="bg-white h-screen w-full flex justify-center items-center">
      <Lottie options={defaultOptions} height={350} width={500} />
    </section>
  );
};

export default PageNotFound;
