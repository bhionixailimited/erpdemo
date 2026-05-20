import {
  ExpandMore,
  Facebook,
  Instagram,
  Mail,
  Phone,
  Twitter,
} from "@mui/icons-material";
import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material";
import { LOGO } from "assets";
import Link from "next/link";
const FOOTER_ARR = [
  {
    id: 1,
    title: "Download",
    menus: [
      {
        id: 21,
        menuItem: "Android App",
        path: "https://play.google.com/store/apps/details?id=com.yarderp",
      },
      {
        id: 22,
        menuItem: "Ios App",
        path: "",
      },
    ],
  },
  {
    id: 2,
    title: "Company",
    menus: [
      {
        id: 11,
        menuItem: "Contact Us",
        path: "",
      },
      {
        id: 12,
        menuItem: "Partners",
        path: "",
      },
      {
        id: 13,
        menuItem: "Careers",
        path: "",
      },
      {
        id: 14,
        menuItem: "Success Stories",
        path: "",
      },
      {
        id: 15,
        menuItem: "Privacy Policy",
        path: "/privacy",
      },
      {
        id: 16,
        menuItem: "Term & Conditions",
        path: "",
      },
    ],
  },
  {
    id: 3,
    title: "Product",
    menus: [
      {
        id: 31,
        menuItem: "ERP",
        path: "",
      },
      {
        id: 32,
        menuItem: "LMS",
        path: "",
      },
      {
        id: 33,
        menuItem: "YardErp.Live",
        path: "",
      },
    ],
  },
  {
    id: 4,
    title: "About",
    menus: [
      {
        id: 41,
        menuItem: "Why YardErp",
        path: "",
      },
      {
        id: 42,
        menuItem: "Core Team",
        path: "",
      },
      {
        id: 43,
        menuItem: "Our Journey",
        path: "",
      },
      {
        id: 44,
        menuItem: "Blog",
        path: "",
      },
      {
        id: 45,
        menuItem: "FAQ",
        path: "",
      },
      {
        id: 4545885844,
        menuItem: "Reporting",
        path: "",
      },
    ],
  },
  {
    id: 5,
    title: "Follow Us",
    menus: [
      {
        id: 51,
        menuItem: <Facebook className="!text-xl" />,
        path: "",
      },
      {
        id: 52,
        menuItem: <Twitter className="!text-xl" />,
        path: "",
      },
      {
        id: 53,
        menuItem: <Instagram className="!text-xl" />,
        path: "",
      },
    ],
  },
];

const Footer = () => {
  return (
    <section className="md:bg-[#FAFAFF] bg-white md:pt-20 pt-6 text-[#5F5C74]">
      <footer className="main-container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-2 md:gap-2">
        <div className="flex justify-start lg:justify-start md:col-span-2">
          <div className="md:w-fit w-full flex flex-col gap-1">
            <Link href="/">
              <img
                src="/newlogo.png"
                alt="tSmart"
                className="w-28 md:w-40 cursor-pointer"
              />
            </Link>
            <div className="flex flex-col md:gap-1">
              <p className="text-theme/80 text-sm font-medium tracking-wide">
                Don’t miss any updates of our new <br /> Features and
                Extensions!
              </p>
              <input
                type="text"
                placeholder="Enter Email"
                className="w-3/5 md:!w-3/4 bg-white text-black focus:outline-none search-field p-2 rounded-md mt-2 md:mb-4 mb-3 border border-black"
              />
              <button className="btn-primary w-fit md:w-fit text-sm font-medium flex items-center gap-1">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {FOOTER_ARR.map((curElm) => (
          <div key={curElm.id} className="w-full">
            <div
              className="md:flex flex-col hidden justify-start lg:justify-center"
              key={curElm.id}
            >
              <h4 className="tracking-wide font-bold pb-3 capitalize lg:text-lg 2xl:text-xl text-black">
                {curElm.title}
              </h4>
              <div
                className={`w-fit flex gap-2 ${
                  curElm.id === 5 ? " flex-row" : "flex-col"
                }`}
              >
                {curElm?.menus?.map((innerElm) => (
                  <Link href={innerElm.path} key={innerElm.id}>
                    <p
                      className={` ${
                        curElm.id === 5
                          ? `cursor-pointer border border-theme rounded-full  w-8 h-8 flex items-center justify-center text-center ${
                              innerElm.id === 52
                                ? "bg-theme !text-white"
                                : "bg-white text-theme"
                            }`
                          : "group transition-colors duration-100 ease-in-out tracking-wider text-sm font-medium w-fit hover:text-theme flex items-center gap-1 cursor-pointer"
                      }`}
                    >
                      <span
                        className={`${
                          curElm.id === 5
                            ? ""
                            : "group-hover:translate-x-3 common-transition "
                        }`}
                      >
                        {innerElm.menuItem}
                      </span>
                    </p>
                  </Link>
                ))}
              </div>
              {curElm.id === 5 && (
                <div className="flex flex-col pt-3 gap-2">
                  <a
                    href={`mailto:sales@yarderp.com`}
                    className="flex gap-1 text-start"
                  >
                    <span className="text-theme">
                      <Mail />
                    </span>{" "}
                    sales@yarderp.com
                  </a>
                  <a
                    href={`tel:+91 8114957912`}
                    className="flex gap-1 text-start"
                  >
                    <span className="text-theme -mt-0.5">
                      <Phone />
                    </span>
                    +91 8114957912
                  </a>
                </div>
              )}
            </div>
            <div className="flex md:hidden w-full">
              <Accordion
                sx={{
                  boxShadow: "none !important",
                  background: "",
                  borderBottom: "md:1px dotted #5B50A1",
                  width: "100%",
                }}
              >
                {curElm.id !== 5 && (
                  <AccordionSummary
                    expandIcon={<ExpandMore className="!text-theme" />}
                  >
                    <p className="tracking-wide font-bold pb-3 capitalize lg:text-lg 2xl:text-xl text-black">
                      {curElm?.title}
                    </p>
                  </AccordionSummary>
                )}
                {curElm.id !== 5 && (
                  <AccordionDetails>
                    <div className="flex flex-col gap-2 pb-4">
                      {curElm?.menus?.map((innerElm) => (
                        <Link href={innerElm.path} key={innerElm.id}>
                          <p className="group transition-colors duration-100 ease-in-out tracking-wider text-sm font-medium w-fit hover:text-theme flex items-center gap-1 cursor-pointer">
                            <span className="group-hover:translate-x-3 common-transition">
                              {innerElm.menuItem}
                            </span>
                          </p>
                        </Link>
                      ))}
                    </div>
                  </AccordionDetails>
                )}
                {curElm.id === 5 && (
                  <div>
                    <div className="flex w-full gap-2 py-2 px-1">
                      {curElm?.menus?.map((innerItem) => (
                        <div
                          className={`cursor-pointer border border-theme rounded-full  w-8 h-8 flex items-center justify-center text-center ${
                            innerItem.id === 52
                              ? "bg-theme !text-white"
                              : "bg-white text-theme"
                          }`}
                          key={innerItem?.id}
                        >
                          {innerItem?.menuItem}
                        </div>
                      ))}
                    </div>
                    {curElm.id === 5 && (
                      <div className="flex flex-col pt-2 gap-2">
                        <a
                          href={`mailto:sales@yarderp.com`}
                          className="flex gap-1 text-start"
                        >
                          <span className="text-theme">
                            <Mail />
                          </span>{" "}
                          sales@yarderp.com
                        </a>
                        <a
                          href={`tel:+91 8114957912`}
                          className="flex gap-1 text-start"
                        >
                          <span className="text-theme -mt-0.5">
                            <Phone />
                          </span>
                          +91 8114957912
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </Accordion>
            </div>
          </div>
        ))}
      </footer>
      <footer
        style={{
          backgroundImage: `url('/Backgrounds/Footer-bg.png`,
        }}
        className="bg-bottom bg-contain bg-no-repeat w-full md:h-40 h-20 "
      ></footer>
      <section className="main-container text-black flex items-center ">
        <p className="w-full tracking- text-xs md:text-base md:pt-8 pt-3 pb-5 text-black text-center">
          Copyright © 2023 The YARDERP A Product Of{" "}
          <a
            href="https://www.searchingyard.com"
            rel="noreferrer"
            target="_blank"
            className="hover:text-theme hover:underline"
          >
            SearchingYard Software Group.
          </a>
          All rights reserved.
        </p>
      </section>
    </section>
  );
};

export default Footer;

{
  /* <div className="md:flex hidden justify-start lg:justify-center">
<div className="w-fit flex flex-col gap-2">
  <h4 className="tracking-wide font-bold pb-3 capitalize lg:text-lg 2xl:text-xl text-black">
    Contact Us
  </h4>
  <p className="group transition-colors duration-100 ease-in-out tracking-wider text-sm font-medium w-fit hover:text-theme flex items-center gap-1 cursor-pointer">
    <span className="group-hover:translate-x-3 common-transition">
      ERP
    </span>
  </p>
  <p className="group transition-colors duration-100 ease-in-out tracking-wider text-sm font-medium w-fit hover:text-theme flex items-center gap-1 cursor-pointer">
    <span className="group-hover:translate-x-3 common-transition">
      LMS
    </span>
  </p>
  <p className="group transition-colors duration-100 ease-in-out tracking-wider text-sm font-medium w-fit hover:text-theme flex items-center gap-1 cursor-pointer">
    <span className="group-hover:translate-x-3 common-transition">
      YardErp.Live
    </span>
  </p>
</div>
</div> */
}
