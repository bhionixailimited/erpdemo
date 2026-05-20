import {
  ApplyForgotPassword,
  ApplyLoginForm,
  ApplyRegisterForm,
  CardContent,
  InstructionSection,
} from "components/apply";
import { useSWRFetch } from "hooks";
import Head from "next/head";
import React, { useState } from "react";

type dataType = {
  data: {
    logoUrl: string;
  };
};

const ApplyCourse = () => {
  const { data, isValidating } = useSWRFetch<dataType>(`logo`);

  const [isRegistering, setIsRegistering] = useState(true);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  return (
    <main>
      <Head>
        <meta property="og:url" content="" />
        <meta property="og:type" content="website" />
        <link
          rel="icon"
          href={`${
            process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL || `/newfavicon.png`
          }`}
          type="image/png"
        />
        <title>
          {process.env.NEXT_PUBLIC_TITLE ||
            "Apply for Admission at PODDAR Institutes"}
        </title>
        <meta
          name="description"
          content={
            process.env.NEXT_PUBLIC_DESCRIPTION ||
            ` Group is imparting value education since 1998. Colleges are approved by UGC, AICTE, PCI, NCTE and are affiliated to RU, RTU and RISU.`
          }
        ></meta>

        <meta
          property="og:image"
          content={
            data?.data?.logoUrl ||
            process.env.NEXT_PUBLIC_FIREBASE_FAVICON_URL ||
            "https://www.poddarinstitute.org/assets/images/logo/poddar-logo.webp"
          }
        />
      </Head>
      <div className="relative">
        <img
          src="/static/poddar.jpg"
          className="absolute inset-0 object-cover w-full h-full"
          alt=""
        />
        <div className="relative bg-opacity-75 bg-deep-purple-accent-700">
          <svg
            className="absolute inset-x-0 bottom-0 text-white"
            viewBox="0 0 1160 163"
          >
            <path
              fill="currentColor"
              d="M-164 13L-104 39.7C-44 66 76 120 196 141C316 162 436 152 556 119.7C676 88 796 34 916 13C1036 -8 1156 2 1216 7.7L1276 13V162.5H1216C1156 162.5 1036 162.5 916 162.5C796 162.5 676 162.5 556 162.5C436 162.5 316 162.5 196 162.5C76 162.5 -44 162.5 -104 162.5H-164V13Z"
            />
          </svg>
          <div className="relative px-2 py-16 mx-auto overflow-hidden sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="flex flex-col items-center justify-between xl:flex-row">
              <div className="w-full max-w-xl mb-12 xl:mb-0 xl:pr-16 xl:w-7/12">
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold tracking-tight text-white sm:text-4xl sm:leading-none">
                  PODDAR INSTITUTE <br className="hidden md:block" />
                  Admissions are open now. <br className="hidden md:block" />
                </h2>
                <p className="max-w-xl mb-4 text-base text-gray-200 md:text-lg">
                  Follow simple steps to apply for admission.
                </p>
              </div>
              <div className="w-full max-w-xl xl:px-8 xl:w-5/12">
                <div className="w-full bg-white h-full shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px]  rounded-2xl flex flex-col gap-4 md:gap-7 justify-center items-center py-4 md:py-10 ">
                  <p className="font-bold text-2xl">
                    {" "}
                    {isForgotPassword
                      ? "Forgot Password"
                      : isRegistering
                      ? "Register "
                      : "Login"}
                  </p>
                  {!isForgotPassword && (
                    <p className=" font-semibold text-xs text-gray-500 text-center md:px-0 px-5">
                      Hey enter your details to{" "}
                      {isRegistering ? "Register " : "Login into"} your account
                    </p>
                  )}

                  {isForgotPassword ? (
                    <ApplyForgotPassword
                      setIsRegistering={() => {
                        setIsRegistering(false);
                        setIsForgotPassword(false);
                      }}
                    />
                  ) : isRegistering ? (
                    <ApplyRegisterForm setIsRegistering={setIsRegistering} />
                  ) : (
                    <ApplyLoginForm
                      setIsRegistering={setIsRegistering}
                      setIsForgotPassword={setIsForgotPassword}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CardContent />
      <InstructionSection />
    </main>
  );
};

export default ApplyCourse;
