import React from "react";

const instructions = [
  "<p>The online application is for admission to programmes offered in <b>Poddar Group of Institutions</b>.</p>",
  "<p>Application Form Fee is Non-Refundable.</p>",
  "<p>Email ID submitted at the time of registration will be used for all correspondences until enrolment is completed. Change in Email ID will NOT be permitted under any circumstances.</p>",
  `<b>Poddar Group of Institutions Query Management System:</b>
    Applicants are strongly advised to use Poddar Group of Institutions Query Management System (Poddar Group of Institutions-QMS), rather than emailing, to get a quick response.
    <ol>
    <li className="" >1. Register and verify your email ID</li>
    <li className="" >2. Click on <b>[Any Queries? Ask US]</b> in your dashboard</li>
    <li className="" >3. Select query category and submit your query</li>
    </ol>
    `,
];

const InstructionsSection = () => {
  return (
    <section className="w-full bg-pink-200/20">
      <div className="w-full main-container ">
        <div className="px-2 py-16 mx-auto w-full  md:px-24 lg:px-8 lg:py-20">
          <h5 className=" mb-8 text-center font-bold tracking-wide text-lg md:text-2xl lg:text-4xl uppercase  leading-none md:pl-2">
            Instructions
            <br className="hidden md:block" />
          </h5>
          <div className="grid lg:grid-cols-2 items-center ">
            <ul className="space-y-3">
              <img src="/instruction.png" alt="" />
            </ul>
            <ul className="space-y-3">
              {instructions?.map((instruction, index) => (
                <li className="flex items-start" key={index}>
                  <span className="mr-1">
                    <svg
                      className="w-7 h-7 mt-px text-deep-purple-accent-400"
                      stroke="currentColor"
                      viewBox="0 0 52 52"
                    >
                      <polygon
                        strokeWidth="4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        fill="none"
                        points="29 13 14 29 25 29 23 39 38 23 27 23"
                      />
                    </svg>
                  </span>
                  <p
                    className="font-medium leading-6 tracking-wide text-sm"
                    dangerouslySetInnerHTML={{ __html: instruction }}
                  ></p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InstructionsSection;
