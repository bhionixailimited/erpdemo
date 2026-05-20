import { Logout, Person } from "@mui/icons-material";
import {
  Avatar,
  Divider,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from "@mui/material";

import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import Drawer from "./drawer";
import { useApplyAuth } from "hooks";
import useStudentMenuItem from "hooks/useStudentMenuItem";
type Props = {
  children: JSX.Element | JSX.Element[];
  title?: string;
};

type NewMessageCountType = {
  totalUnread: number;
};

const StudentProfileLayout = ({ children, title = "" }: Props) => {
  const { user, getUser } = useApplyAuth();

  const router = useRouter();
  const StudentData = useStudentMenuItem();
  const [showPassword, setShowPassword] = useState(false);
  const [showConPassword, setShowConPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);
  const [isUpdatePassword, setIsUpdatePassword] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);
  const handleClick = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const isMobileView = () => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768; // You can adjust the breakpoint as needed
    }
    return false;
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    // Check the screen width on initial load and set the drawer accordingly
    setIsOpen(!isMobileView());

    // Add a listener to update the drawer state when the window is resized
    const handleResize = () => {
      setIsOpen(!isMobileView());
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // Remove the resize listener when the component unmounts
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  useEffect(() => {
    (async () => {
      //   const currentUser = await validateUser();
      //   if (!currentUser) return router.push(`/`);
      //   setUser(currentUser);
      //   if (currentUser?.isSecurePassword === false) {
      //     setIsUpdatePassword(true);
      //   }
      // connect to socket
      // connect();
      // fetch current chat count
      // revalidateChatCount();
      // revalidateMailCount(user?.id);
      // revalidateNotificationCount();
    })();
  }, []);

  //listen to all the chat event upon receiving event update the chat count

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to logout?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, logout!",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire("Success", "Successfully logged out.", "success");
      }
    });
  };

  return (
    <>
      <Head>
        <title>{title}</title>
        {/* <link rel="icon" href={`${Public_FAV_ICON}`} /> */}
        <meta name="description" content={`This page is for student`}></meta>

        {/* <meta property="og:image" content={Public_LOGO} /> */}
      </Head>
      <>
        <Drawer
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          role={"Student"}
        />
        <main
          className={`min-h-screen bg-white ${
            isOpen
              ? "md:ml-[calc(100vw-calc(100vw-240px))] md:w-[calc(100vw-258px)] w-[calc(100vw-0px)]"
              : "md:ml-[calc(100vw-calc(100vw-72px))] md:w-[calc(100vw-72px)] w-[calc(100vw-58px)] ml-[calc(100vw-calc(100vw-55px))]"
          } dashboard-main `}
        >
          <header className={`h-16 bg-white`}>
            <div className="flex h-16 items-center md:justify-between justify-end px-4">
              <h1 className="lg:text-xl text-sm uppercase lg:block hidden font-semibold text-theme">
                {
                  StudentData?.find(
                    (item: any) =>
                      item?.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )?.title
                }
                {
                  StudentData?.find((item: any) =>
                    item?.submenus?.find(
                      (submenus: any) =>
                        submenus?.route ===
                        router?.pathname?.replace(
                          "[role]",
                          router?.query?.role as string
                        )
                    )
                  )?.title
                }
                {StudentData?.find((item: any) =>
                  item?.submenus?.find(
                    (submenus: any) =>
                      submenus.route ===
                      router?.pathname?.replace(
                        "[role]",
                        router?.query?.role as string
                      )
                  )
                )?.title ? (
                  <span> / </span>
                ) : (
                  <span> </span>
                )}
              </h1>
              <div className="flex items-center  gap-4">
                <div className="flex gap-4 items-center"></div>
                <div className="flex w-fit  items-center justify-start gap-2 overflow-hidden bg-white">
                  <div
                    onClick={handleClick}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <Avatar src={user?.passportSizePhotoUrl} />
                    <div className="hidden md:block">
                      <h1 className="text-sm">
                        {user?.studentFirstName} {user?.studentMiddleName}{" "}
                        {user?.studentLastName}
                      </h1>
                    </div>
                  </div>
                  <Menu
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 2px rgba(0,0,0,0.32))",
                        mt: 1.5,
                        "& .MuiAvatar-root": {
                          width: 40,
                          height: 40,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: "background.paper",
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem>
                      <ListItemText
                        primary={
                          user?.studentFirstName +
                          " " +
                          user?.studentMiddleName +
                          " " +
                          user?.studentLastName
                        }
                        secondary={user?.email}
                      />
                    </MenuItem>
                    <Divider />

                    <MenuItem
                      onClick={() => router.push("/apply/profile/my-profile")}
                    >
                      <ListItemIcon>
                        <Person fontSize="small" />
                      </ListItemIcon>
                      Profile
                    </MenuItem>

                    {/* <MenuItem onClick={handleLogout}> */}
                    <MenuItem onClick={() => router.push("/apply")}>
                      <ListItemIcon>
                        <Logout fontSize="small" />
                      </ListItemIcon>
                      Logout
                    </MenuItem>
                  </Menu>
                </div>
              </div>
            </div>
          </header>
          <section className="min-h-screen bg-gradient-to-b from-slate-100 to-white">
            {children}
          </section>
        </main>
      </>
    </>
  );
};

export default StudentProfileLayout;
