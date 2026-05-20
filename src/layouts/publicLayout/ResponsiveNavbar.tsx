import { Close, Menu, Search } from "@mui/icons-material";
import { Collapse } from "@mui/material";
import { LOGO } from "assets";
import Link from "next/link";
import { useState } from "react";
import { NavBarArr } from "./Navbar";
import useAppContext from "contexts/AppContextProvider";

const ResponsiveNavbar = () => {
  const [open, setOpen] = useState(false);
  const { appLogo } = useAppContext();
  return (
    <section className="block lg:hidden main-container py-4 bg-white text-black">
      <div className="flex justify-between items-center">
        <Link href="/" className="">
          <img
            src={appLogo || LOGO.src}
            alt="YardERP"
            className="w-32 md:w-40"
          />
        </Link>

        <span className="text-theme" onClick={() => setOpen(!open)}>
          {open ? (
            <Close className="!text-2xl" />
          ) : (
            <Menu className="!text-2xl" />
          )}
        </span>
      </div>

      <Collapse in={open} timeout="auto" unmountOnExit>
        <section className="w-full flex flex-col gap-4 pt-6 text-black">
          {NavBarArr?.map((item) => (
            <div className="" key={item?.key}>
              <Link href={item?.path}>
                <a className="tracking-wider">{item?.title}</a>
              </Link>
            </div>
          ))}
          <div className="text-[#757575]">
            {/* <LoginScreen isResponsiveScreen={true} /> */}
            <Link href="/login">
              <button className="btn-small">Login</button>
            </Link>
          </div>
        </section>
      </Collapse>
    </section>
  );
};

export default ResponsiveNavbar;
