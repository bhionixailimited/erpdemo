import { ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { useState } from "react";
const Faq = () => {
  const Faq_Arr = [
    {
      id: 1,
      question: "What is Education ERP?⁣",
      answer:
        "The daily processes are streamlined, automated, and made simpler by an educational ERP solution. We assist schools with handling daily attendance, assignments, tests, assessments, fee collecting, transportation, HR payroll management, hostel and library management, as well as online admissions. A school ERP offers a number of modules to digitise campus administration and give teachers the ability to take swift actions that improve staff and student performance and foster the institution's expansion.⁣",
    },
    {
      id: 2,
      question:
        "How Does the Online Admissions Process Simplify Institute Admission?⁣",
      answer:
        "Parents can submit an online inquiry through online admission software, which also permits online transactions for the application and registration cost via payment gateway. By streamlining the entire inquiry to admission procedure, the admissions tool gives real-time insights into all admission-related duties.⁣",
    },
    {
      id: 3,
      question: "What is the best e-learning or LMS software that I can find?⁣",
      answer:
        "You must pick a dependable platform with the following features if you want to guarantee a seamless virtual teaching-learning experience.⁣",
      options: [
        {
          id: 31,
          title:
            "Online classes: Zoom, Google Classroom, and Microsoft Teams integration.⁣",
        },
        {
          id: 32,
          title: "Online tests and assignments⁣⁣",
        },
        {
          id: 33,
          title: "Internal Communication⁣⁣",
        },
        {
          id: 34,
          title: " E-Learning Content⁣⁣",
        },
        {
          id: 35,
          title: "A Teaching Plan⁣⁣",
        },
        {
          id: 36,
          title: "A Collaboration Platform⁣⁣⁣",
        },
        {
          id: 37,
          title: "Support for All iOS & Android Devices⁣",
        },
      ],
    },
    // {
    //   id: 4,
    //   question: "Where is student management software data hosted?",
    //   answer:
    //     "Online admission software enables parents to drop an online enquiry and also makes online transactions possible for application and registration fee via payment gateway. Admissions tool provides real-time insights of all admission-related tasks by streamlining the entire enquiry to admission procedure.",
    // },
  ];
  const [expanded, setExpanded] = useState<number | false>(2);

  const handleChange =
    (panel: any) => (event: React.SyntheticEvent, newExpanded: boolean) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <section className="relative  py-6 md:py-10">
      <div className="main-container">
        <h1 className="title-styling text-center md:text-start w-full uppercase">
          Faq
        </h1>
        <div className="w-full flex justify-between gap-5 md:gap-0 py-5 md:flex-row flex-col ">
          <div className="md:w-1/2 w-full flex flex-col !order-2 md:!order-1">
            {Faq_Arr?.map((item) => (
              <div className="shadow-sm" key={item?.id}>
                <Accordion
                  expanded={expanded === item?.id}
                  onChange={handleChange(item?.id)}
                  sx={{
                    boxShadow: "none !important",
                    background: "",
                    borderBottom: "1px dotted #5B50A1",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMore className="!text-theme" />}
                  >
                    <p className="font-semibold text-sm text-gray-700 flex faqs-center">
                      {item?.question}
                    </p>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div className="">
                      <span className="text-sm leading-6 tracking-wide pb-5">
                        {item?.answer}
                        <ul className="flex flex-col gap-1 list-disc pt-3 md:pt-3 px-5">
                          {item?.options?.map((item) => (
                            <li key={item.id}>{item?.title}</li>
                          ))}
                        </ul>
                      </span>
                    </div>
                  </AccordionDetails>
                </Accordion>
              </div>
            ))}
            <div className="pt-5 flex w-full justify-center items-center md:justify-start md:items-start">
              <button className="btn-small">Show More</button>
            </div>
          </div>
          <div className="flex md:w-1/2 w-full !order-1 md:!order-2 items-center justify-center">
            <img
              src="/Features/FAQ.png"
              alt="faq-logo"
              className="md:w-[75%] w-4/5"
            />
          </div>
        </div>
      </div>
      <div className="absolute top-0 left-4">
        <img src="/Features/Polygon-1.png" alt="polygon" className="w-3" />
      </div>
      <div className="absolute right-1 top-6">
        <img src="/Features/Polygon-2.png" alt="polygon" className="w-10" />
      </div>
      <div className="absolute right-1/3 top-10">
        <img src="/Features/Ellipse-1.png" alt="polygon" className="w-2" />
      </div>
      <div className="absolute bottom-4 left-1/3">
        <img src="/Features/Polygon-1.png" alt="polygon" className="w-3" />
      </div>
    </section>
  );
};

export default Faq;
