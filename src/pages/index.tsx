import { LoginCommon } from "components/common";
import { Loader } from "components/core";
import {
  AboutUs,
  BannerHero,
  CompleteWork,
  ContactUs,
  Faq,
  OurClient,
  Reviews,
  Solutions,
  WhyUs,
} from "components/home";
import PublicLayout from "layouts/publicLayout";
import type { NextPage } from "next";
import { isProductionEnvironment } from "utils";

const Home: NextPage = () => {
  return isProductionEnvironment() ? (
    <LoginCommon />
  ) : (
    <PublicLayout
      title={`Customized ERP Solution For Colleges, Universities & Schools.`}
    >
      <section className="bg-white">
        <BannerHero />
        <AboutUs />
        <CompleteWork />
        <Solutions />
        {/* <Hero /> */}
        <WhyUs />
        <OurClient />
        <Reviews />
        <Faq />
        <ContactUs />
      </section>
    </PublicLayout>
  );
};

export default Home;
