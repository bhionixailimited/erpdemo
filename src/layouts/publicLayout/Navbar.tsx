import { LOGO } from "assets";
import Link from "next/link";
import ResponsiveNavbar from "./ResponsiveNavbar";

export const NavBarArr = [
  {
    key: "1",
    title: "About Us",
    path: "/#aboutUs",
  },
  {
    key: "2",
    title: "Products",
    path: "/#features",
  },
  {
    key: "3",
    title: "Solutions",
    path: "/#solutions",
  },
  {
    key: "4",
    title: "Mobile Apps",
    path: "https://play.google.com/store/apps/details?id=com.yarderp",
  },
  {
    key: "5",
    title: "Blog",
    path: "/#clients",
  },
];
const Navbar = () => {
  return (
    <section className="w-full bg-white sticky top-0 shadow-[rgba(50,_50,_105,_0.15)_0px_2px_5px_0px,_rgba(0,_0,_0,_0.05)_0px_1px_1px_0px] z-[999] ">
      <div className="main-container text-black lg:py-4">
        <div className="lg:flex hidden justify-between items-center">
          <div>
            <Link href="/">
              <img src="/newlogo.png" alt="logo" className="w-36 cursor-pointer" />
            </Link>
          </div>
          <div className="gap-12 flex">
            <div className="flex gap-10 items-center">
              {NavBarArr?.map((item: any) => (
                <div
                  className="tracking-tight font-semibold text-base cursor-pointer  hover-underline relative hover:text-theme"
                  key={item?.key}
                >
                  {item.id !== 4 ? (
                    <Link href={item?.path}>{item?.title}</Link>
                  ) : (
                    <a href={item.path} target={"_blank"} rel="noreferrer">
                      {item.title}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="flex">
            <Link href="/login">
              <button className="btn-small">Login</button>
            </Link>
          </div>
        </div>
      </div>
      <ResponsiveNavbar />
    </section>
  );
};

export default Navbar;
